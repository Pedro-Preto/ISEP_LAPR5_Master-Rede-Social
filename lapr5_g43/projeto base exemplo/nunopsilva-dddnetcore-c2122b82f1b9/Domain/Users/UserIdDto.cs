using System;

namespace DDDNetCore.Domain.Users
{
    public class UserIdDto
    {
        public string UserId { get; set;}
        
        public UserIdDto(string userId)
        {
            UserId = userId;

        }
    }
}