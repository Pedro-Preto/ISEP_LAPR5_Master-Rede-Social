using System;
using System.Collections.Generic;
using System.Linq;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.IntroductionRequests
{
    public class IntroductionRequestDto
    {
        public Guid Id { get; set; }

        public IntroductionRequestDate Date { get; private set; }
        
        public IntroductionRequestMessage MessageToIntermediary { get;  set; }
        
        public IntroductionRequestMessage MessageToTarget { get;  set; }
        
        public UserId UserRequesterId {get;  set; }
        
        public UserId UserIntermediaryId {get;  set; }
        
        public UserId UserTargetId  {get;  set; }

        public IntroductionRequestState State { get; set; }
        
        public List<ConnectionTags> TagList { get; set; }
        
        public ConnectionStrength ConnectionStrength { get; set; }
        
        public IntroductionRequestDto(Guid id, IntroductionRequestDate date, IntroductionRequestMessage messageToIntermediary, IntroductionRequestMessage messageToTarget, UserId userRequesterId, UserId userIntermediaryId, UserId userTargetId, IntroductionRequestState state, List<ConnectionTags> tagList, ConnectionStrength connectionStrength)
        {
            Id = id;
            Date = date;
            MessageToIntermediary = messageToIntermediary;
            MessageToTarget = messageToTarget;
            UserRequesterId = userRequesterId;
            UserIntermediaryId = userIntermediaryId;
            UserTargetId = userTargetId;
            State = state;
            TagList = tagList;
            ConnectionStrength = connectionStrength;
            
        }
        public IntroductionRequestDto(Guid id, DateTime date, string messageToIntermediary, string messageToTarget, string userRequesterId, string userIntermediaryId, string userTargetId, IntroductionRequestStateEnum state, List<string> tagList, int connectionStrength)
        {
            Id = id;
            Date = new IntroductionRequestDate(date);
            MessageToIntermediary = new IntroductionRequestMessage(messageToIntermediary);
            MessageToTarget =new IntroductionRequestMessage( messageToTarget);
            UserRequesterId =new UserId( userRequesterId);
            UserIntermediaryId = new UserId(userIntermediaryId);
            UserTargetId = new UserId(userTargetId);
            State = new IntroductionRequestState(state);
            TagList = ListConverted(tagList);
            ConnectionStrength = new ConnectionStrength(connectionStrength);
            
        }
        private static List<ConnectionTags> ListConverted(IEnumerable<string> list)
        {
            return list.Select(b => new ConnectionTags(b)).ToList();
        }

    }
}