using System;
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.ConnectionRequest
{
    [ComplexType]
    public class ConnectionRequestDate:IValueObject
    {
      
        public DateTime Date;
        
        private ConnectionRequestDate()
        {
        }

        public ConnectionRequestDate(DateTime date)
        {
            this.Update(Convert.ToDateTime(date));
        }

        public void Update(DateTime date)
        {
            this.Date=date;
        }

        public DateTime Value()
        {
            return this.Date;
        }

        public override string ToString()
        {
            return this.Date.ToString();
        }
    
    }
}