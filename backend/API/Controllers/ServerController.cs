

using API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ServerController : BaseApiController
    {
        [HttpGet]
        public ActionResult<UserDto> GetCurrentDate() => Ok(DateTime.Now);
        
    }
}
