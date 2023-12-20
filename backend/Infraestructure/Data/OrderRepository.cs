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
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreContext _context;

        public OrderRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Order> GetOrderAsync(int id, string email)
        {
            return await _context.Orders
                               .Include(o => o.OrderItems)
                               .Include(o => o.DeliveryMethod)
                               .FirstOrDefaultAsync(o => o.BuyerEmail == email && o.Id == id);
                               
        }


        public async Task<IReadOnlyList<Order>> GetOrdersByEmailAsync( string email)
        {
           return await _context.Orders
                                .Include(o => o.OrderItems)
                                .Include(o => o.DeliveryMethod)
                                .Where( o => o.BuyerEmail == email)
                                .OrderByDescending( o => o.OrderDate)
                                .ToListAsync();
                               
        }
    }
}
