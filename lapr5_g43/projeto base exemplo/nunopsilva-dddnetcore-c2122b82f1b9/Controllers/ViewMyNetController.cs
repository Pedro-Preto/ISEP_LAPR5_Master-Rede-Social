using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    
    [Route("api/[controller]")]
    public class ViewMyNetController : ControllerBase
    {
        private readonly SystemUserService _systemUserService;
        private readonly UserService _userService;
        private readonly ConnectionService _connectionService;
        
        public ViewMyNetController(SystemUserService systemUserService, UserService userService, ConnectionService connectionService)
        {
            _systemUserService = systemUserService;
            _userService = userService;
            _connectionService = connectionService;
        }
        
        
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            SystemUserDto sysUser = await _systemUserService.GetLoggedUserAsync();
            if (sysUser == null)
            {
                return NotFound();
            }
            
            var user = await _userService.GetBySysUserAsync(sysUser.Id);
            if (user == null)
            {
                return NotFound();
            }
            
            return user;
        }

        // GET: api/Net/5
        [HttpGet("/api/net/viewNet/{id}/{level}")]
        public async Task<ActionResult<List<UserDto>>> GetNetOfCurrentUserUpToSelectedLevel(string id, string level)
        {
            UserDto currentUser = _userService.GetByIdAsync(new UserId(id)).Result; 
            List<UserDto> usersInNet = new List<UserDto>();
            List<ConnectionDto> connectionsInNet = new List<ConnectionDto>();

            await GetNetOfUserUpToSelectedLevel(currentUser, Int32.Parse(level), usersInNet, connectionsInNet);

            return usersInNet;
        }
        
        public async Task GetNetOfUserUpToSelectedLevel(UserDto userDto, int level,
                                                        List<UserDto> usersInNet, List<ConnectionDto> connectionsInNet)
        {
            Console.WriteLine("\n\nCurrent User: " +userDto.Id.ToString() +" Current level: " +level +"\n\n");
            int lvlToSend = level - 1;
            bool isAlreadyInList;
            UserId userId;
            UserDto otherUser;
            usersInNet.Add(userDto);
            if (level == 0)
            {
                return;
            }

            foreach (ConnectionDto connection in _connectionService.GetByUserAsync(userDto).Result)
            {
                isAlreadyInList = false;
                userId = _connectionService.GetOtherUserOfConnection(connection, userDto).Result;
                otherUser = await _userService.GetByIdAsync(userId);
                foreach (var u in usersInNet)
                {
                    if (u.Id.Equals(otherUser.Id))
                    {
                        isAlreadyInList = true;
                    }
                }
                Console.WriteLine("\n\nOther User: " +otherUser.Id.ToString() +"");
                Console.WriteLine("Is Already in List: " +isAlreadyInList.ToString() +"\n\n");
                if (isAlreadyInList == false)
                {
                    connectionsInNet.Add(connection);
                    await GetNetOfUserUpToSelectedLevel(otherUser, lvlToSend, usersInNet, connectionsInNet);
                }
                
            }

        }
        
    }
    
}
