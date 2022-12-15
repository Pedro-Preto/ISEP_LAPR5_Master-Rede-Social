using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Posts;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _service;
        private readonly ConnectionService _serviceConnection;
        private readonly UserService _serviceUser;
        public PostController(PostService service,ConnectionService service2,UserService serviceUser)
        {
            _service = service;
            _serviceConnection = service2;
            _serviceUser = serviceUser;
        }

        // GET: api/Tag/T1
        [HttpGet("/api/post/getAll")]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
        // GET: api/Tag/T1
        [HttpGet("/api/post/getAllMyFriendsPosts/{myId}")]
        public async Task<ActionResult<List<PostDto>>> GetAllMyFriendsPosts(Guid myId)
        {
            
            var a = await _serviceConnection.GetAllAsync();
            var b =new List<UserName>();
            foreach (var c in a)
            {
                if (c.User1Id.Equals(new UserId(myId)))
                {
                    var c1 = await _serviceUser.GetByIdAsync(c.User2Id);
                    b.Add(c1.UserName);
                }else if (c.User2Id.Equals(new UserId(myId)))
                {
                    var c1 = await _serviceUser.GetByIdAsync(c.User1Id);
                    b.Add(c1.UserName);
                }
            }
            var d =await _service.GetAllAsync();
            return (from t in b from t1 in d where t.Username.Equals(t1.UserPosterName.Username) select t1).ToList();
        }

        // GET: api/Post/U2
        [HttpGet("/api/post/id/{id}")]
        public async Task<ActionResult<PostDto>> GetById(Guid id)
        {
            var user = await _service.GetByIdAsync(new PostId(id));

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        
        // GET: api/Post/U2
        [HttpGet("/api/post/myPosts/{name}")]
        public async Task<ActionResult<List<PostDto>>> GetMyPosts(string name)
        {
            var user = await _service.GetByUserNameAsync(new UserName(name));

            if (user == null)
            {
                return NotFound();
            }
            user.Sort((x,y)=>x.PostDate.Date.CompareTo(y.PostDate.Date));
            user.Reverse();
            return user;
        }

        // POST: api/Tag/T3
        [HttpPost("/api/post/add")]
        public async Task<ActionResult<PostDto>> AddPost(CreatingPostDto dto)
        {
            if (dto == null)
            {
                throw new BusinessRuleValidationException("Dto created wrong");
            }
            var us = await _service.AddAsync(new PostDto(new Guid(),dto.PostContent,dto.UserPosterName,DateTime.Now, dto.PostUsersList));
            if (us == null)
            {
                return NotFound("Error adding the Post");
            }

            return CreatedAtAction(nameof(GetById), new {id = us.Id}, us);
        }

        // DELETE: api/Post/T5
        [HttpDelete("/api/post/delete/{id}")]
        public async Task<ActionResult<PostDto>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new PostId(id));

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
    }
}