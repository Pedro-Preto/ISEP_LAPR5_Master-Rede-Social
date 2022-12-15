using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderBoardController
    {
        private readonly ConnectionService _service;
        private readonly UserService _serviceUser;

        public LeaderBoardController(ConnectionService service, UserService serviceUser)
        {
            _service = service;
            _serviceUser = serviceUser;
        }

        [HttpGet("/api/connection/LeaderBoard/Stats")]
        public async Task<ActionResult<List<LeaderBoard>>> GetLeaderBoardStats()
        {
            var allConnections = await _service.GetAllAsync();


            var leaderBoard = new Dictionary<UserName, LeaderBoard>();

            foreach (var user in allConnections)
            {
                var userName1 = await _serviceUser.GetByIdAsync(user.User1Id);
                var userName2 = await _serviceUser.GetByIdAsync(user.User2Id);

                if (!ContainUserName(leaderBoard, userName1.UserName))
                {
                    leaderBoard.Add(userName1.UserName, new LeaderBoard(userName1.UserName.Username, 0, 0));

                }

                if (!ContainUserName(leaderBoard, userName2.UserName))
                {
                    leaderBoard.Add(userName2.UserName, new LeaderBoard(userName2.UserName.Username, 0, 0));
                }
            }

            foreach (var user in allConnections)
            {
                var userName1 = await _serviceUser.GetByIdAsync(user.User1Id);
                var userName2 = await _serviceUser.GetByIdAsync(user.User2Id);

                if (ContainUserName(leaderBoard, userName1.UserName))
                {
                    leaderBoard[userName1.UserName].Points += 1;
                }

                if (ContainUserName(leaderBoard, userName2.UserName))
                {
                    leaderBoard[userName2.UserName].Points += 1;
                }
            }

            var position = 1;
            foreach (var entry in leaderBoard.OrderBy(key => key.Value.Points).Reverse())
            {
                leaderBoard[entry.Key].Position = position;
                position+=1;
            }
            
            return leaderBoard.Select(here => here.Value).ToList().OrderBy(value=>value.Position).ToList();
        }
        
        
        [HttpGet("/api/connection/LeaderBoard/Fortress")]
        public async Task<ActionResult<int>> GetLeaderBoardFortress()
        {
            var leaderBoardUsers =await _service.GetAllAsync();

            return leaderBoardUsers.Sum(number => number.User1ConnectionStrength.Strength + number.User2ConnectionStrength.Strength);
        }

        private static bool ContainUserName(Dictionary<UserName, LeaderBoard>leaderBoard,UserName name)
        {
            return leaderBoard.ContainsKey(name);
        }
        
        
        
    }
}