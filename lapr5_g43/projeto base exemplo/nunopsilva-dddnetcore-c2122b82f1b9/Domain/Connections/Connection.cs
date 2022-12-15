using System;
using System.Collections.Generic;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.Connections
{
    public class Connection : Entity<ConnectionId>, IAggregateRoot
    {
        public UserId User1Id { get; set; }

        public ConnectionStrength User1ConnectionStrength { get; set; }

        public ConnectionRelationStrength User1RelationStrength { get; set; }

        public UserId User2Id { get; set; }

        public ConnectionStrength User2ConnectionStrength { get; set; }

        public ConnectionRelationStrength User2RelationStrength { get; set; }

        public List<ConnectionTags> ConnectionTags { get; set; }


        public Connection(UserId user1Id, ConnectionStrength user1ConnectionStrength, ConnectionRelationStrength user1RelationStrength, 
            UserId user2Id, ConnectionStrength user2ConnectionStrength, ConnectionRelationStrength user2RelationStrength)
        {
            Id = new ConnectionId(Guid.NewGuid());
            User1Id = user1Id;
            User1ConnectionStrength = user1ConnectionStrength;
            User1RelationStrength = user1RelationStrength;
            User2Id = user2Id;
            User2ConnectionStrength = user2ConnectionStrength;
            User2RelationStrength = user2RelationStrength;
        }

        public Connection(UserId user1Id, ConnectionStrength user1ConnectionStrength, ConnectionRelationStrength user1RelationStrength, 
            UserId user2Id, ConnectionStrength user2ConnectionStrength, ConnectionRelationStrength user2RelationStrength,
            List<ConnectionTags> connectionTags)
        {
            Id = new ConnectionId(Guid.NewGuid());
            User1Id = user1Id;
            User1ConnectionStrength = user1ConnectionStrength;
            User1RelationStrength = user1RelationStrength;
            User2Id = user2Id;
            User2ConnectionStrength = user2ConnectionStrength;
            User2RelationStrength = user2RelationStrength;
            ConnectionTags = connectionTags;
        }
        
        public Connection(ConnectionRequestDto dto)
        {
            Id = new ConnectionId(dto.Id);
            User1Id = dto.UserRequesterId;
            User1ConnectionStrength = dto.ConnectionStrength ;
            User1RelationStrength = new ConnectionRelationStrength(0);
            User2Id = dto.UserTargetId;
            User2ConnectionStrength = null;
            User2RelationStrength = new ConnectionRelationStrength(0);
            ConnectionTags = new List<ConnectionTags>();
        }
        
        public Connection(ConnectionDto dto)
        {
            Id = new ConnectionId(dto.Id);
            User1Id = dto.User1Id;
            User1ConnectionStrength = dto.User1ConnectionStrength ;
            User1RelationStrength = dto.User1RelationStrength;
            User2Id = dto.User2Id;
            User2ConnectionStrength = dto.User2ConnectionStrength;
            User2RelationStrength = dto.User2RelationStrength;
            ConnectionTags = dto.ConnectionTags;
        }
        
        public Connection()
        {

        }

        public void UpdateUser2ConnectionStrength(ConnectionStrength connectionStrength)
        {
            this.User2ConnectionStrength =connectionStrength;
        }
        public void AddTags(ConnectionTags tagId)
        {
            if (!ConnectionTags.Contains(tagId))
            {
                ConnectionTags.Add(tagId);
            }
        }

    }
}