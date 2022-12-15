using System.Collections.Generic;

namespace DDDNetCore.Domain.Connections
{
    public class CreatingConnectionFromSuggestedDto
    {
        
        public string User1Id { get; set; }

        public string User1ConnectionStrength { get; set; }

        public string User1RelationStrength { get; set; }

        public string User2Id { get; set; }

        public string User2ConnectionStrength { get; set; }

        public string User2RelationStrength { get; set; }

        public List<string> ConnectionTags{ get; set; }

        public CreatingConnectionFromSuggestedDto(string user1Id, string user2Id)
        {
            User1Id = user1Id;
            User1ConnectionStrength = "0";
            User1RelationStrength = "0";
            User2Id = user2Id;
            User2ConnectionStrength = "0";
            User2RelationStrength = "0";
            List<string> conTags = new List<string>();
            conTags.Add("Suggested User");
            ConnectionTags = conTags;
        }
    }
}