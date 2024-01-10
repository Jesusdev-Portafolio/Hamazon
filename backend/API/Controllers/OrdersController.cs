using API.Dtos;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService order, IMapper mapper)
        {
            _orderService = order;
            _mapper = mapper;
        }


        [HttpGet()]
        public async Task<ActionResult<Pagination<IReadOnlyList<OrderToReturnDto>>>> GetOrdersForUser([FromQuery] string orderBy = "none", string ascDesc = "none", int pageIndex = 1, int pageSize = 6)
        {
            var email = HttpContext.User.RetrieveEmailFropmPrincipal();

            var orders = await _orderService.GetOrdersForUserAsync(email, orderBy, ascDesc);
            var totalOrders = orders.Count;
            var data = _mapper.Map<IReadOnlyList<OrderToReturnDto>>(orders);

            return Ok(new Pagination<OrderToReturnDto>(pageIndex, pageSize, totalOrders, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFropmPrincipal();

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if (order == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<OrderToReturnDto>(order));
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }


        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder (OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFropmPrincipal();

            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem Creating Order"));
            return Ok(order);
        }
    }
}
