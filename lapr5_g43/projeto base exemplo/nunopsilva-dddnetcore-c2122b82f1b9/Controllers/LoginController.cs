using System;
using System.Threading.Tasks;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserService _service;
        private readonly SystemUserService _serviceSu;

        public LoginController(UserService service,SystemUserService serviceSu)
        {
            _service = service;
            _serviceSu = serviceSu;
        }
        // GET: api/Login/L1
        [HttpGet("{email}")]
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
        
        // GET: api/Login/L2
        [HttpPut("/api/user/login")]
        public async Task<ActionResult<SystemUserDto>> Login(MakingLoginDto dto)
        {
            //var user = await _service.GetByEmailAsync(email);
            var sys = await _serviceSu.GetByEmailAsync(dto.Email);

            if (sys==null)
            {
                return NotFound();
            }
            if (sys.Pass.Value() != dto.Pass)
            {
                return NotFound();
            }
            return await _serviceSu.MarkAsLoggedInAsync(new SystemUserId(sys.Id));
        }
        
    }
}