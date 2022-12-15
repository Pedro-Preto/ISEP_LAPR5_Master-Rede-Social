using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {
        private ConnectionService _service;
        private readonly UserService _serviceUser;

        public ConnectionController(ConnectionService service, UserService serviceUser)
        {
            _service = service;
            _serviceUser = serviceUser;
        }

        // GET: api/Connection
        [HttpGet("/api/connection/getAll")]
        public async Task<ActionResult<IEnumerable<ConnectionDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        [HttpGet("/api/connection/getAllProlog")]
        public async Task<ActionResult<IEnumerable<ConnectionPrologDto>>> GetAllProlog()
        {
            return await _service.GetAllPrologAsync();
        }

        // GET: api/Connection/5
        [HttpGet("/api/connection/id/{id}")]
        public async Task<ActionResult<ConnectionDto>> GetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new ConnectionId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // GET: api/Connection/5
        [HttpGet("/api/connection/id")]
        public async Task<ActionResult<IEnumerable<ConnectionDto>>> GetByUser(UserDto user)
        {
            return await _service.GetByUserAsync(user);
        }


        [HttpGet("/api/user/GetFriends/{name}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUserFriends(string name)
        {
            var userList = await _serviceUser.GetByKeywordAsync(name);

            UserDto u = null;
            foreach (var a in userList)
            {
                if (a.UserName.Username.Equals(name))
                {
                    u = a;
                }
            }

            if (u == null)
            {
                return BadRequest("That user doesn't exist!!");
            }

            var connections = await _service.GetByUserAsync(u);

            var list = new List<UserDto>();
            if (connections.Count != 0)
            {
                foreach (var conn in connections)
                {
                    if (u.Id.ToString().Equals(conn.User1Id.Value))
                    {
                        var ab = await _serviceUser.GetByIdAsync(conn.User2Id);
                        list.Add(ab);
                    }
                    else
                    {
                        var ab = await _serviceUser.GetByIdAsync(conn.User1Id);
                        list.Add(ab);
                    }

                }

            }

            return list;
        }

        [HttpGet("/api/user/GetCommonFriends/{name1}/{name2}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersCommonFriends(string name1, string name2)
        {

            var a = GetUserFriends(name1).Result.Value.ToList();

            var b = GetUserFriends(name2).Result.Value.ToList();

            var newData = (from objA in a
                join objB in b on objA.UserName.Username equals objB.UserName.Username
                select objA /*or objB*/).ToList();

            return newData.ToList();
        }

        [HttpGet("/api/user/GetTotalFirstLevelConnectionStrength/{id}")]
        public async Task<ActionResult<int>> GetTotalFirstLevelConnectionStrength(string id)
        {
            var aux = await _service.GetAllAsync();
            var connections = new List<ConnectionDto>();
            foreach (var c in aux)
            {
                if (c.User1Id.Value == id || c.User2Id.Value == id)
                {
                    connections.Add(c);
                }
            }

            int sum = 0;

            if (connections.Count == 0)
            {
                return 0;
            }

            foreach (var c in connections)
            { 
                sum += c.User1ConnectionStrength.Strength + c.User2ConnectionStrength.Strength;

            }

            

            return sum;
        }

        // POST: api/Connection
        [HttpPost("/api/connection/addConnection")]
        public async Task<ActionResult<ConnectionDto>> Create(CreatingConnectionDto dto)
        {
            var cat = await _service.AddAsync(new ConnectionDto(dto.User1Id, dto.User1ConnectionStrength,
                dto.User1RelationStrength, dto.User2Id, dto.User2ConnectionStrength, dto.User2RelationStrength,
                dto.ConnectionTags));

            return CreatedAtAction(nameof(GetById), new {id = cat.Id}, cat);
        }

        // POST: api/Connection
        [HttpPost("/api/connection/addConnectionFromSuggested")]
        public async Task<ActionResult<ConnectionDto>> CreateFromSuggested(CreatingConnectionFromSuggestedDto dto)
        {
            var cat = await _service.AddAsync(new ConnectionDto(dto.User1Id, dto.User1ConnectionStrength,
                dto.User1RelationStrength, dto.User2Id, dto.User2ConnectionStrength, dto.User2RelationStrength,
                dto.ConnectionTags));

            return CreatedAtAction(nameof(GetById), new {id = cat.Id}, cat);
        }

        [HttpPost("/api/connection/addConnectionFromNames")]
        public async Task<ActionResult<ConnectionDto>> CreateFromNames(CreatingConnectionFromNamesDto namesDto)
        {
            var user1Dto = _serviceUser.GetByKeywordAsync(namesDto.User1Name).Result[0];
            var user2Dto = _serviceUser.GetByKeywordAsync(namesDto.User2Name).Result[0];

            CreatingConnectionFromSuggestedDto dto =
                new CreatingConnectionFromSuggestedDto(user1Dto.Id.ToString(), user2Dto.Id.ToString());

            var cat = await _service.AddAsync(new ConnectionDto(dto.User1Id, dto.User1ConnectionStrength,
                dto.User1RelationStrength, dto.User2Id, dto.User2ConnectionStrength, dto.User2RelationStrength,
                dto.ConnectionTags));

            return CreatedAtAction(nameof(GetById), new {id = cat.Id}, cat);
        }

        [HttpGet("/api/connection/ids/{id}/{otherId}")]
        public async Task<ActionResult<ConnectionDto>> GetByUsers(string id, string otherId)
        {
            List<ConnectionDto> allConnections = await _service.GetAllAsync();

            foreach (var connection in allConnections)
            {
                if ((connection.User1Id.Value.Equals(id) && connection.User2Id.Value.Equals(otherId)) ||
                    (connection.User1Id.Value.Equals(otherId) && connection.User2Id.Value.Equals(id)))
                {
                    Console.WriteLine("\n\nValue: " + connection.User1ConnectionStrength.Value());
                    return Ok(connection);
                }
            }

            return null;
        }

        [HttpPut("/api/connection/updateFriendConnection/{id}")]
        public async Task<ActionResult<ConnectionDto>> Update(Guid id, EditingFriendConnectionDto dto)
        {

            var aux = await _service.GetByIdAsync(new ConnectionId(id));
            if (aux == null)
            {
                return BadRequest();
            }

            try
            {
                if (dto.Tag != null)
                {
                    aux.ConnectionTags.Add(new ConnectionTags(dto.Tag));
                }

                var auxStr = dto.User1ConnectionStrength == null
                    ? aux.User1ConnectionStrength
                    : new ConnectionStrength(Convert.ToInt32(dto.User1ConnectionStrength));

                var con = await _service.UpdateAsync(new ConnectionDto(aux.Id, new UserId(dto.User1Id),
                    auxStr,
                    aux.User1RelationStrength,
                    new UserId(dto.User2Id),
                    aux.User2ConnectionStrength,
                    aux.User2RelationStrength, aux.ConnectionTags));

                if (con == null)
                {
                    return NotFound();
                }

                return Ok(con);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/Connection/5
        [HttpPut("/api/connection/update/{id}")]
        public async Task<ActionResult<ConnectionDto>> Update(Guid id, CreatingConnectionDto dto)
        {
            var aux = await _service.GetByIdAsync(new ConnectionId(id));
            if (aux == null)
            {
                return BadRequest();
            }

            Console.WriteLine("\n\nAAA");
            try
            {

                List<string> objects = dto.ConnectionTags;
                var connectionTags = objects.OfType<ConnectionTags>().ToList();
                var cat = await _service.UpdateAsync(new ConnectionDto(aux.Id, new UserId(dto.User1Id),
                    new ConnectionStrength(Convert.ToInt32(dto.User1ConnectionStrength)),
                    new ConnectionRelationStrength(Convert.ToInt32(dto.User1RelationStrength)), new UserId(dto.User2Id),
                    new ConnectionStrength(Convert.ToInt32(dto.User2ConnectionStrength)),
                    new ConnectionRelationStrength(Convert.ToInt32(dto.User2RelationStrength)), connectionTags));
                Console.WriteLine("\n\nOla");
                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/Connection/5
        [HttpPut("/api/connection/updateConnectionRelationStrength/{id}")]
        public async Task<ActionResult<ConnectionDto>> UpdateConnectionRelationStrength(Guid id,
            EditRelationStrengthDto dto)
        {
            var aux = await _service.GetByIdAsync(new ConnectionId(id));
            if (aux == null)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _service.UpdateConnectionRelation(new ConnectionId(id), dto);

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Connection/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ConnectionDto>> SoftDelete(Guid id)
        {
            var cat = await _service.InactivateAsync(new ConnectionId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }

        // DELETE: api/Connection/5
        [HttpDelete("/api/connection/delete/{id}")]
        public async Task<ActionResult<ConnectionDto>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new ConnectionId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // DELETE: api/Connection/5
        [HttpDelete("/api/connection/delete/byUser/{userId}")]
        public async Task<ActionResult<ConnectionDto>> DeleteConnectionByUser(Guid userId)
        {
            try
            {
             
                var cat = await _service.GetAllAsync();
                if (cat.Count <= 0) return Ok(cat);
                foreach (var con in cat.Where(con => con.User1Id.Value.Equals(userId.ToString()) || con.User2Id.Value.Equals(userId.ToString())))
                {
                    await _service.DeleteAsync(new ConnectionId(con.Id));
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

