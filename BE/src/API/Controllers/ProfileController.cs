using Microsoft.AspNetCore.Mvc;
using SCourt.API.Models;
using SCourt.API.Services;

namespace SCourt.API.Controllers;

[ApiController]
[Route("api/profile")]
public sealed class ProfileController(DevIdentityService identityService) : ControllerBase
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
