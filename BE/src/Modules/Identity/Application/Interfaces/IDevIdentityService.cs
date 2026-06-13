using SCourt.Modules.Identity.Application.DTOs;

namespace SCourt.Modules.Identity.Application.Interfaces;

public interface IDevIdentityService
{
    string CreateOtp(string phoneNumber);

    AuthResponse VerifyOtp(VerifyOtpRequest request);

    Task<AuthResponse> LoginWithGoogleAsync(GoogleLoginRequest request);

    UserProfile? GetUser(string accessToken);

    UserProfile UpdateUser(string accessToken, UpdateProfileRequest request);
}
