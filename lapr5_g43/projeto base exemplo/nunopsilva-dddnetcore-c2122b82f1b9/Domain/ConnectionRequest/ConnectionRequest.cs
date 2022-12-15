using System;
using System.Collections.Generic;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class ConnectionRequest:Entity<ConnectionRequestId>, IAggregateRoot
    {

        public ConnectionRequestDate Date{ get; set; }
        
        public ConnectionRequestMessage Message { get; set; }

        public  UserId UserRequesterId { get; set; }
        
        public UserId UserTargetId { get; set; }
        
        public List<ConnectionTags> Tags { get; set; }

        public ConnectionStrength ConnectionStrength { get; set; }
        
        public ConnectionRequestState State { get; set; }

        public ConnectionRequest(ConnectionRequestMessage message, UserId userRequesterId, UserId userTargetId, List<ConnectionTags> tagList, ConnectionStrength connectionStrength)
        {
            this.Id = new ConnectionRequestId(Guid.NewGuid());
            this.Date = new ConnectionRequestDate(DateTime.Now);
            this.Message = message;
            this.UserRequesterId = userRequesterId;
            this.UserTargetId = userTargetId;
            this.Tags = tagList;
            this.ConnectionStrength = connectionStrength;
            this.State = new ConnectionRequestState(ConnectionRequestStateEnum.Unanswered);
        }
        
        public ConnectionRequest()
        {

        }

        public void AcceptConnectionRequest()
        {
            State = new ConnectionRequestState(ConnectionRequestStateEnum.Accepted);
        }

        public void DenyConnectionRequest()
        {
            State = new ConnectionRequestState(ConnectionRequestStateEnum.Denied);
        }
    }
}