namespace DDDNetCore.Domain.Posts
{
    public class CommentPostDto
    {
        public string PostId;

        public string Username;

        public string Comment;

        public CommentPostDto(string postId, string username, string comment)
        {
            PostId = postId;
            Username = username;
            Comment = comment;
        }
    }
}