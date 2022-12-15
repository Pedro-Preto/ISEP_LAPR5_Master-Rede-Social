using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Tag;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]
    public class CloudTagUserController:ControllerBase
    {
        private readonly UserService _service;
        private readonly Random _random;  

            public CloudTagUserController(UserService service)
            {
                _service = service;
                _random=new Random();
            }  
            
            // GET: api/Users/U3
            [HttpGet("/api/user/tagCloud/AllUsers/{tagString}")]
            public async Task<ActionResult<List<TagCloud>>> GetTagCloudAllUsers(string tagString)
            {

                if (tagString == null)
                {
                    return new List<TagCloud>();
                }

                string[] tagSplit = tagString.Split(',');
                
                var userTags = new List<string>();
                foreach (var s in tagSplit)
                {
                    if (!s.Equals("''"))
                    {
                        userTags.Add(s);
                    }
                }
                
                var dictionary = new Dictionary<string, int>();
                foreach (var tag in userTags)
                {
                    if (tag!=null)
                    {
                        if (!dictionary.ContainsKey(tag))
                        {
                            dictionary.Add(tag, 1);
                        }
                        else
                        {
                            var n = dictionary[tag] + 1;
                            dictionary[tag] = n;
                        }
                    }
                }
                
                var usersTags = new List<TagCloud>();

                foreach (KeyValuePair<string, int> value in dictionary)
                {
                    usersTags.Add(new TagCloud(value.Key,value.Value));
                }

                return usersTags;
            }
            // GET: api/Users/U3
            [HttpGet("/api/user/tagCloud/Me/{tags}")]
            public async Task<ActionResult<List<TagCloud>>> GetMyTagCloud(string tags)
            {
                if (tags == null)
                {
                    return new List<TagCloud>();
                }

                string[] tag = tags.Split(',');
                
                var userTags = new List<string>();
                foreach (var s in tag)
                {
                    if (!s.Equals("''"))
                    {
                        userTags.Add(s);
                    }
                }

                var dictionary = new Dictionary<string, int>();
                foreach (var t in userTags)
                {
                    if (t != null)
                    {
                        if (!dictionary.ContainsKey(t))
                        {
                            dictionary.Add(t, 1);
                        }
                        else
                        {
                            var n = dictionary[t] + 1;
                            dictionary[t] = n;
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