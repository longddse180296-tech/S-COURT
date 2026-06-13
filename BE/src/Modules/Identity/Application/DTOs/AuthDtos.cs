namespace SCourt.Modules.Identity.Application.DTOs;

public sealed record RequestOtpRequest(string PhoneNumber);

public sealed record VerifyOtpRequest(
    string PhoneNumber,
    string Otp,
    string? FullName,
    string Role = "Player");

public sealed record GoogleLoginRequest(
    string Credential,
    string? Email,
    string? FullName,
    string? AvatarUrl,
    string Role = "Player");

public sealed record AuthResponse(
    UserProfile User,
    string AccessToken,
    string RefreshToken);

public sealed record OtpResponse(
    string Message,
    int ExpiresInSeconds,
    string? DevOtp = null);

public sealed class UserProfile
{
    public required string Id { get; init; }
    public required string FullName { get; set; }
    public required string Role { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? AvatarUrl { get; set; }
    public string? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? Address { get; set; }
    public string? Bio { get; set; }
    public string? FavoriteSport { get; set; }
    public string? SkillLevel { get; set; }
    public string? VenueName { get; set; }
    public string? BusinessAddress { get; set; }
    public string? TaxCode { get; set; }
    public string? BusinessLicense { get; set; }
}

public sealed record UpdateProfileRequest(
    string FullName,
    string? Email,
    string? PhoneNumber,
    string? AvatarUrl,
    string? DateOfBirth,
    string? Gender,
    string? Address,
    string? Bio,
    string? FavoriteSport,
    string? SkillLevel,
    string? VenueName,
    string? BusinessAddress,
    string? TaxCode,
    string? BusinessLicense);
