using System;
using System.Threading.Tasks;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        private readonly UserService _service;
        private readonly SystemUserService _serviceSu;

        public LogoutController(UserService service, SystemUserService serviceSu)
        {
            _service = service;
            _serviceSu = serviceSu;
        }

        // GET: api/Logout/L1
        public async Task<ActionResult<UserDto>> GetGetEmail(string email)
        {
            var sysUser = await _serviceSu.GetByEmailAsync(email);
            if (sysUser == null)
            {
                return NotFound();
            }

            var user = await _service.GetBySysUserAsync(sysUser.Id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Logout/L2
        [HttpPut("/api/user/logout")]
        public async Task<ActionResult<SystemUserDto>> Logout(UserIdDto dto)
        {
            var user = await _service.GetByIdAsync(new UserId(dto.UserId));
            var sys = await _serviceSu.GetByIdAsync(user.SystemUserId);

            if (sys == null)
            {
                return NotFound();
            }

            await _serviceSu.MarkAsLoggedOutAsync(new SystemUserId(sys.Id));
            return sys;
            ;
            
        }

    }
}