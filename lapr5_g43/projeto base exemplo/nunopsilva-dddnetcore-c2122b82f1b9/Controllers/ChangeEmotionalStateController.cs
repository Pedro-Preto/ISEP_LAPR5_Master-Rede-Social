using System;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.CompilerServices;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangeEmotionalStateController:ControllerBase
    {
        
        private readonly UserService _service;
        private readonly SystemUserService _systemUserService;
        public ChangeEmotionalStateController(UserService service, SystemUserService systemUserService)
        {
            _service = service;
            _systemUserService = systemUserService;
        }
        // PUT: api/EmotionalState/ES1
        [HttpPut("/api/user/emotionalState/{id}")]
        public async Task<ActionResult<UserDto>> UpdateEmotionalState(Guid id,ChangeEmotionalStateDto dto1)
        {
            var dto = await _service.GetByIdAsync(new UserId(id));
           
            if (dto==null)
            {
                return BadRequest();
            }
            
            
            EmotionalStateEnum a= ((EmotionalStateEnum)Enum.Parse(typeof(EmotionalStateEnum),dto1.EmotionalState));
         
           dto.EmotionalState.Update(a);
             
            try
            {
                var us = await _service.UpdateEmotionalStateAsync(dto);
                
                if (us == null)
                {
                    return NotFound();
                }
                return Ok(us);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

    }
}