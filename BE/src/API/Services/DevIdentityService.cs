using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text.Json;
using SCourt.API.Models;

namespace SCourt.API.Services;

public sealed class DevIdentityService
{
    private sealed record OtpEntry(string Code, DateTimeOffset ExpiresAt);

    private readonly ConcurrentDictionary<string, OtpEntry> _otps = new();
    private readonly ConcurrentDictionary<string, UserProfile> _users = new();
    private readonly ConcurrentDictionary<string, string> _identities = new();
    private readonly ConcurrentDictionary<string, string> _sessions = new();
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _environment;

    public DevIdentityService(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _environment = environment;
    }

    public string CreateOtp(string phoneNumber)
    {
        var code = RandomNumberGenerator.GetInt32(100000, 1000000).ToString();
        _otps[NormalizePhone(phoneNumber)] = new OtpEntry(
            code,
            DateTimeOffset.UtcNow.AddMinutes(5));
        return code;
    }

    public AuthResponse VerifyOtp(VerifyOtpRequest request)
    {
        var phone = NormalizePhone(request.PhoneNumber);
        if (!_otps.TryGetValue(phone, out var otp) ||
            otp.ExpiresAt < DateTimeOffset.UtcNow ||
            !CryptographicOperations.FixedTimeEquals(
                System.Text.Encoding.UTF8.GetBytes(otp.Code),
                System.Text.Encoding.UTF8.GetBytes(request.Otp)))
        {
            throw new InvalidOperationException("Mã OTP không hợp lệ hoặc đã hết hạn.");
        }

        _otps.TryRemove(phone, out _);
        var user = GetOrCreateUser(
            $"zalo:{phone}",
            string.IsNullOrWhiteSpace(request.FullName)
                ? $"Người dùng {phone[^4..]}"
                : request.FullName,
            NormalizeRole(request.Role),
            phoneNumber: phone);

        return CreateSession(user);
    }

