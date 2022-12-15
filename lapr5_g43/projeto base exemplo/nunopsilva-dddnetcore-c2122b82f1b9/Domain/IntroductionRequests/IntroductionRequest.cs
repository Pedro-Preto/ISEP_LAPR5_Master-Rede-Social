using System;
using System.Collections.Generic;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.IntroductionRequests
{
    public class IntroductionRequest : Entity<IntroductionRequestId>, IAggregateRoot
    {
        public IntroductionRequestDate Date { get; private set; }

        public IntroductionRequestMessage MessageToIntermediary { get; set; }

        public IntroductionRequestMessage MessageToTarget { get; set; }

        public UserId UserRequesterId { get; set; }

        public UserId UserIntermediaryId { get; set; }

        public UserId UserTargetId { get; set; }

        public IntroductionRequestState State { get; set; }

        public List<ConnectionTags> TagList { get; set; }

        public ConnectionStrength ConnectionStrength { get; set; }

        public IntroductionRequest(IntroductionRequestDate date, IntroductionRequestMessage messageToIntermediary,
            IntroductionRequestMessage messageToTarget, UserId userRequesterId, UserId userIntermediaryId,
            UserId userTargetId, IntroductionRequestState state, List<ConnectionTags> tagList,
            ConnectionStrength connectionStrength)
        {
            this.Id = new IntroductionRequestId(Guid.NewGuid());
            this.Date = date;
            this.MessageToIntermediary = messageToIntermediary;
            this.MessageToTarget = messageToTarget;
            this.UserRequesterId = userRequesterId;
            this.UserIntermediaryId = userIntermediaryId;
            this.UserTargetId = userTargetId;
            this.State = state;
            this.TagList = tagList;
            this.ConnectionStrength = connectionStrength;
        }

        public IntroductionRequest()
        {

        }

        public void ChangeDate(IntroductionRequestDate date)
        {
            this.Date = date;
        }

        public void ChangeMessageInter(IntroductionRequestMessage messa)
        {
        
        this.MessageToIntermediary =messa;
         }
        public void ChangeMessageTarg(IntroductionRequestMessage messa)
        {
        
            this.MessageToTarget =messa;
        }
  
         public void ChangeUserReque(UserId userId)
        {
        
            this.UserRequesterId =userId;
        }
         public void ChangeUserInter(UserId userId)
         {
        
             this.UserIntermediaryId =userId;
         }
      
         public void ChangeUserTar(UserId userId)
         {
        
             this.UserTargetId =userId;
         }
       
         public void ChangeState(IntroductionRequestState state)
         {
        
             this.State =state;
         }

         public void ChangeStrength(ConnectionStrength strength)
         {
        
             this.ConnectionStrength =strength;
         }

         public void ChangeTags(List<ConnectionTags> list)
         {
             foreach (var a in list)
             {
                 if (!TagList.Contains(a))
                 {
                     TagList.Add(a);
                 }
             }
         }
         
        
    }
}