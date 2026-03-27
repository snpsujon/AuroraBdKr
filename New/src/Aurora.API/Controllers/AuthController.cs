using Aurora.Application.Common.Models;
using Aurora.Application.Common.Models.Auth;
using Aurora.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<string>>> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);
        if (!result)
            return BadRequest(ApiResponse<string>.Failure(new List<string> { "Registration failed" }));

        return Ok(ApiResponse<string>.Success("User registered successfully"));
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Login(LoginRequest request)
    {
        try
        {
            var response = await _authService.LoginAsync(request);
            return Ok(ApiResponse<AuthResponse>.Success(response));
        }
        catch (Exception ex)
        {
            return Unauthorized(ApiResponse<AuthResponse>.Failure(new List<string> { ex.Message }));
        }
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Refresh(RefreshTokenRequest request)
    {
        try
        {
            var response = await _authService.RefreshTokenAsync(request);
            return Ok(ApiResponse<AuthResponse>.Success(response));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse<AuthResponse>.Failure(new List<string> { ex.Message }));
        }
    }
}
