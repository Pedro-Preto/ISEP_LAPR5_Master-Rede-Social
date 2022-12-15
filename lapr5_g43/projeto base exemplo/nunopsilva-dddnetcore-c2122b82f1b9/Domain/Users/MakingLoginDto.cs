using System;

namespace DDDNetCore.Domain.Users
{
    public class MakingLoginDto
    {

        public string Email;
        public string Pass;

        public MakingLoginDto(string email, string pass)
        {
            Email = email;
            Pass = pass;
        }
    }
}