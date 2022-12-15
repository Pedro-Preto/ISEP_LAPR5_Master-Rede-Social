using System;
using System.Collections.Generic;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;

namespace DDDNetCore.Domain.Users
{
    public class CreatingUserDto
    {
        public string UserName { get; set; }

        public string Birthday { get; set; } //should be optional

        public string EmotionalState { get; set; }
        
        public string Gender { get;  set; } //should be optional
        
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string PhoneNumber { get;  set; }
        
        public string Description { get; set; }
        
        public string Address { get; set; }
        
        public List<string> Tags { get; set; }

        public CreatingUserDto(string userName, string birthday, string emotionalState, string gender,string phoneNumber, string description, string address,List<string>tags, string email, string password)
        {
            if (userName == null || tags.Count == 0 || email == null||password==null) 
            {
                throw new BusinessRuleValidationException("some User attributes arent optional(Ex:UserName,Tags,Email,Password)");
            }
            UserName = userName;
            Birthday = birthday;
            EmotionalState = emotionalState;
            Gender = gender;
            PhoneNumber = phoneNumber;
            Description = description;
            Address = address;
            Tags = tags;
            Email = email;
            Password = password;

        }
    }
}