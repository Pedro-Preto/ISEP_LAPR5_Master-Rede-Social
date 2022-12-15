using System.Threading.Tasks;
using DDDNetCore.Domain.Posts;
using DDDNetCore.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
        [ApiController]
        public class CommentPostController : ControllerBase
        {
            private readonly PostService _service;

            public CommentPostController(PostService service)
            {
                _service = service;
            }
            
            // PUT: api/Post/ES1
            [HttpPut("/api/post/commentPost")]
            public async Task<ActionResult<PostDto>> UpdateEmotionalState(CommentPostDto dto1)
            {
                var dto = await _service.GetByIdAsync(new PostId(dto1.PostId));
           
                if (dto==null)
                {
                    return BadRequest();
                }
                try
                {
                    var us = await _service.CommentPost(dto,dto1.Username,dto1.Comment);
                
                    if (us == null)
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
            
        }
        
    
}