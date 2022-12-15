using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class PhoneNumber:IValueObject
    {
        public string Number;
               
        private PhoneNumber()
        {}        
        
        public PhoneNumber(string tlf)
        {
            this.Update(tlf);
        }

        public void Update(string t)
        {
            if (Regex.Match(t,@"(2[0-9]{8})|9[1236][0-9]{7}").Success)
            {
                this.Number = t;
            }
            else
            {                
                throw new BusinessRuleValidationException("Not a valid phone number!");
            }
        }

        public string Value()
        {
            return this.Number;
        }

        public override string ToString()
        {
            return this.Number;
        }
    }
}