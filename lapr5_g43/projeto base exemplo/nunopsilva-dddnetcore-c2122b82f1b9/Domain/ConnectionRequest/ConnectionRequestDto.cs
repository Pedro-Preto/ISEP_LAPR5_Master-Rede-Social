using System;
using System.Collections.Generic;
using System.Linq;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class ConnectionRequestDto
    {
        public Guid Id { get; set; }

        public ConnectionRequestDate Date { get; set; }

        public ConnectionRequestMessage Message { get; set; }

        public UserId UserRequesterId { get; set; }

        public UserId UserTargetId { get; set; }
        
        public ConnectionStrength ConnectionStrength { get; set; }
        
        public ConnectionRequestState State{ get; set; }
        
        public List<ConnectionTags> Tags { get; set; }

        public ConnectionRequestDto(Guid id, ConnectionRequestDate date, ConnectionRequestMessage message, UserId userRequesterId, UserId userTargetId, List<ConnectionTags> tagList, ConnectionStrength connectionStrength)
        {
            this.Id = id;
            this.Date = date;
            this.Message = message;
            this.UserRequesterId = userRequesterId;
            this.UserTargetId = userTargetId;
            this.Tags = tagList;
            this.ConnectionStrength = connectionStrength;
        }
        
        public ConnectionRequestDto(Guid id, DateTime date, string message, string userRequesterId, string userTargetId, List<string> tagList, int connectionStrength)
        {
            this.Id = id;
            this.Date = new ConnectionRequestDate(date);
            this.Message = new ConnectionRequestMessage(message);
            this.UserRequesterId = new UserId(userRequesterId);
            this.UserTargetId = new UserId(userTargetId);
            this.Tags = ListConverted(tagList);
            this.ConnectionStrength = new ConnectionStrength(connectionStrength);
        }
        
        private static List<ConnectionTags> ListConverted(IEnumerable<string> list)
        {
            return list.Select(b => new ConnectionTags(b)).ToList();
        }
        public void AcceptConnectionRequest()
        {
            State = new ConnectionRequestState(ConnectionRequestStateEnum.Accepted);
        }

        public void DenyConnectionRequest()
        {
            State = new ConnectionRequestState(ConnectionRequestStateEnum.Denied);
        }
        public void SetUnansweredConnectionRequest()
        {
            State = new ConnectionRequestState(ConnectionRequestStateEnum.Unanswered);
        }
    }
    
}