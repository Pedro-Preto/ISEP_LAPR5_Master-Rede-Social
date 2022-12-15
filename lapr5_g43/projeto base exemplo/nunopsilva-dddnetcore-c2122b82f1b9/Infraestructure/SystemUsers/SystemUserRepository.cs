using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Infraestructure.Shared;

namespace DDDNetCore.Infraestructure.SystemUsers
{

    public class SystemUserRepository : BaseRepository<SystemUser, SystemUserId>,ISystemUserRepository
    {

        public SystemUserRepository(DDDSample1DbContext context) : base(context.SystemUsers)
        {

        }
    }
}