using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
//using StackExchange.Redis;


namespace Infraestructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOrderRepository _orderRepository;

        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IOrderRepository orderRepository)
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
            _orderRepository = orderRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get basket from repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            //get item from product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);

            }

            //get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            //create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
            _unitOfWork.Repository<Order>().Add(order);

            //TODO: save db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            //OrderCreated ahora DeleteBasket
            await _basketRepo.DeleteBasketAsync(basketId);

            //return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            return await _orderRepository.GetOrderAsync(id, buyerEmail);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail, string orderBy, string ascDesc)
        {
            orderBy = orderBy.ToLower();
            ascDesc = ascDesc.ToLower();
            orderBy = orderBy != "date" && orderBy != "price" && orderBy != "none" ? "none" : orderBy;
            ascDesc = ascDesc != "desc" && ascDesc != "asc" && ascDesc != "none" ? "none" : ascDesc;

            var orders = await _orderRepository.GetOrdersByEmailAsync(buyerEmail);

            if (orderBy is "none" && ascDesc is "none") return orders;

            Func<Order, object> orderByFunc = null;
            if (orderBy == "date")
                orderByFunc = o => o.OrderDate;
            else orderByFunc = o => o.GetTotal();

            switch (ascDesc)
            {
                case "desc":
                    return orders.OrderByDescending(orderByFunc).ToList();
              
                default:
                    return orders.OrderBy(orderByFunc).ToList();
            }


        }
    }
}
