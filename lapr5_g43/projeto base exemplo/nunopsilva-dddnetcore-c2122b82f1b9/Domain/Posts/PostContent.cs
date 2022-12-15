using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Posts
{
    [ComplexType]
    public class PostContent : IValueObject
    {
        public string Content;
               
        private PostContent()
        {}        
        
        public PostContent(string content)
        {
            this.Update(content);
        }

        public void Update(string content)
        {
            this.Content = content;
        }

        public string Value()
        {
            return this.Content;
        }

        public override string ToString()
        {
            return this.Content;
        }
        
    }
}