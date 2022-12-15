using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Connections
{ 
    [ComplexType]
    public class ConnectionRelationStrength : IValueObject
    {
        public int Strength;
               
        private ConnectionRelationStrength()
        {}        
        
        public ConnectionRelationStrength(int strength)
        {
            this.Update(strength);
        }

        public void Update(int strength)
        {
            if (strength >= -10 && strength <= 10)
            {
                this.Strength = strength;    
            }
            else
            {
                throw new BusinessRuleValidationException("The Strength Username is not valid!");

            }
                
        }

        public int Value()
        {
            return this.Strength;
        }

        public override string ToString()
        {
            return this.Strength.ToString();
        }
        
    }
}