using Core.Entities;
using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> GetOrderAsync(int id, string email); //necesito el email del usuario y el id de la orden para mostrar esa especifica
        Task<IReadOnlyList<Order>> GetOrdersByEmailAsync( string email); // con el email ya le muestro todas las que tiene
    }
}
