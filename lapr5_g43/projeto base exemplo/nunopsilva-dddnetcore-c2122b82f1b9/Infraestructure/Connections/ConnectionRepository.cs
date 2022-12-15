using DDDNetCore.Domain.Connections;
using DDDNetCore.Infraestructure.Shared;

namespace DDDNetCore.Infraestructure.Connections
{
    public class ConnectionRepository : BaseRepository<Connection, ConnectionId>, IConnectionRepository
    {
    
        public ConnectionRepository(DDDSample1DbContext context):base(context.Connections)
        {
           
        }


    }
}