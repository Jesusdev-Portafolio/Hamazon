
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infraestructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
       // private readonly IGenericRepository<Product> _productRepo;
       // private readonly IGenericRepository<ProductBrand> _productBrandRepo;
       // private readonly IGenericRepository<ProductType> _productTypeRepo;
       private readonly IProductRepository _productRepo;
        private readonly ITypeRepository _productTypeRepo;
        private readonly IBrandRepository _productBrandRepo;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository productRepo, IMapper mapper , ITypeRepository productTypeRepo, IBrandRepository productBrandRepo)
        {
            _productRepo = productRepo;
            _mapper = mapper;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts
            ([FromQuery] string orderBy = "Name", string AscDesc = "Asc", int brandId = 999, int typeId = 999, int pageIndex = 1, int pageSize = 6, string search =  null)
        {
            ProductType productType = await _productTypeRepo.loadProductType(typeId);
            ProductBrand productBrand = await _productBrandRepo.loadProductBrand(brandId);

            var products = await _productRepo.GetProductsAsync(orderBy, AscDesc, productBrand, productType, search);
            var totalItems = products.Count;
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            /* return products.Count > 0 ? Ok(new Pagination<ProductToReturnDto>(pageIndex, pageSize, totalItems, data)) 
                 : BadRequest("No hay productos Disponibles con las especificaciones indicadas en estos momentos");  
            */
            return Ok(new Pagination<ProductToReturnDto>(pageIndex, pageSize, totalItems, data));
        }

        [HttpGet("{id}")]
       public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
       {
           var product = await _productRepo.GetProductByIdAsync(id);

           if (product == null) return NotFound(new ApiResponse(404));
           return _mapper.Map<Product, ProductToReturnDto>(product);
       }
        
       [HttpGet("brands")]
       public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
       {
           return Ok(await _productRepo.GetProductBrandsAsync());
       }

       [HttpGet("types")]
       public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
       {
           return Ok(await _productRepo.GetProductTypesAsync());
       }  
    }
}
