using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly UserService _service;
        private readonly SystemUserService _serviceSu;

        public UserController(UserService service,SystemUserService serviceSu)
        {
            _service = service;
            _serviceSu = serviceSu;
        }
        
        // GET: api/User/U1
        [HttpGet("/api/user/getAll")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
        [HttpGet("/api/user/getAllProlog")]
        public async Task<ActionResult<IEnumerable<UserPrologDto>>> GetAllProlog()
        {
            return await _service.GetAllPrologAsync();
        }

        // GET: api/User/U2
        [HttpGet("/api/user/getOther/{id}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetOtherUsers(Guid id)
        {
            UserDto userAux = null;
            var userList = await _service.GetAllAsync();
            foreach(var u in userList)
            {
                if (u.Id.Equals(id))
                {
                    userAux = u;
                }
            }
            userList.Remove(userAux);
            return userList;
        }
        
        // GET: api/User/U2
        [HttpGet("/api/user/id/{id}")]
        public async Task<ActionResult<UserDto>> GetGetById(Guid id)
        {
            
            var user = await _service.GetByIdAsync(new UserId(id));
            
            //Console.Write("\n\n\n\nUserName =" +user.UserName.Value() +"\n\n\n\n");
            
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        
        // GET: api/Users/U3
        [HttpGet("/api/user/keyword/{keyword}")]
        public async Task<ActionResult<List<UserDto>>> GetByKeyword(String keyword)
        {
            var list = await _service.GetByKeywordAsync(keyword);

            if (list == null)
            {
                return NotFound();
            }

            return list;
        }

        // POST: api/User/U4
        [HttpPost("/api/user/registerUser")]
        public async Task<ActionResult<UserDto>> CreateUser(CreatingUserDto dto)
        {

            var i= await _serviceSu.AddAsync(new SystemUserDto(new Guid(), new UserEmail(dto.Email), new Password(dto.Password)));
           if (i == null)
           {
               return NotFound("The provided email is already in use!");
           }
           var sus = await _serviceSu.GetByEmailAsync(dto.Email);
           UserDto us = null;
           try
           {
                us = await _service.AddAsync(new UserDto(new Guid(), dto.UserName, dto.Birthday, dto.EmotionalState,
                   dto.Gender, dto.Description, dto.PhoneNumber, dto.Address, dto.Tags, sus.Id));
           }
           catch (Exception e)
           {
               await _serviceSu.DeleteAsync(new SystemUserId(i.Id));
               return BadRequest();
           }

           if (us == null)
            {
                await _serviceSu.DeleteAsync(new SystemUserId(i.Id));
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetGetById), new { id = us.Id }, us);
        }
        
        
        // DELETE: api/User/U5
        [HttpDelete("/api/user/delete/{id}")]
        public async Task<ActionResult<UserDto>> HardDelete(Guid id)
        {
            try
            {
                var us = await _service.DeleteAsync(new UserId(id));
                var sus=await _serviceSu.DeleteAsync(us.SystemUserId);

                if (sus==null)
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
        // GET: api/User/U6
        [HttpGet("/api/user/currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            SystemUserDto sysUser = await _serviceSu.GetLoggedUserAsync();
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
        // GET: api/User/U2
        [HttpGet("/api/user/idByEmail/{email}")]
        public async Task<ActionResult<Guid>> GetUserIdByEmail(string email)
        {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine(email);
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            var sys = await _serviceSu.GetByEmailAsync(email);
           
           Console.WriteLine();
           Console.WriteLine();
           Console.WriteLine();
           Console.WriteLine(sys.Email);
           Console.WriteLine(sys.Pass);
           Console.WriteLine();
           Console.WriteLine();
           Console.WriteLine();
           Console.WriteLine();
           
            var user = await _service.GetBySysUserAsync(sys.Id);

            Console.WriteLine(user.UserName);

            /*if (user == null)
            {
                return NotFound();
            }*/

            return user.Id;
        }

    }
}