

using System.Collections.Generic;

namespace DDDNetCore.Domain.Users
{
    public class CreatingSelectedUsersDto
    {
        public List<string> SelectedUsers { get; set; }

        public CreatingSelectedUsersDto(List<string> selectedUsers)
        {
            SelectedUsers = selectedUsers;
        }
    }
}