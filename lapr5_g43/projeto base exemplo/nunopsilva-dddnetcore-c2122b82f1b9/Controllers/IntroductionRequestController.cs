using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.IntroductionRequests;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntroductionRequestController : ControllerBase
    {
        private readonly IntroductionRequestService _service;
        private readonly ConnectionRequestService _serviceConnectionRequest;
        public IntroductionRequestController(IntroductionRequestService service, ConnectionRequestService requestService)
        {
            _service = service;
            _serviceConnectionRequest = requestService;
        }

        // POST: api/CR/CR1
        [HttpPost("/api/ir/addIntroductionRequest/")]
        public async Task<ActionResult<CreatingIntroductionRequestDto>> CreateIntroductionRequest(CreatingIntroductionRequestDto dto)
        {
            var dto2 = new IntroductionRequestDto(new Guid(), DateTime.Now, dto.MessageToIntermediary, dto.MessageToTarget, dto.UserRequesterId, dto.UserIntermediaryId, dto.UserTargetId, IntroductionRequestStateEnum.AwaitingApproval,dto.TagList ,Int32.Parse(dto.ConnectionStrength));
            var us = await _service.AddAsync(dto2);

            return CreatedAtAction(nameof(GetById), new { id = us.Id }, us);
        }
     
        // GET: api/User/U1
        [HttpGet("/api/ir/getAll")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
        
        // GET: api/CR/CR2
        [HttpGet("/api/ir/id/{id}")]
        public async Task<ActionResult<IntroductionRequestDto>> GetById(Guid id)
        {
            
            var cr = await _service.GetByIdAsync(new IntroductionRequestId(id));
            
            //Console.Write("\n\n\n\nUserName =" +user.UserName.Value() +"\n\n\n\n");
            
            if (cr == null)
            {
                return NotFound();
            }

            return cr;
        }

        // GET: api/CR/CR2
        [HttpGet("/api/ir/user/{id}")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetByUser(Guid id)
        {
            
            var list = await _service.GetByUserAsync(new UserId(id));
            
            //Console.Write("\n\n\n\nUserName =" +user.UserName.Value() +"\n\n\n\n");
            
            if (list == null)
            {
                return NotFound();
            }

            return list;
        }
        
        [HttpGet("/api/ir/pendingIntro/{id}")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> GetUserPendingIntroductionRequestsByUser(Guid id)
        {
            
            var list = await _service.GetUserPendingIntroductionRequestAsync(new UserId(id));
            
            //Console.Write("\n\n\n\nUserName =" +user.UserName.Value() +"\n\n\n\n");
            
            if (list == null)
            {
                return NotFound();
            }

            return list;
        }
        
        
        
        // PUT: api/Connection/5
        [HttpPut("/api/ir/update/{id}")]
        public async Task<ActionResult<IntroductionRequestDto>> Update(Guid id, CreatingIntroductionRequestDto dto)
        {
            var b = await _service.GetByIdAsync(new IntroductionRequestId(id));
            if (b==null)
            {
                return BadRequest();
            }
            IntroductionRequestStateEnum a= ((IntroductionRequestStateEnum)Enum.Parse(typeof(IntroductionRequestStateEnum),dto.State));
         
           var cat = await _service.UpdateAsync(new IntroductionRequestId(id),new IntroductionRequestDto(new Guid(), DateTime.Parse( dto.Date),dto.MessageToIntermediary,dto.MessageToTarget ,dto.UserRequesterId ,dto.UserIntermediaryId,dto.UserTargetId,a,dto.TagList,Int32.Parse(dto.ConnectionStrength)));
           
           if (a == IntroductionRequestStateEnum.Approved)
           {
               var con = await _serviceConnectionRequest.AddAsync(new ConnectionRequestDto(new Guid(), new ConnectionRequestDate(DateTime.Now), new ConnectionRequestMessage(cat.MessageToTarget.Message), cat.UserRequesterId, cat.UserTargetId, cat.TagList,cat.ConnectionStrength));
           }

           try
            {
                
                
                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        [HttpDelete("/api/ir/delete/byUser/{userId}")]
        public async Task<ActionResult<ConnectionDto>> DeleteConnectionByUser(Guid userId)
        {
            try
            {
                
                    var cat = await _service.GetAllAsync();

                    if (cat.Count <= 0) return Ok(cat);
                    foreach (var con in cat.Where(con =>
                        con.UserRequesterId.Value.Equals(userId.ToString()) ||
                        con.UserIntermediaryId.Value.Equals(userId.ToString()) ||
                        con.UserTargetId.Value.Equals(userId.ToString())))
                    {
                        await _service.DeleteAsync(new IntroductionRequestId(con.Id));
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