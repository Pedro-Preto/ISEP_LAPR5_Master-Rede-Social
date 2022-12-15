using System;
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.IntroductionRequests;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class IntroductionRequestState:IValueObject
    {
        public IntroductionRequestStateEnum IntroductionRequestStateAttribute;
        private IntroductionRequestState()
        {}        
        
        public IntroductionRequestState(IntroductionRequestStateEnum introductionRequestStateValue)
        {
            this.Update(introductionRequestStateValue);
        }

        public void Update(IntroductionRequestStateEnum introductionRequestStateValue)
        {
            this.IntroductionRequestStateAttribute =introductionRequestStateValue;
        }

        public IntroductionRequestStateEnum Value()
        {
            return this.IntroductionRequestStateAttribute;
        }

        public override string ToString()
        {
            return this.IntroductionRequestStateAttribute.ToString();
        }
    }
}