using System;
using System.Collections.Generic;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;

namespace DDDNetCore.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
      
        public UserName UserName { get; set; }
        public BirthDate Birthday { get; set; } //should be optional
        public EmotionalState EmotionalState { get; set; }
        public Gender Gender { get; set; } //should be optional
        public Description Description { get; set; } //should be optional
        public PhoneNumber PhoneNumber { get; set; }
        public Address Address { get; set; }
        public List<UserTags> UserTags { get; set; }
        public SystemUserId SystemUserId { get; set; }
        
        public User(UserName userName, BirthDate birthday, EmotionalState emotionalState, Gender gender, Description description, PhoneNumber phoneNumber,Address address,List<UserTags> tags,SystemUserId systemUserId)
        {
            if (userName == null || emotionalState == null )
            {
                throw new BusinessRuleValidationException("Some attributes are not optional");
            }
            Id = new UserId(Guid.NewGuid());
            UserName = userName;
            Birthday = birthday;
            EmotionalState = emotionalState;
            Gender = gender;
            Description = description;
            PhoneNumber = phoneNumber;
            Address = address;
            UserTags = tags;
            SystemUserId = systemUserId;
        }

        public User(UserDto userDto)
        {
            if (userDto.UserName == null || userDto.EmotionalState == null)
            {
                throw new BusinessRuleValidationException("Some attributes are not optional");
            }
            Id = new UserId(userDto.Id);
            UserName = userDto.UserName;
            Birthday = userDto.Birthday;
            EmotionalState = userDto.EmotionalState;
            Gender = userDto.Gender;
            Description = userDto.Description;
            PhoneNumber = userDto.PhoneNumber;
            UserTags = userDto.Tags;
            SystemUserId = userDto.SystemUserId;
        }
        
        public void ChangeAddress(Address address)
        {
            this.Address = address;
        }
        
        public User()
        {

        }
        
        public void ChangePhoneNumber(PhoneNumber  number)
        {
            this.PhoneNumber = number;
        }
      
        public void ChangeUserName(UserName userName)
        {
            this.UserName = userName;
        }
        
        public void ChangeBirthday(BirthDate birthday)
        {
            this.Birthday = birthday;
        }

        public void ChangeGender(Gender gender)
        {
            this.Gender = gender;
        }
        public void ChangeDescription(Description description)
        {
            this.Description = description;
        }

        public void ChangeEmotionalState(EmotionalState emotionalState)
        {           
            this.EmotionalState = emotionalState;
        }
    }
}