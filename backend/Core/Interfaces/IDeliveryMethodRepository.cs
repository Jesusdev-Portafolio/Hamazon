using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IDeliveryMethodRepository
    {
        Task<DeliveryMethod> GetDeliveryMethodByIdAsync( int dmId);
    }
}
