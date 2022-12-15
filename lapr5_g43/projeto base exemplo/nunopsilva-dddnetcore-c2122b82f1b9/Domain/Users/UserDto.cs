using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;

namespace DDDNetCore.Domain.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public UserName UserName { get; set; }

        public BirthDate Birthday { get; set; } //should be optional

        public EmotionalState EmotionalState { get; set; }
        
        public Gender Gender { get;  set; } //should be optional

        public Description Description { get; set; } //should be optional
        
        public SystemUserId SystemUserId { get; set; }
        
        public PhoneNumber PhoneNumber { get;  set; }
        public Address Address { get; set; }
        public List<UserTags> Tags { get; set; }


        public UserDto(Guid id, UserName userName, BirthDate birthday, EmotionalState emotionalState, Gender gender, Description description,PhoneNumber phoneNumber, Address address,List<UserTags> tags, SystemUserId systemUserId)
        {

            Id = id;
            UserName = userName;
            Birthday = birthday;
            EmotionalState = emotionalState;
            Gender = gender;
            Description = description;
            PhoneNumber = phoneNumber;
            Address = address;
            Tags = tags;
            SystemUserId = systemUserId;
            
        }
        
        public UserDto(Guid id, string userName, BirthDate birthday, EmotionalState emotionalState, Gender gender, string description, string phoneNumber, string address, List<UserTags> tags, SystemUserId systemUserId)
        {

            Id = id;
            UserName = new UserName(userName);
            Birthday = birthday;
            EmotionalState = emotionalState;
            Gender = gender;
            Description = new Description(description);
            PhoneNumber = new PhoneNumber(phoneNumber);
            Address = new Address(address);
            Tags = tags;
            SystemUserId = systemUserId;
            
        }
        
        public UserDto(Guid id, string userName, string birthday, string emotionalState, string gender, string description, string phoneNumber,string address,List<string>tags, Guid systemUserId)
        {
            if (userName == null || emotionalState == null || tags.Count == 0)
            {
                throw new BusinessRuleValidationException("Some attributes are not optional");
            }
            
            Id = id;
            UserName = new UserName(userName);
            Birthday = new BirthDate(birthday);
            EmotionalState = new EmotionalState((EmotionalStateEnum)Enum.Parse(typeof(EmotionalStateEnum), emotionalState));
            Gender = new Gender((GenderEnum)Enum.Parse(typeof(GenderEnum), gender));
            Description = new Description(description);
            PhoneNumber = new PhoneNumber(phoneNumber);
            Address = new Address(address);
            Tags = ListConverted(tags);
            SystemUserId = new SystemUserId(systemUserId);
        }

        private static List<UserTags> ListConverted(IEnumerable<string> list)
        {
            return list.Select(b => new UserTags(b)).ToList();
        }
    }
}