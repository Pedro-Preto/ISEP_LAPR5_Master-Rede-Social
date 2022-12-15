using System.Collections.Generic;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class CreatingConnectionRequestFromSuggestedDto
    {
        public string User1Id;
        public string User2Id;
        public string Message { get; set; }
        public List<string> TagIdList { get; set; }
        public string ConnectionStrength { get; set; }

        public CreatingConnectionRequestFromSuggestedDto(string user1Id, string user2Id)
        {
            this.User1Id = user1Id;
            this.User2Id = user2Id;
            this.Message = "This Request is coming from a newly created User";
            this.TagIdList = new List<string> {"Recommended User Connection"};
            this.ConnectionStrength = "0";
        }
    }
}