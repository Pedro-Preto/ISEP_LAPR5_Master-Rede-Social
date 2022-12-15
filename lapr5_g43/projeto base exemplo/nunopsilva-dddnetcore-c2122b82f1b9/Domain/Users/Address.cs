using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class Address:IValueObject
    {
        public string Addr;

        private Address()
        {}        
        
        public Address(string add)
        {
            this.Update(add);
        }

        public void Update(string t)
        {
          
            this.Addr = t;
           
        }

        public string Value()
        {
            return this.Addr;
        }

        public override string ToString()
        {
            return this.Addr;
        }
        
    }
}