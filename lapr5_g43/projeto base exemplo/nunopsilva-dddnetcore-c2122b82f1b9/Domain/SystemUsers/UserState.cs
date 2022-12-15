using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.SystemUsers
{
    [ComplexType]
    public class UserState:IValueObject
    {
        public bool LoggedIn;

        private UserState()
        {}        
        
        public UserState(bool loggedIn)
        {
            this.Update(loggedIn);
        }

        public void Update(bool t)
        {
           
            this.LoggedIn = t;
          
        }

        public string Value()
        {
            return this.LoggedIn.ToString();
        }

        public override string ToString()
        {
            return this.LoggedIn.ToString();
        }

    }
}