using System;
using System.Threading.Tasks;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UpdateConnectionController: ControllerBase

    {

        private readonly ConnectionService _service;


        public UpdateConnectionController(ConnectionService service)
        {
            _service = service;
        }

        // PUT: /api/connection/updateConnectionStrength
        [HttpPut("/api/connection/updateConnectionStrengthUser2/{id},{strength}")]
        public async Task<ActionResult<ConnectionDto>> UpdateConnectionStrengthUser2Async(Guid id, int strength)
        {
            var dto = await _service.GetByIdAsync(new ConnectionId(id));

            if (dto == null)
            {
                return BadRequest();
            }

            
            var connection = await _service.UpdateConnectionStrengthUser2(dto, strength);
            
            try
            {
                if (connection == null)
                {
                    return NotFound();
                }
                return Ok(connection);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // PUT: /api/connection/updateTags
        [HttpPut("/api/connection/updateTags/{id},{tagId}")]
        public async Task<ActionResult<ConnectionDto>> UpdateTagsAsync(Guid id, string tagId)
        {
            var dto = await _service.GetByIdAsync(new ConnectionId(id));

            if (dto == null)
            {
                return BadRequest();
            }

            var connection = await _service.UpdateTags(new ConnectionId(id), new ConnectionTags(tagId));
            
            try
            {
                if (connection == null)
                {
                    return NotFound();
                }
                return Ok(connection);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }


    }
}