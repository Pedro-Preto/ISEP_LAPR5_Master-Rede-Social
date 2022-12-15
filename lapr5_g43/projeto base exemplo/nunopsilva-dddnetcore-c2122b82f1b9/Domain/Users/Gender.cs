using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class Gender:IValueObject
    {
        public GenderEnum GenderAtri;
        private Gender()
        {}        
        
        public Gender(GenderEnum gender)
        {
            this.Update(gender);
        }

        public void Update(GenderEnum emotionalStateValue)
        {
            this.GenderAtri =emotionalStateValue;
        }

        public GenderEnum Value()
        {
            return this.GenderAtri;
        }

        public override string ToString()
        {
            return GenderAtri.ToString();
        }
    }
}