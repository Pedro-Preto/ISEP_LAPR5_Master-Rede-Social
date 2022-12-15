using System;
using DDDNetCore.Domain.Shared;
using Newtonsoft.Json;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class ConnectionRequestId:EntityId
    {
        [JsonConstructor]
        public ConnectionRequestId(Guid value) : base(value)
        {
        }
        [JsonConstructor]
        public ConnectionRequestId(string value) : base(value)
        {
        }

        override
            protected  Object createFromString(string text){
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
    