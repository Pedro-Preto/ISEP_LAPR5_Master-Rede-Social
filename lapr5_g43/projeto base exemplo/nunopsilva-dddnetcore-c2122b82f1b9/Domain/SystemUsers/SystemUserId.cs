using System;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.SystemUsers
{
    public class SystemUserId: EntityId 
    {
    
    public SystemUserId(Guid value) : base(value)
    {
    }

    public SystemUserId(string value) : base(value)
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