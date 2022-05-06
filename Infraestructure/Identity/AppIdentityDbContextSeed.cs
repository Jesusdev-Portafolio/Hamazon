using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    DisplayName = "Jesus",
                    Email = "jesusno.ven@gmail.com",
                    UserName = "jesusno.ven@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Jesus",
                        LastName = "Noguera",
                        Street = "12 jardines",
                        City = "Caracas",
                        State = "DC",
                        ZipCode = "28770"

                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
