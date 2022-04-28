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
    public class TypeRepository  : ITypeRepository
    {
        private readonly StoreContext _context;
        public TypeRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<ProductType> loadProductType( int id)
        {
            return  await _context.ProductTypes.FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}

