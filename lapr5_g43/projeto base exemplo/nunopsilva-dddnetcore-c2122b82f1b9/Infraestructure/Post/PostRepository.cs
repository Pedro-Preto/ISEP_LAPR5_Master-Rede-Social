using DDDNetCore.Domain.Posts;
using DDDNetCore.Infraestructure.Shared;

namespace DDDNetCore.Infraestructure.Post
{
    public class PostRepository: BaseRepository<Domain.Posts.Post,PostId>,IPostRepository
    {

        public PostRepository(DDDSample1DbContext context) : base(context.Posts)
        {

        }
    }
}