using System;
using System.Collections.Generic;
using System.Linq;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.Posts
{
    public class PostDto
    {
        public Guid Id{ get; set; }
        public PostContent PostContent{ get; set; }
        
        public PostDate PostDate{ get; set; }

        public UserName UserPosterName{ get; set; }
        public List<PostUsers> PostUsers{ get; set; }


        public PostDto(Guid id, PostContent postContent,  UserName userPosterName,PostDate date, List<PostUsers> postUsers)
        {
            Id = id;
            PostContent = postContent;
            PostDate =date;
            UserPosterName = userPosterName;
            PostUsers = postUsers;
        }

        public PostDto(Guid id, string postContent, string userPosterName,DateTime date, List<PostUsers> postUsers)
        {
            Id = id;
            PostContent = new PostContent(postContent);
            PostDate = new PostDate(date);
            UserPosterName = new UserName(userPosterName);
            PostUsers = postUsers;
        }
   
    }
}