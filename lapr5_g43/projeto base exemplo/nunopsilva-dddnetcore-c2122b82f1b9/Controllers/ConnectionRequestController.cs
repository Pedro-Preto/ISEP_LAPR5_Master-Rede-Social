using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionRequestController : ControllerBase
    {
        private readonly ConnectionRequestService _service;
        private readonly SystemUserService _serviceSu;
        private readonly UserService _serviceUser;
        public ConnectionRequestController(ConnectionRequestService service, UserService serviceUser,SystemUserService serviceSu)
        {
            _service = service;
            _serviceUser = serviceUser;
            _serviceSu = serviceSu;
        }
        
        
        [HttpGet("/api/connectionReq/getAll")]
        public async Task<ActionResult<List<ConnectionRequestDto>>> GetAll()
        {

            return _service.GetAllAsync().Result;
        }
     
        [HttpGet("/api/connectionReq/pendingConnections/{id}")]
        public async Task<ActionResult<List<ConnectionRequestDto>>> GetCurrentUserPendingConnections(Guid id)
        {
            var dto =  await _serviceUser.GetByIdAsync(new UserId(id));
            if (dto == null)
            {
                return BadRequest();
            }
            var connectionsInNet =_service.GetAllPendingConnectionRequestsAsync(new UserId(dto.Id.ToString())).Result;

            return connectionsInNet;
        }
        // POST: api/CR/CR1
        [HttpPost("/api/connectionReq/addConnectionRequest/")]
        public async Task<ActionResult<CreatingConnectionRequestDto>> CreateConnectionRequest(CreatingConnectionRequestDto dto)
        {
            var dto2 = new ConnectionRequestDto(new Guid(),DateTime.Now,dto.Message, dto.User1Id,
                dto.User2Id , dto.TagIdList,
                Int32.Parse(dto.ConnectionStrength));
            var us = await _service.AddAsync(dto2);

            return CreatedAtAction(nameof(GetById), new { id = us.Id }, us);
        }
        
        // GET: api/CR/CR2
        [HttpGet("/api/connectionReq/id/{id}")]
        public async Task<ActionResult<ConnectionRequestDto>> GetById(Guid id)
        {
            
            var cr = await _service.GetByIdAsync(new ConnectionRequestId(id));
            
            //Console.Write("\n\n\n\nUserName =" +user.UserName.Value() +"\n\n\n\n");
            
            if (cr == null)
            {
                return NotFound();
            }

            return cr;
        }
        
        // GET: api/CR/CR3
        [HttpGet("/api/connectionReq/allAcceptedConnections")]
        public async Task<ActionResult<List<ConnectionRequestDto>>> GetAllAcceptedConnections()
        {
            var connectionsInNet = _service.GetAllAcceptedAsync().Result;

            return connectionsInNet;
        }
        // GET: api/CR/CR4
        [HttpGet("/api/connectionReq/allDeniedConnections")]
        public async Task<ActionResult<List<ConnectionRequestDto>>> GetAllDeniedConnections()
        {
            var connectionsInNet = _service.GetAllDeniedAsync().Result;

            return connectionsInNet;
        }

        
        [HttpPost("/api/connectionReq/addConnectionRequestFromSuggested")]
        public async Task<ActionResult<CreatingConnectionRequestDto>> CreateConnectionRequestFromSuggested(CreatingConnectionRequestFromSuggestedDto dto)
        {
            var dto2 = new ConnectionRequestDto(new Guid(),DateTime.Now,dto.Message, dto.User1Id,
                dto.User2Id , dto.TagIdList,
                Int32.Parse(dto.ConnectionStrength));
            var us = await _service.AddAsync(dto2);

            return CreatedAtAction(nameof(GetById), new { id = us.Id }, us);
        }
        [HttpDelete("/api/connectionReq/delete/byUser/{userId}")]
        public async Task<ActionResult<ConnectionDto>> DeleteConnectionByUser(Guid userId)
        {
            try
            {
                var cat = await _service.GetAllAsync();
                if (cat.Count <= 0) return Ok(cat);
                foreach (var con in cat.Where(con => con.UserRequesterId.Value.Equals(userId.ToString()) || con.UserTargetId.Value.Equals(userId.ToString())))
                {
                    await _service.DeleteAsync(new ConnectionRequestId(con.Id));
                }
                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

    }
}