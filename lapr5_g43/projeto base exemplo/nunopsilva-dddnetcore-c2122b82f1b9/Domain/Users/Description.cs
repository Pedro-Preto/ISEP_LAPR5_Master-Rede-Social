using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class Description:IValueObject
    {
        public string Desc;
        
        private Description()
        {}        
        
        public Description(string add)
        {
            this.Update(add);
        }

        public void Update(string t)
        {
            if (t.Length<=4000)
            {
                this.Desc = t;
            }
            else
            {                
                throw new BusinessRuleValidationException("Not a valid Description!");
            }
        }

        public string Value()
        {
            return this.Desc;
        }

        public override string ToString()
        {
            return this.Desc;
        }

    }
}