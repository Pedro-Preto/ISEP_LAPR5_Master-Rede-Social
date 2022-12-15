using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Posts
{
    public interface IPostRepository:IRepository<Post,PostId>
    {
        
    }
}