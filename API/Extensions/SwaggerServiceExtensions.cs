using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "HamazonApi", Version = "v1" });
                var securitySquema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer esquema",
                    Name = "Authorizacion",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySquema);
                var securityRequirements = new OpenApiSecurityRequirement
                {
                    {securitySquema, new[]{ "Bearer"} }

                };

                c.AddSecurityRequirement(securityRequirements);
            });

            return services;
        }

        public static IApplicationBuilder UserSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));

            return app;
        }
    }
}
