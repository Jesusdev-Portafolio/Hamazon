using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Core.Interfaces;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync(string orderBy, string AscDesc, ProductBrand brand, ProductType type, string search)
        {
            //ME TRAIGO TODO
            var products = _context.Products
                         .Include(p => p.ProductType)
                         .Include(p => p.ProductBrand).AsEnumerable();

            orderBy = (orderBy == "Name" || orderBy == "Price") ? orderBy : "Name";  //VALOR POR DEFECTO = NAME

            //EMPIEZO A APLICAR FILTROS
            Func<Product, Object> orderByFunc = null;
            if (orderBy == "Name")
                orderByFunc = p => p.Name;
            else orderByFunc = p => p.Price;

          
            if (search != null)
            {
                try
                {
                    products = products.Where(p => p.Name.ToLower().Contains(search.ToLower()));
                }
                catch (Exception)
                {
                    return null;
                }
            }

            if (brand != null)
            {
                products = products.Where(p => p.ProductBrandId == brand.Id);
            }
            if (type != null)
            {
                products = products.Where(p => p.ProductTypeId == type.Id);
            }

            switch (AscDesc)
            {
                case "Desc":
                    products = products.OrderByDescending(orderByFunc);
                    return await Task.FromResult(products.ToList());
                default:
                    products = products.OrderBy(orderByFunc);
                    return await Task.FromResult(products.ToList());
            }
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
    }
}
