using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDNetCore.Domain.ConnectionRequest
{
    [ComplexType]
    public class ConnectionRequestMessage : IValueObject
    {
        public string Message;
               
        private ConnectionRequestMessage()
        {}        
        
        public ConnectionRequestMessage(string message)
        {
            this.Update(message);
        }

        public void Update(string msg)
        {
            this.Message = msg;
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