using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemUserController:ControllerBase
    {
        private readonly SystemUserService _service;

        public SystemUserController(SystemUserService service)
        {
            _service = service;
        }
        
        // PUT: api/SystemUser/SU1
        [HttpPut("{id}")]
        public async Task<ActionResult<SystemUserDto>> MarkAsLoggedInAsync(Guid id)
        {
            var prod = await _service.MarkAsLoggedInAsync(new SystemUserId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        }
        // PUT: api/SystemUser/SU2
        [HttpPut("{id}")]
        public async Task<ActionResult<SystemUserDto>> MarkAsLoggedOutAsync(Guid id)
        {
            var prod = await _service.MarkAsLoggedOutAsync(new SystemUserId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        } 
        // GET: api/SystemUser/SU3
        [HttpGet]
        public async Task<ActionResult<SystemUserDto>> GetCurrentLoggedUser()
        {
            var prod = await _service.GetLoggedUserAsync();

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }
        // GET: api/User/U1
        [HttpGet("/api/SystemUser/getAll")]
        public async Task<ActionResult<IEnumerable<SystemUserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        // DELETE: api/User/U5
        [HttpDelete("/api/SystemUser/delete/{id}")]
        public async Task<ActionResult<SystemUserDto>> HardDelete(Guid id)
        {
            try
            {
                var sus = await _service.DeleteAsync(new SystemUserId(id));
                if (sus==null)
                {
                    return NotFound();
                }

                return Ok(sus);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
    
    
}