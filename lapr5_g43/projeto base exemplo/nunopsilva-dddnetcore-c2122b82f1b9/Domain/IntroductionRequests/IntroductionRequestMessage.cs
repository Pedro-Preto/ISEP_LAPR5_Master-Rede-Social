using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDNetCore.Domain.IntroductionRequests
{
    [ComplexType]
    public class IntroductionRequestMessage : IValueObject
    {
        public string Message;
               
        private IntroductionRequestMessage()
        {}        
        
        public IntroductionRequestMessage(string message)
        {
            this.Update(message);
        }

        public void Update(string message)
        {
            this.Message = message;
        }

        public string Value()
        {
            return this.Message;
        }

        public override string ToString()
        {
            return this.Message;
        }
        
    }
}