using System;
using DDDNetCore.Domain.Shared;
using Newtonsoft.Json;

namespace DDDNetCore.Domain.IntroductionRequests
{
    public class IntroductionRequestId : EntityId
    {
        [JsonConstructor]
        public IntroductionRequestId(Guid value) : base(value)
        {
        }

        public IntroductionRequestId(string value) : base(value)
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