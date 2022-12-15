using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.SystemUsers
{
    [ComplexType]
    public class UserEmail : IValueObject
    {
        public string EmailAtri;
               
        private UserEmail()
        {}        
        
        public UserEmail(string email)
        {
            this.Update(email);
        }

        public void Update(string email)
        {
            if (email!=null && IsValidEmail(email))
            {
                this.EmailAtri = email;
                
            }else {
                throw new BusinessRuleValidationException("Email not valid");
            }
            
        }

        public string Value()
        {
            return this.EmailAtri;
        }

        public override string ToString()
        {
            return this.EmailAtri;
        }
        static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
