using System;

namespace DDDNetCore.Domain.Connections
{
    public class ConnectionTags
    {
        public string TagIdValue{ get; private set; }
        
        private ConnectionTags()
        {
        }

        public ConnectionTags(string tagIdValue)
        {
            TagIdValue = tagIdValue;

        }
        public override string ToString()
        {
            return this.TagIdValue.ToString();
        }
    }
}