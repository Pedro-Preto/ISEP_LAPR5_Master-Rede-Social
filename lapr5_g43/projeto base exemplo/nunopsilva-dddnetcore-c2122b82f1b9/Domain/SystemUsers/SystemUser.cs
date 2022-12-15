using System;
using DDDNetCore.Domain.Shared;
using Newtonsoft.Json;

namespace DDDNetCore.Domain.SystemUsers
{
    public class SystemUser: Entity<SystemUserId>, IAggregateRoot
    {
        public UserEmail Email { get;  private set; }

        public Password Pass { get;  private set; } 

        public UserState Logged { get; private set; }  
        
        private SystemUser()
        {
            this.Logged = new UserState(false);
        }
        
        public SystemUser(string email, string pass)
        {

            this.Id = new SystemUserId(Guid.NewGuid());
            this.Email = new UserEmail(email);
            this.Pass = new Password(pass);
        }
        public SystemUser(SystemUserDto dto)
        {

            this.Id = new SystemUserId(dto.Id);
            this.Email = new UserEmail(dto.Email.EmailAtri);
            this.Pass = new Password(dto.Pass.Psw);
        }
        
        [JsonConstructor]
       public SystemUser(UserEmail email, Password pass)
        {

            if(email==null && pass == null)
            {
                throw new BusinessRuleValidationException("Email and Password should not be null");
            }
            this.Id = new SystemUserId(Guid.NewGuid());
            this.Email = email;
            this.Pass = pass;
        }
       
       
       public void MarkAsLoggedIn()
       {
           this.Logged = new UserState(true);
       }
       public void MarkAsLoggedOut()
       {
           this.Logged = new UserState(false);
       }
    }
    
}