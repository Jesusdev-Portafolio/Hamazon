using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Data
{
    public class BrandRepository : IBrandRepository
    {
        private readonly StoreContext _context;
            public BrandRepository(StoreContext context)
            {
                _context = context;
            }

        public async Task<ProductBrand> loadProductBrand(int id)
        {
            return await _context.ProductBrands.FirstOrDefaultAsync(b => b.Id == id);    
        }
        public async Task<IReadOnlyList<ProductBrand>> GetAllBrandsAsync()
        {      
            return await _context.ProductBrands.ToListAsync();
        }
    }
}
