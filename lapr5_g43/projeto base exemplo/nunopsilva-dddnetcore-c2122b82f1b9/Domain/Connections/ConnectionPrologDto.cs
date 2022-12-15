namespace DDDNetCore.Domain.Connections
{
    public class ConnectionPrologDto
    {
        public string U1 { get; set; }
        
        public string U2 { get; set; }

        public string Cs1 { get; set; }

        public string Rs1 { get; set; }

        public string Cs2 { get; set; }

        public string Rs2 { get; set; }
        

        public ConnectionPrologDto(string user1Id, string user1ConnectionStrength, string user1RelationStrength, 
            string user2Id, string user2ConnectionStrength, string user2RelationStrength)
        {
            U1 = user1Id;
            Cs1 = user1ConnectionStrength;
            Rs1 = user1RelationStrength;
            U2 = user2Id;
            Cs2 = user2ConnectionStrength;
            Rs2 = user2RelationStrength;
        }
    }
}