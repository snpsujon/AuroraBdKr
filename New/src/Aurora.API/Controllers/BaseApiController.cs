using Microsoft.AspNetCore.Mvc;

namespace Aurora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
}
