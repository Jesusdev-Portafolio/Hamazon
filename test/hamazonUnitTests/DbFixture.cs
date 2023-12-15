using Core.Entities;
using Infraestructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test_ProductionDb
{
    public class DbFixture
    {
        private const string ConnectionString = @"Server=localhost; Port=5432; User Id=appuser; Password=secreto; Database=proyectshopTest";

        private static readonly object _lock = new();
        private static bool _databaseInitialized;

        public DbFixture()
        {
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    using (var context = CreateContext())
                    {
                        context.Database.EnsureDeleted();
                        context.Database.EnsureCreated();

                        context.Products.AddRange(
                            new Product { Name = "Product-test-1" , Description="test1", PictureUrl="test", Price=2 , ProductBrandId = 1 , ProductTypeId  = 1 },
                            new Product { Name = "Product-test-2" , Description="test2", PictureUrl="test", Price=2 , ProductBrandId = 2 , ProductTypeId  = 1 },
                            new Product { Name = "Product-test-3", Description = "test3", PictureUrl = "test", Price = 2, ProductBrandId = 1, ProductTypeId = 1 }
                        );
                        context.ProductTypes.AddRange(
                            new ProductType { Name = " Type-test-1" },
                            new ProductType { Name = " Type-test-2" }

                            );
                        context.ProductBrands.AddRange(
                            new ProductBrand { Name = " Brand-test-1" },
                            new ProductBrand { Name = " Brand-test-2" }

                            );
                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        public StoreContext CreateContext()
            => new StoreContext(
                new DbContextOptionsBuilder<StoreContext>()
                    .UseNpgsql(ConnectionString)
                    .Options);
    }
}
