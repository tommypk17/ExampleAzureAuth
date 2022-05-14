using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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