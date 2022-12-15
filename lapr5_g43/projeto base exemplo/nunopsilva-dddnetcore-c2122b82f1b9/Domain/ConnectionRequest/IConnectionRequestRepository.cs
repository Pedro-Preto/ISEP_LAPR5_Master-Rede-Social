using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public interface IConnectionRequestRepository:IRepository<ConnectionRequest,ConnectionRequestId>
    {
        
    }
}