using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.SystemUsers
{
    public interface ISystemUserRepository: IRepository<SystemUser,SystemUserId>
    {
    }
}