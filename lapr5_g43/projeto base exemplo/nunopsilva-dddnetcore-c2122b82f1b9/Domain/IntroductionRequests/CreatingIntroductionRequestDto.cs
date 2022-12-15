using System;
using System.Collections.Generic;

namespace DDDNetCore.Domain.IntroductionRequests
{
    public class CreatingIntroductionRequestDto
    {
        public string Date { get; private set; }
        
        public string MessageToIntermediary { get;  set; }
        
        public string MessageToTarget { get;  set; }
        
        public string UserRequesterId {get;  set; }
        
        public string UserIntermediaryId {get;  set; }
        
        public string UserTargetId  {get;  set; }

        public string State { get; set; }
        
        public string ConnectionStrength { get; set; }

        public List<String> TagList{ get; set; }

        public CreatingIntroductionRequestDto(string date, string messageToIntermediary, string messageToTarget, string userRequesterId, string userIntermediaryId, string userTargetId, string state, string connectionStrength,List<String> tagList)
        {
            Date = date;
            MessageToIntermediary = messageToIntermediary;
            MessageToTarget = messageToTarget;
            UserRequesterId = userRequesterId;
            UserIntermediaryId = userIntermediaryId;
            UserTargetId = userTargetId;
            State = state;
            ConnectionStrength = connectionStrength;
            TagList = tagList;
        }
    }
}