using System.Collections.Generic;

namespace DDDNetCore.Domain.Posts
{
    public class CreatingPostDto
    {
        public string PostContent{ get; set; }
        
        public string UserPosterName{ get; set; }
        public List<PostUsers> PostUsersList{ get; set; }

        public CreatingPostDto(string postContent,  string userPosterName, List<PostUsers> postUsersList)
        {
            PostContent = postContent;
            UserPosterName = userPosterName;
            PostUsersList = postUsersList;
        }
    }
}