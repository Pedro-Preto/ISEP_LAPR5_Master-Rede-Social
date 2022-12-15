using System.Collections.Generic;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.Connections
{
    public class CreatingConnectionDto
    {
        public string User1Id { get; set; }

        public string User1ConnectionStrength { get; set; }

        public string User1RelationStrength { get; set; }

        public string User2Id { get; set; }

        public string User2ConnectionStrength { get; set; }

        public string User2RelationStrength { get; set; }

        public List<string> ConnectionTags{ get; set; }

        public CreatingConnectionDto(string user1Id, string user1ConnectionStrength, string user1RelationStrength, 
            string user2Id, string user2ConnectionStrength, string user2RelationStrength,List<string> connectionTags)
        {
           User1Id = user1Id;
           User1ConnectionStrength = user1ConnectionStrength;
           User1RelationStrength = user1RelationStrength;
           User2Id = user2Id;
           User2ConnectionStrength = user2ConnectionStrength;
           User2RelationStrength = user2RelationStrength;
           ConnectionTags = connectionTags;
        }
    }
}