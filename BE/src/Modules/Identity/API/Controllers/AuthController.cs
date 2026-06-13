using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SCourt.Modules.Identity.Application.DTOs;
using SCourt.Modules.Identity.Application.Interfaces;

namespace SCourt.Modules.Identity.API.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(IDevIdentityService identityService) : ControllerBase
{
    [HttpPost("zalo/request-otp")]
    public ActionResult<OtpResponse> RequestOtp(RequestOtpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.PhoneNumber))
        {
            return BadRequest(new { message = "Vui lòng nhập số điện thoại." });
        }

        var otp = identityService.CreateOtp(request.PhoneNumber);
        return Ok(new OtpResponse(
            "Mã OTP đã được gửi qua Zalo.",
            300,
            builderEnvironment().IsDevelopment() ? otp : null));
    }

    [HttpPost("zalo/verify-otp")]
    public ActionResult<AuthResponse> VerifyOtp(VerifyOtpRequest request)
    {
        try
        {
            return Ok(identityService.VerifyOtp(request));
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    [HttpPost("google")]
    public async Task<ActionResult<AuthResponse>> GoogleLogin(GoogleLoginRequest request)
    {
        try
        {
            return Ok(await identityService.LoginWithGoogleAsync(request));
        }
        catch (InvalidOperationException exception)
        {
            return BadRequest(new { message = exception.Message });
        }
    }

    private IWebHostEnvironment builderEnvironment() =>
        HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
}
