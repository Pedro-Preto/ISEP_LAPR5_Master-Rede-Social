namespace DDDNetCore.Domain.Users
{

    public class UserTags
    {
        public string TagIdValue{ get; private set; }
        
        private UserTags(){}

        public UserTags(string tagIdValue)
        {
            TagIdValue = tagIdValue;

        }
        public override string ToString()
        {
            return this.TagIdValue;
        }
    }
}