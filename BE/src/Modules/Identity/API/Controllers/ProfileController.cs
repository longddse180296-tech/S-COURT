using Microsoft.AspNetCore.Mvc;
using SCourt.Modules.Identity.Application.DTOs;
using SCourt.Modules.Identity.Application.Interfaces;

namespace SCourt.Modules.Identity.API.Controllers;

[ApiController]
[Route("api/profile")]
public sealed class ProfileController(IDevIdentityService identityService) : ControllerBase
{
    [HttpGet]
    public ActionResult<UserProfile> GetProfile()
    {
        var user = GetCurrentUser();
        return user is null ? Unauthorized() : Ok(user);
    }

    [HttpPut]
    public ActionResult<UserProfile> UpdateProfile(UpdateProfileRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName))
        {
            return BadRequest(new { message = "Họ và tên không được để trống." });
        }

        try
        {
            return Ok(identityService.UpdateUser(GetBearerToken(), request));
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized();
        }
    }

    private UserProfile? GetCurrentUser() =>
        identityService.GetUser(GetBearerToken());

    private string GetBearerToken()
    {
        var authorization = Request.Headers.Authorization.ToString();
        return authorization.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)
            ? authorization["Bearer ".Length..].Trim()
            : string.Empty;
    }
}
