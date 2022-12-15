using System.Collections.Generic;
namespace DDDNetCore.Domain.Users
{
    public class UserPrologDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public List<string> Tags { get; set; }

        public UserPrologDto(string id, string userName, List<string>tags)
        {
            Id = id;
            UserName = userName;
            Tags = tags;
        }
    }
}