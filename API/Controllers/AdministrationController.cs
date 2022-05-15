using System;
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
        [Route("users")]
        public IActionResult GetUsers()
        {
            var usersReq = _graphClient.Users.Request().GetAsync();
            var users = usersReq.Result;
            var res = users.Select(x => new
            {
                x.Id,
                Name = x.DisplayName,
                Email = x.Mail
            }).ToList();

            return StatusCode(StatusCodes.Status200OK, res);
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
                Id = x.PrincipalId,
                DisplayName = x.PrincipalDisplayName,
                Role = roles.Where(z => z.Id == x.AppRoleId).Select(t => t.Value).FirstOrDefault()
            });

            return StatusCode(StatusCodes.Status200OK, res);
        }
        
        [HttpPost]
        [Route("users/{userId}/roles/{role}")]
        public IActionResult AssignUserRole(string userId, string role)
        {
            var resourceId = _configuration.GetSection("Graph").GetValue<string>("EnterpriseApplicationId");
            role = _configuration.GetSection("Graph").GetValue<string>($"Roles:{role}");

            var appRoleAssignment = new AppRoleAssignment
            {
                PrincipalId = Guid.Parse(userId),
                ResourceId = Guid.Parse(resourceId),
                AppRoleId = Guid.Parse(role)
            };

            try
            {
                _graphClient.Users[userId].AppRoleAssignments
                    .Request()
                    .AddAsync(appRoleAssignment);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status200OK, false);
            }
            return StatusCode(StatusCodes.Status200OK, true);
        }
    }
}