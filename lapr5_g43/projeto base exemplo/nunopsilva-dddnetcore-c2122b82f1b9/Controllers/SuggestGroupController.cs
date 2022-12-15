using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestGroupController : ControllerBase
    {

        private readonly UserService _serviceUser;

        public SuggestGroupController(UserService serviceUser)
        {
            _serviceUser = serviceUser;

        }
        [HttpGet("/api/user/group/{userId}/{numCommonTags}")]
        public async Task<ActionResult<List<UserName>>> GetSuggestedGroupsByUser(Guid userId,int numCommonTags)
        {
            var user =await _serviceUser.GetByIdAsync(new UserId(userId));
            if (user==null)
            {
                throw new BusinessRuleValidationException("User with this id is null");
            }

            //passar as tags do current user para string
            var currentUserTags = user.Tags.Select(u => u.TagIdValue).ToList();

            
            var users =await _serviceUser.GetAllAsync();
            if (users.Count==0)
            {
                throw new BusinessRuleValidationException("Users list is empty");
            }
            
            var dictionary = new Dictionary<int, List<UserName>>();
            foreach (var u in users)
            {
                if (!u.UserName.Username.Equals(user.UserName.Username))
                {
                    var commonTags = 0;

                    var otherUsersTags = u.Tags.Select(t => t.TagIdValue).ToList();

                    foreach (var tag in otherUsersTags)
                    {
                        if (currentUserTags.Contains(tag))
                        {
                            commonTags++;
                        }
                    }

                    if (!dictionary.ContainsKey(commonTags))
                    {
                        var userNameList = new List<UserName> {u.UserName};
                        dictionary.Add(commonTags, userNameList);
                    }
                    else
                    {
                        dictionary[commonTags].Add(u.UserName);
                    }
                }
            }

            var group=new List<UserName>();
            if (dictionary.ContainsKey(numCommonTags))
            {
                group = dictionary[numCommonTags];
            }
            else
            {
                group.Add(new UserName("There is no group with the chosen number of common tags "));

            }
            
          //  group.Remove(user.UserName);

            return group;
        }
        
     /* public async Task<ActionResult<int>> GetNumberOfCommonTags(List<String> list,UserDto user)
        {
            int commonTags = 0;
            var otherUsersTags = new List<string>();
            foreach (var u in user.Tags)
            {
                otherUsersTags.Add(u.TagIdValue);
            }
            foreach (var tag in otherUsersTags)
            {
                if (list.Contains(tag))
                {
                    commonTags++;
                }
            }
            return commonTags;
        }*/
    }


}