using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickUsersToAddToNetController : ControllerBase
    {
        private readonly SystemUserService _systemUserService;
        private readonly UserService _userService;
        private readonly ConnectionService _connectionService;
        private readonly ConnectionRequestService _connectionRequestService;

        private const String NEW_USER_MESSAGE = "Automatic Message: this request is being sent to help a new User start his net.";
        private const int NEW_USER_CONNECTION_STRENGTH = 5 ;
        


        public PickUsersToAddToNetController(SystemUserService systemUserService, UserService userService, 
                                            ConnectionService connectionService, ConnectionRequestService connectionRequestServiceService)
        {
            _systemUserService = systemUserService;
            _userService = userService;
            _connectionService = connectionService;
            _connectionRequestService = connectionRequestServiceService;
        }
        
        [HttpGet("/api/users/allUsers")]
        public async Task<ActionResult<List<Guid>>> GetAllUsers()
        {
            List<Guid> allUserIds = new List<Guid>();
            List<UserDto> allUsers = await _userService.GetAllAsync();
            if (allUsers == null)
            {
                return NotFound();
            }

            foreach (var user in allUsers)
            {
                if (user == null)
                {
                    return NotFound();
                }
                allUserIds.Add(user.Id);
            }
            
            return allUserIds;
        }
        
        
        [HttpPost("/api/user/addUsers/id/{id}")]
        public async Task<ActionResult<List<ConnectionRequestDto>>> SendRequestsToSelectedUsers(string id, CreatingSelectedUsersDto selectedUsers)
        {
            UserDto currentUserDto = _userService.GetByIdAsync(new UserId(id)).Result;
            List<ConnectionRequestDto> connectionRequestDtoList = new List<ConnectionRequestDto>();
            
            foreach(string targetUserId in selectedUsers.SelectedUsers)
            {
                ConnectionRequestDto connectionRequestDto = await _connectionRequestService.AddAsync(new ConnectionRequestDto(
                    new Guid(),
                    new ConnectionRequestDate(DateTime.Now),
                    new ConnectionRequestMessage(NEW_USER_MESSAGE), 
                    new UserId(currentUserDto.Id), new UserId(targetUserId), 
                    new List<ConnectionTags>(),
                    new ConnectionStrength(NEW_USER_CONNECTION_STRENGTH)));
                connectionRequestDtoList.Add(connectionRequestDto);
            }

            return connectionRequestDtoList;
        }
    }
}