using System;
using System.Collections.Generic;
using System.Security.Principal;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.Posts
{
    public class Post:Entity<PostId>,IAggregateRoot
    {
        public PostContent PostContent{ get; set; }
        
        public PostDate PostDate{ get; set; }

        public UserName UserPosterName{ get; set; }
        public List<PostUsers> PostUsers{ get; set; }

        public Post()
        {
            
        }
        public Post(PostContent postContent,UserName userPosterName,PostDate date, List<PostUsers> postUsers)
        {
            Id = new PostId(Guid.NewGuid());
            UserPosterName = userPosterName;
            PostUsers = postUsers;
            PostContent = postContent;
            PostDate = date;
        }

        public void AddCommentToPost(string name,string comment)
        {
            PostUsers.Add(new PostUsers(name ,comment));
            
        }
        
    }
}