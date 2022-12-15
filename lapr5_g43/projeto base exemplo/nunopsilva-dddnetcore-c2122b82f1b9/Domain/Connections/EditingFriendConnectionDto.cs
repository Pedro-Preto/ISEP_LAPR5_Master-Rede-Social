namespace DDDNetCore.Domain.Connections
{
    public class EditingFriendConnectionDto
    {
        public string User1Id { get; set; }

        public string User1ConnectionStrength { get; set; }

        public string User2Id { get; set; }

        public string Tag { get; set; }

        public EditingFriendConnectionDto(string user1Id, string user1ConnectionStrength,
            string user2Id, string tag)
        {
            User1Id = user1Id;
            User1ConnectionStrength = user1ConnectionStrength;
            User2Id = user2Id;
            Tag = tag;
        }
    }
}