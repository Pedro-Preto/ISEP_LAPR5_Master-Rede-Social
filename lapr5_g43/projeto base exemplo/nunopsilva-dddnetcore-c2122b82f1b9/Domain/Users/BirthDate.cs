using System;
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class BirthDate:IValueObject
    {
      
        public DateTime Birthday;
        
        private BirthDate()
        {
        }

        public BirthDate(string birthday)
        {
            this.Update(Convert.ToDateTime(birthday));
        }

        public void Update(DateTime birthday)
        {
            if (GetAge(birthday)>16) 
            {
                this.Birthday=birthday;
            }
            else
            {
                throw new BusinessRuleValidationException("The given date is not valid");
            }
        }

        public DateTime Value()
        {
            return this.Birthday;
        }

        public override string ToString()
        {
            return this.Birthday.ToString();
        }
        public int GetAge(DateTime bornDate)
        {
            DateTime today = DateTime.Today;
            int age = today.Year - bornDate.Year;
            if (bornDate > today.AddYears(-age)) 
                age--;

            return age;
        }
    }
}