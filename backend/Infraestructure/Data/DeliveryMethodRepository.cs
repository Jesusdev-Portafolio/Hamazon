using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Data
{
    public class DeliveryMethodRepository : IDeliveryMethodRepository
    {
        private readonly StoreContext _context;

        public DeliveryMethodRepository( StoreContext context)
        {
            _context = context;
        }

        public async Task<DeliveryMethod> GetDeliveryMethodByIdAsync(int dmId)
        {
            return await _context.DeliveryMethods.FirstOrDefaultAsync(dm => dm.Id == dmId);
        }
    }
}
