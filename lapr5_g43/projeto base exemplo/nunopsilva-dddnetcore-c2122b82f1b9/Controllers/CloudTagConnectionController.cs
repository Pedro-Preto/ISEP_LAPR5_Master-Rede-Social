using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Tag;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CloudTagConnectionController
    {
        private readonly ConnectionService _service;
        private readonly UserService _serviceUser;
        private readonly Random _random;  

        public CloudTagConnectionController(ConnectionService service,UserService serviceUser)
        {
            _service = service;
            _serviceUser = serviceUser;
            _random = new Random();
        }  
      
        // GET: api/Users/U3
        [HttpGet("/api/connection/tagCloud/AllConnections")]
        public async Task<ActionResult<List<TagCloud>>> GetTagCloudAllConnections()
        {
            var allConnections = await _service.GetAllAsync();
            
            if (allConnections.Count == 0)
            {
                return null;
            }

            var dictionary = new Dictionary<string, int>();
            foreach (var tag in from s in allConnections from tag in s.ConnectionTags where tag.TagIdValue!=null select tag)
            {
                if (!dictionary.ContainsKey(tag.TagIdValue))
                {
                    dictionary.Add(tag.TagIdValue, 1);
                }
                else
                {
                    var n = dictionary[tag.TagIdValue] + 1;
                    dictionary[tag.TagIdValue] = n;
                }
            }
            var tagCloud = new List<TagCloud>();

            foreach (KeyValuePair<string, int> value in dictionary)
            {
                tagCloud.Add(new TagCloud(value.Key, value.Value));
            }

            return tagCloud;
        }
        
        // GET: api/Users/U3
        [HttpGet("/api/connection/tagCloud/Me/{id}")]
        public async Task<ActionResult<List<TagCloud>>> GetMyConnectionsTagCloud(Guid id)
        {
            var me = await _serviceUser.GetByIdAsync(new UserId(id));
            if (me==null)
            {
                throw new BusinessRuleValidationException("That User Id doesn't belong to any registered user");
            }
            
            var myConnections = await _service.GetByUserAsync(me);
            if (myConnections.Count == 0)
            {
                throw new BusinessRuleValidationException("The specified user doesn't have any friends ");
            }
            
            var dictionary = new Dictionary<string, int>();
            foreach (var tag in myConnections.SelectMany(s => s.ConnectionTags))
            {
                if (tag.TagIdValue!=null)
                {
                    if (!dictionary.ContainsKey(tag.TagIdValue))
                    {
                        dictionary.Add(tag.TagIdValue, 1);
                    }
                    else
                    {
                        var n = dictionary[tag.TagIdValue] + 1;
                        dictionary[tag.TagIdValue] = n;
                    }
                }
            }
            var tagCloud = new List<TagCloud>();
            foreach (KeyValuePair<string, int> value in dictionary)
            {
                tagCloud.Add(new TagCloud(value.Key,value.Value));
            }

            return tagCloud;
        }
        
        
    }
}

