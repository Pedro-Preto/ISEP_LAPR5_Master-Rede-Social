using System;
using DDDNetCore.Domain.Shared;
using Newtonsoft.Json;

namespace DDDNetCore.Domain.Posts
{
    public class PostId : EntityId
    {
        [JsonConstructor]
        public PostId(Guid value) : base(value)
        {
        }

        public PostId(string value) : base(value)
        {
        }

        override
            protected Object createFromString(string text){
            return new Guid(text);
        }

        override
            public string AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}