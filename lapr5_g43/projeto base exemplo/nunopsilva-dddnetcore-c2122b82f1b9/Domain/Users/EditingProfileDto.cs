using System.Collections.Generic;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Users
{
    public class EditingProfileDto
    {
        public string UserName { get; set; }
        
        public string PhoneNumber { get;  set; }
        
        public string Description { get; set; }
        
        public string Address { get; set; }
        
        public string Tag { get; set; }
        
        public string RemoveTag { get; set; }
        
        public EditingProfileDto(string userName,string phoneNumber, string description, string address, string tag, string removeTag)
        {
            UserName = userName;
            PhoneNumber = phoneNumber;
            Description = description;
            Address = address;
            Tag = tag;
            RemoveTag = removeTag;
        }
    }
}