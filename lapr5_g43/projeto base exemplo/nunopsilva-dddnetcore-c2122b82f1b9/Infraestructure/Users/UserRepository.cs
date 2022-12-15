using DDDNetCore.Domain.Users;
using DDDNetCore.Infraestructure.Shared;

namespace DDDNetCore.Infraestructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>,IUserRepository
    {
       public UserRepository(DDDSample1DbContext context) : base(context.Users)
        {
    }
}
}