using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
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
    public class UpdateConnectionRequestController:ControllerBase
    {
        
        private readonly ConnectionRequestService _service;
        private readonly ConnectionService _serviceConnection;

        
        public UpdateConnectionRequestController(ConnectionRequestService service,ConnectionService serviceConnection)
        {
            _service = service;
            _serviceConnection = serviceConnection;
        }
        
        // PUT: /api/connectionReq/updateRequest
        [HttpPut("/api/connectionReq/updateRequest")]
        public async Task<ActionResult<ConnectionRequestDto>> UpdateConnectionRequestState(UpdateConnectionRequestDto dto1)
        {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("ESTOU AQIO");
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            var dto = await _service.GetByIdAsync(new ConnectionRequestId(dto1.Id));
           
            if (dto==null)
            {
                return BadRequest();
            }
            ConnectionRequestStateEnum a= ((ConnectionRequestStateEnum)Enum.Parse(typeof(ConnectionRequestStateEnum),dto1.ConnectionState));
            ConnectionRequestDto x = null;
            switch (a)
            {
               case ConnectionRequestStateEnum.Accepted:
                   
                   x = await _service.AcceptConnectionRequestStateAsync(dto);
                   var conDto = new ConnectionDto(new Guid(),dto.UserRequesterId,dto.ConnectionStrength,new ConnectionRelationStrength(0),dto.UserTargetId,new ConnectionStrength(Int32.Parse(dto1.StrengthUserTarget)),new ConnectionRelationStrength(0),ListConverted(dto1.Tags));
                   var connection = await _serviceConnection.AddAsync(conDto);
                   if (connection == null)
                   {
                       return BadRequest("After accepting the Introduction Request It Wasn't possible to create a connection");
                   }
                   break;
                case ConnectionRequestStateEnum.Denied: x = await _service.DenyConnectionRequestStateAsync(dto);
                    break;
            }
            try
            {
                if (x == null)
                {
                    return NotFound();
                }
                return Ok(x);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        private static List<ConnectionTags> ListConverted(IEnumerable<string> list)
        {
            return list.Select(b => new ConnectionTags(b)).ToList();
        }
    }
}