using Test_ProductionDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using IcaroMobile_Backend.API.ItegrationTests;
using API.Helpers;
using Core.Entities;
using Newtonsoft.Json;
using API.Dtos;
using FluentAssertions;

namespace hamazonIntegrationTests
{
    public class ProductuControllerTest
    {
        private readonly HttpClient _httpClient;
        public ProductuControllerTest()
        {
            var applicationFactory = new WebApplicationFactory<Program>();
            _httpClient = applicationFactory.CreateClient();
        }

        [Fact]
        public async void ProductuController_GetProducts_ShouldBe_TaskActionResultPaginationProductToReturnDto_AsExpected()
        {
           
            HttpResponseMessage responseGet = await _httpClient.GetAsync("Api/Products");
            string content = await responseGet.Content.ReadAsStringAsync();

            Pagination<ProductToReturnDto>? result = JsonConvert.DeserializeObject<Pagination<ProductToReturnDto>>(content, new JsonSerializerSettings
            {
                DateTimeZoneHandling = DateTimeZoneHandling.Utc
            });

            result.Data.Should().BeAssignableTo<IReadOnlyList<ProductToReturnDto>>();
            result.Data[0].Name.Should().Be("Huawei Freebuds Lipstick");

            responseGet.EnsureSuccessStatusCode();

        }
    }
}
