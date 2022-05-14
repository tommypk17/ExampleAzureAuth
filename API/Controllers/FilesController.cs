using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = "User.Default")]
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "User.Default")]
    
    public class FilesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var res = new string[]{"Yellow", "Green", "Blue"};
            return StatusCode(StatusCodes.Status200OK, res);
        }
    }
}