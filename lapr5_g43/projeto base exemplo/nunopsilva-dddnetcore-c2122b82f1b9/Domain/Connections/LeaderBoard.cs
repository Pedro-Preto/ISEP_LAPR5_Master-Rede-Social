using System;

namespace DDDNetCore.Domain.Connections
{
    public class LeaderBoard
    {
        public string Username { get; set; }

        public int Position{ get; set; }

        public int Points{ get; set; }//Number od friends


        public LeaderBoard(string username,int position, int points)
        {
            Username = username;
            Position = position;
            Points = points;
        }
    }
}