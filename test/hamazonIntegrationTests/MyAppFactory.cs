using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Moq;
using System.IO;

namespace IcaroMobile_Backend.API.ItegrationTests;

public class MyAppFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration(config => config
             .SetBasePath(Directory.GetCurrentDirectory())
             .AddJsonFile("appsettings.test.json", true, true)
             .AddEnvironmentVariables()
         );

        builder.ConfigureServices(services =>
        {
            services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
                    w.EnvironmentName == "Tests" &&
                    w.ApplicationName == "IcaroMobile_Backend.Api"));
        });

        base.ConfigureWebHost(builder);
    }
}
