using System;
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Posts
{
    [ComplexType]
    public class PostDate:IValueObject
    {
      
        public DateTime Date;
        
        private PostDate()
        {
        }

        public PostDate(DateTime date)
        {
            this.Update(date);
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