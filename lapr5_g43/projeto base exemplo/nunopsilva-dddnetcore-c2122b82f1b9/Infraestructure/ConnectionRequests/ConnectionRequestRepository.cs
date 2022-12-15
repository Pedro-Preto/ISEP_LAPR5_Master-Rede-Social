using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Infraestructure.Shared;

namespace DDDNetCore.Infraestructure.ConnectionRequests
{
    public class ConnectionRequestRepository : BaseRepository<ConnectionRequest, ConnectionRequestId>,
        IConnectionRequestRepository
    {

        public ConnectionRequestRepository(DDDSample1DbContext context) : base(context.ConnectionRequests)
        {

        }
    }
}