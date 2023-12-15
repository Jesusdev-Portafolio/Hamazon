using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Moq;
using System.IO;
using System.Threading.Tasks;
using Xunit;
using System.Net.Http;

namespace IcaroMobile_Backend.API.ItegrationTests;

public class TestingFixture : IAsyncLifetime
{
    private static IConfigurationRoot? _configuration;
    public static HttpClient? _httpClient;

    Task IAsyncLifetime.InitializeAsync()
    {
        MyAppFactory config = new();
        config.WithWebHostBuilder(webHostBuilder =>
        {
            webHostBuilder.ConfigureAppConfiguration(config => config
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.test.json", true, true)
                 .AddEnvironmentVariables()
             );

            webHostBuilder.ConfigureServices(services =>
            {
                services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
                        w.EnvironmentName == "Test" &&
                        w.ApplicationName == "IcaroMobile_Backend.Api"));
            });
        });
        
        _httpClient = config.CreateClient();

        IConfigurationBuilder builder = new ConfigurationBuilder()
                                           .SetBasePath(Directory.GetCurrentDirectory())
                                           .AddJsonFile("appsettings.test.json", true, true)
                                           .AddEnvironmentVariables();

        _configuration = builder.Build();
        return Task.CompletedTask;
    }

    public Task DisposeAsync()
    {
        return Task.CompletedTask;
    }
}
