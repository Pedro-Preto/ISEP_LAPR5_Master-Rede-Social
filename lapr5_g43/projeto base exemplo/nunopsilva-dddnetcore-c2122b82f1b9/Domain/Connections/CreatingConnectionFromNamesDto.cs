namespace DDDNetCore.Domain.Connections
{
    public class CreatingConnectionFromNamesDto
    {
        
        public string User1Name { get; set; }

        public string User2Name { get; set; }


        public CreatingConnectionFromNamesDto(string user1Name, string user2Name)
        {
            User1Name = user1Name;
            User2Name = user2Name;
        }
    }
    
}