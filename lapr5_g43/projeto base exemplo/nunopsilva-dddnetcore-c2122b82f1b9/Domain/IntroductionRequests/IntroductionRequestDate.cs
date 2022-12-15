using System;
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDNetCore.Domain.IntroductionRequests
{ 
    [ComplexType]
    public class IntroductionRequestDate:IValueObject
    {
      
        public DateTime Date;
        
        private IntroductionRequestDate()
        {}

        public IntroductionRequestDate(DateTime date)
        {
            this.Update(Convert.ToDateTime(date));
        }

        public void Update(DateTime date)
        {
            Date = date;
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