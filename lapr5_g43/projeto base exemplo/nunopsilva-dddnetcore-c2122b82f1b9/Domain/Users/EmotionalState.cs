using System;
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class EmotionalState:IValueObject
    {
        public EmotionalStateEnum EmotionalStateAtri;
        public DateTime Date;
        private EmotionalState()
        {}        
        
        public EmotionalState(EmotionalStateEnum emotionalStateValue)
        {
            this.Update(emotionalStateValue);
        }

        public void Update(EmotionalStateEnum emotionalStateValue)
        {
            this.EmotionalStateAtri =emotionalStateValue;
            this.Date=DateTime.Now;
        }

        public EmotionalStateEnum Value()
        {
            return this.EmotionalStateAtri;
        }

        public override string ToString()
        {
            return this.EmotionalStateAtri+" "+this.Date;
        }
    }
}