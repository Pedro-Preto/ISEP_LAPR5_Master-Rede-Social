using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    [ComplexType]
    public class UserName : IValueObject
    {

        public string Username;
        
        private UserName()
        {
        }

        public UserName(string userName)
        {
            this.Update(userName);
        }

        public void Update(string userName)
        {
            if (userName !=null&& Regex.Match(userName,"[a-zA-Z][a-zA-Z0-9]*|' '*$").Success && userName.Length <= 100) 
            {
                this.Username = userName;
            }
            else
            {
                throw new BusinessRuleValidationException("The given Username is not valid!");
            }
        }

        public string Value()
        {
            return this.Username;
        }

        public override string ToString()
        {
            return this.Username;
        }
    }
}