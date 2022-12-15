using System;
using System.Collections.Generic;
using System.Linq;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.Connections
{
    public class ConnectionDto
    {
        public Guid Id { get; set; }

        public UserId User1Id { get; set; }

        public ConnectionStrength User1ConnectionStrength { get; set; }

        public ConnectionRelationStrength User1RelationStrength { get; set; }

        public UserId User2Id { get; set; }

        public ConnectionStrength User2ConnectionStrength { get; set; }

        public ConnectionRelationStrength User2RelationStrength { get; set; }

        public List<ConnectionTags> ConnectionTags { get; set; }
        
        public ConnectionDto(Guid id, UserId user1Id, ConnectionStrength user1ConnectionStrength, ConnectionRelationStrength user1RelationStrength, 
            UserId user2Id, ConnectionStrength user2ConnectionStrength, ConnectionRelationStrength user2RelationStrength)
        {
            Id = id;
            User1Id = user1Id;
            User1ConnectionStrength = user1ConnectionStrength;
            User1RelationStrength = user1RelationStrength;
            User2Id = user2Id;
            User2ConnectionStrength = user2ConnectionStrength;
            User2RelationStrength = user2RelationStrength;
        }

        public ConnectionDto(Guid id, UserId user1Id, ConnectionStrength user1ConnectionStrength, ConnectionRelationStrength user1RelationStrength, 
            UserId user2Id, ConnectionStrength user2ConnectionStrength, ConnectionRelationStrength user2RelationStrength,
            List<ConnectionTags> tags)
        {
            Id = id;
            User1Id = user1Id;
            User1ConnectionStrength = user1ConnectionStrength;
            User1RelationStrength = user1RelationStrength;
            User2Id = user2Id;
            User2ConnectionStrength = user2ConnectionStrength;
            User2RelationStrength = user2RelationStrength;
            ConnectionTags = tags;

        }
        public ConnectionDto(string user1Id, string user1ConnectionStrength, string user1RelationStrength, 
            string user2Id, string user2ConnectionStrength, string user2RelationStrength,List<string> connectionTags)
        {
            Id = new Guid();
            User1Id = new UserId(user1Id);
            User1ConnectionStrength =new ConnectionStrength(Convert.ToInt32( user1ConnectionStrength));
            User1RelationStrength = new ConnectionRelationStrength(Convert.ToInt32(user1RelationStrength));
            User2Id = new UserId(user2Id);
            User2ConnectionStrength =new ConnectionStrength(Convert.ToInt32(user2ConnectionStrength));
            User2RelationStrength = new ConnectionRelationStrength(Convert.ToInt32(user2RelationStrength));
            ConnectionTags = ListConverted(connectionTags);
        }
        private static List<ConnectionTags> ListConverted(IEnumerable<string> list)
        {
            return list.Select(b => new ConnectionTags(b)).ToList();
        }
       
    }
}