using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;

namespace API.Controllers
{
    [Authorize(Roles = "User.Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly GraphServiceClient _graphClient;
        private readonly IConfiguration _configuration;
        public AdministrationController(GraphServiceClient graphClient, IConfiguration configuration)
        {
            _graphClient = graphClient;
            _configuration = configuration;
        }
        
        [HttpGet]
        [Route("users/roles")]
        public IActionResult GetUsersRoles()
        {
            var principalId = _configuration.GetSection("Graph").GetValue<string>("EnterpriseApplicationId");
            var applicationReq = _graphClient.ServicePrincipals[principalId].Request().GetAsync();
            var usersReq = _graphClient.ServicePrincipals[principalId].AppRoleAssignedTo.Request().GetAsync();
            var application = applicationReq.Result;
            var users = usersReq.Result;

            var roles = application.AppRoles;

            var res = users.Select(x => new
            {
                DisplayName = x.PrincipalDisplayName,
                Role = roles.Where(z => z.Id == x.AppRoleId).Select(t => t.Value).FirstOrDefault()
            });

            return StatusCode(StatusCodes.Status200OK, res);
        }
    }
}