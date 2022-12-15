using System;

namespace DDDNetCore.Domain.SystemUsers
{
    public class SystemUserDto
    {
        public Guid Id { get; set; }

        public UserEmail  Email { get; set; }
        
        public Password Pass{ get; set; }

        public SystemUserDto(Guid id, UserEmail email, Password pass)
        {
            this.Id = id;
            this.Email = email;
            this.Pass = pass;
        }
    }
}