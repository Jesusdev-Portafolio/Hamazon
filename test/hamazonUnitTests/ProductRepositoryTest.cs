using Core.Entities;
using Test_ProductionDb;
using FluentAssertions;
using Infraestructure.Data;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace hamazonUnitTests
{
    public class ProductRepositoryTest : IClassFixture<DbFixture>
    {
        [Fact]
        public async void ProductRepository_GetProductByIdAsync_ShouldBeProduct_AsExpected()
        {
            //Arrange
            var fixture = new DbFixture();
            var context = fixture.CreateContext();
            var productRepository = new ProductRepository(context);

            //Act
            var product = await productRepository.GetProductByIdAsync(1);

            //Assert

            product.Should().NotBeNull();
            product.Name.Should().Be("Product-test-1");

        }

        [Fact]
        public async void ProductRepository_GetProductByIdAsync_ShouldBeNull_AsExpected()
        {
            //Arrange
            var fixture = new DbFixture();
            var context = fixture.CreateContext();
            var productRepository = new ProductRepository(context);

            //Act
            var product = await productRepository.GetProductByIdAsync(77);

            //Assert

            product.Should().BeNull();

           
        }

        [Fact]
        public async void ProductRepository_GetProductsAsync_ShouldBe_IReadOnlyListProduct_AsExpected()
        {
            //Arrange
            var fixture = new DbFixture();
            var context = fixture.CreateContext();
            var productRepository = new ProductRepository(context);
            ProductBrand productBrand = new() {Id = 1 ,  Name = " Brand-test-1" };
            ProductType productType = new ProductType() {Id  = 1, Name = " Type-test-1" };

            //Act
            var products = await productRepository.GetProductsAsync("Name", "Desc" , productBrand, productType , null );

            //Assert

            products.Should().NotBeNull();
            products.Should().NotBeEmpty();
            products.Should().BeAssignableTo<IReadOnlyList<Product>>();

            

        }


    }
}