    public async Task<AuthResponse> LoginWithGoogleAsync(GoogleLoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Credential))
        {
            throw new InvalidOperationException("Google credential không hợp lệ.");
        }

        var isDevCredential = request.Credential == "dev-google-credential";
        if (isDevCredential && !_environment.IsDevelopment())
        {
            throw new InvalidOperationException("Credential demo chỉ được dùng trong môi trường Development.");
        }

        var googleProfile = isDevCredential
            ? null
            : await VerifyGoogleCredentialAsync(request.Credential);
        var email = googleProfile?.Email ??
            (string.IsNullOrWhiteSpace(request.Email) ? "demo@sportshub.vn" : request.Email.Trim().ToLowerInvariant());
        var fullName = googleProfile?.Name ?? request.FullName ?? "Người dùng Google";
        var avatarUrl = googleProfile?.Picture ?? request.AvatarUrl;
        var user = GetOrCreateUser(
            $"google:{email}",
            fullName,
            NormalizeRole(request.Role),
            email,
            avatarUrl: avatarUrl);

        return CreateSession(user);
    }

    public UserProfile? GetUser(string accessToken)
    {
        return _sessions.TryGetValue(accessToken, out var userId) &&
               _users.TryGetValue(userId, out var user)
            ? user
            : null;
    }

    public UserProfile UpdateUser(string accessToken, UpdateProfileRequest request)
    {
        var user = GetUser(accessToken)
            ?? throw new UnauthorizedAccessException("Phiên đăng nhập không hợp lệ.");

        user.FullName = request.FullName.Trim();
        user.Email = request.Email?.Trim();
        user.PhoneNumber = request.PhoneNumber?.Trim();
        user.AvatarUrl = request.AvatarUrl?.Trim();
        user.DateOfBirth = request.DateOfBirth;
        user.Gender = request.Gender;
        user.Address = request.Address?.Trim();
        user.Bio = request.Bio?.Trim();
        user.FavoriteSport = request.FavoriteSport;
        user.SkillLevel = request.SkillLevel;
        user.VenueName = request.VenueName?.Trim();
        user.BusinessAddress = request.BusinessAddress?.Trim();
        user.TaxCode = request.TaxCode?.Trim();
        user.BusinessLicense = request.BusinessLicense?.Trim();
        return user;
    }

    private UserProfile GetOrCreateUser(
        string identity,
        string fullName,
        string role,
        string? email = null,
        string? phoneNumber = null,
        string? avatarUrl = null)
    {
        var userId = _identities.GetOrAdd(identity, _ => Guid.NewGuid().ToString("N"));
        return _users.GetOrAdd(userId, id => new UserProfile
        {
            Id = id,
            FullName = fullName.Trim(),
            Role = role,
            Email = email,
            PhoneNumber = phoneNumber,
            AvatarUrl = avatarUrl,
            FavoriteSport = role == "Player" ? "Cầu lông" : null,
            SkillLevel = role == "Player" ? "Trung bình" : null,
        });
    }

    private AuthResponse CreateSession(UserProfile user)
    {
        var accessToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        var refreshToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(48));
        _sessions[accessToken] = user.Id;
        return new AuthResponse(user, accessToken, refreshToken);
    }

    private static string NormalizePhone(string phoneNumber) =>
        new(phoneNumber.Where(char.IsDigit).ToArray());

    private static string NormalizeRole(string role) =>
        role.Equals("VenueOwner", StringComparison.OrdinalIgnoreCase)
            ? "VenueOwner"
            : "Player";

    private async Task<GoogleProfile> VerifyGoogleCredentialAsync(string credential)
    {
        var client = _httpClientFactory.CreateClient();
        using var idTokenResponse = await client.GetAsync(
            $"https://oauth2.googleapis.com/tokeninfo?id_token={Uri.EscapeDataString(credential)}");

        if (idTokenResponse.IsSuccessStatusCode)
        {
            using var idTokenDocument = JsonDocument.Parse(
                await idTokenResponse.Content.ReadAsStringAsync());
            return ReadGoogleProfile(idTokenDocument.RootElement);
        }

        using var accessTokenResponse = await client.GetAsync(
            $"https://oauth2.googleapis.com/tokeninfo?access_token={Uri.EscapeDataString(credential)}");
        if (!accessTokenResponse.IsSuccessStatusCode)
        {
            throw new InvalidOperationException("Không thể xác minh tài khoản Google.");
        }

        using var tokenDocument = JsonDocument.Parse(
            await accessTokenResponse.Content.ReadAsStringAsync());
        ValidateGoogleAudience(tokenDocument.RootElement);

        using var userInfoRequest = new HttpRequestMessage(
            HttpMethod.Get,
            "https://openidconnect.googleapis.com/v1/userinfo");
        userInfoRequest.Headers.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", credential);
        using var userInfoResponse = await client.SendAsync(userInfoRequest);

        if (!userInfoResponse.IsSuccessStatusCode)
        {
            throw new InvalidOperationException("Không thể tải hồ sơ Google.");
        }

        using var userInfoDocument = JsonDocument.Parse(
            await userInfoResponse.Content.ReadAsStringAsync());
        return ReadGoogleProfile(userInfoDocument.RootElement, validateAudience: false);
    }

    private GoogleProfile ReadGoogleProfile(
        JsonElement root,
        bool validateAudience = true)
    {
        if (validateAudience)
        {
            ValidateGoogleAudience(root);
        }

        return new GoogleProfile(
            root.GetProperty("email").GetString()
                ?? throw new InvalidOperationException("Google không cung cấp email."),
            root.TryGetProperty("name", out var name) ? name.GetString() : null,
            root.TryGetProperty("picture", out var picture) ? picture.GetString() : null);
    }

    private void ValidateGoogleAudience(JsonElement root)
    {
        var audience = root.TryGetProperty("aud", out var aud)
            ? aud.GetString()
            : root.TryGetProperty("audience", out var audienceProperty)
                ? audienceProperty.GetString()
                : null;
        var configuredClientId = _configuration["Google:ClientId"];

        if (!string.IsNullOrWhiteSpace(configuredClientId) && audience != configuredClientId)
        {
            throw new InvalidOperationException("Google credential không thuộc ứng dụng này.");
        }
    }

    private sealed record GoogleProfile(string Email, string? Name, string? Picture);
}
