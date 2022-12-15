namespace DDDNetCore.Domain.Posts
{
    public class PostUsers
    {
        public string UserName{ get; set; }
        public string Comment{ get; set; }
        private PostUsers(){}

        public PostUsers(string user,string comment)
        {
            UserName = user;
            Comment = comment;

        }
        public override string ToString()
        {
            return this.UserName+" has commented: "+Comment;
        }
    }
}