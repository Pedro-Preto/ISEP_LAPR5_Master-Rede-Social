
using System.ComponentModel.DataAnnotations.Schema;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.ConnectionRequest
{
    [ComplexType]
    public class ConnectionRequestState:IValueObject
    {
        public ConnectionRequestStateEnum ConnectionRequestStateAttribute;
        private ConnectionRequestState()
        {}        
        
        public ConnectionRequestState(ConnectionRequestStateEnum connectionRequestStateValue)
        {
            this.Update(connectionRequestStateValue);
        }

        public void Update(ConnectionRequestStateEnum connectionRequestStateValue)
        {
            this.ConnectionRequestStateAttribute =connectionRequestStateValue;
        }

        public ConnectionRequestStateEnum Value()
        {
            return this.ConnectionRequestStateAttribute;
        }

        public override string ToString()
        {
            return this.ConnectionRequestStateAttribute.ToString();
        }
    }
}