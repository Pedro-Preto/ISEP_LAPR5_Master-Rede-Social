namespace DDDNetCore.Domain.Connections
{
    public class EditRelationStrengthDto
    {
        public string UserId{ get; set; }

        public int LikeOrDislike{ get; set; }
        
        public EditRelationStrengthDto(string userId, int likeOrDislike)
        {
            UserId = userId;
            LikeOrDislike = likeOrDislike;
        }
    }
}