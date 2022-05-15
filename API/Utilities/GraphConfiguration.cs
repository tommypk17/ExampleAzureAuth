using Azure.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Graph;

namespace API.Utilities
{
    public static class GraphConfiguration
    {
        public static IServiceCollection AddGraphComponent(this IServiceCollection services, IConfiguration configuration)
        {
            var scopes = new[] {"https://graph.microsoft.com/.default"};

            var tenantId = configuration.GetSection("Graph").GetValue<string>("TenantId");
            var clientId = configuration.GetSection("Graph").GetValue<string>("ClientId");
            var clientSecret = configuration.GetSection("Graph").GetValue<string>("ClientSecret");

            var options = new TokenCredentialOptions()
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
            };

            var clientSecretCredential = new ClientSecretCredential(tenantId, clientId, clientSecret, options);

            services.AddSingleton(x =>
            {
                return new GraphServiceClient(clientSecretCredential, scopes);
            });

            return services;
        }
    }
}