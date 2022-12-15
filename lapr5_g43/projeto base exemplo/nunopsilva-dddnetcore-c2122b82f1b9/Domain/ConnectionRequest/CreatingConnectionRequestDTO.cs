using System;
using System.Collections.Generic;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class CreatingConnectionRequestDto
    {
        public string User1Id;
        public string User2Id;
        public string Message { get; set; }
        public List<string> TagIdList { get; set; }
        public string ConnectionStrength { get; set; }

        public CreatingConnectionRequestDto(string user1Id, string user2Id, string message, List<string> tagIdList, string connectionStrength)
        {
            this.User1Id = user1Id;
            this.User2Id = user2Id;
            this.Message = message;
            this.TagIdList = tagIdList;
            this.ConnectionStrength = connectionStrength;
        }
    }
}
