    using API.Extensions;
using API.Helpers;
using API.Middleware;
using Core.Entities.Identity;
using Infraestructure.Data;
using Infraestructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

//TODO: Hacer el Controlador de ordenes


//agg services al contenedor

builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(c => 
c.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDbContext<AppIdentityDbContext>(c =>
    c.UseNpgsql(builder.Configuration.GetConnectionString("IdentityConnection"))
);

//redis para el carrito singleton para que exista mientras este iniciada la aplicacion, si se apaga la aplicacion no pasa nada porque hace snapshoots cada minuto bueno
//se perderia lo de cada minuto obviamente

builder.Services.AddSingleton<IConnectionMultiplexer>(c => {
    var configuration = ConfigurationOptions.Parse(builder.Configuration
        .GetConnectionString("Redis"), true);
    return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddApplicationServices();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");

    });
});

//pipeline http request

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();

app.UseRouting();

app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.UserSwaggerDocumentation();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var loggerFactory = services.GetRequiredService<ILoggerFactory>();
try
{
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context, loggerFactory);
    var userManager = services.GetRequiredService<UserManager<User>>();
    var identityContext = services.GetRequiredService<AppIdentityDbContext>();

    await identityContext.Database.MigrateAsync();
    await AppIdentityDbContextSeed.SeedUserAsync(userManager);
}
catch (Exception ex)
{
  var logger = loggerFactory.CreateLogger<Program>();
  logger.LogError(ex, "Un error ha ocurrido mientras se hacia la migracion");
}

await app.RunAsync();

public partial class Program { }
