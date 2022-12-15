using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Routing.Matching;

namespace DDDNetCore.Domain.Posts
{
    public class PostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository _repo;

        public PostService(IUnitOfWork unitOfWork, IPostRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<PostDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<PostDto> listDto = list.ConvertAll<PostDto>(cat => new PostDto(cat.Id.AsGuid(),cat.PostContent,cat.UserPosterName,cat.PostDate,cat.PostUsers));

            return listDto;
        }

        public async Task<PostDto> CommentPost(PostDto dto,string username,string comment)
        {
            var post = await this._repo.GetByIdAsync(new PostId(dto.Id));
            
            post.AddCommentToPost(username,comment);
            await this._unitOfWork.CommitAsync();

            return new PostDto(post.Id.AsGuid(), post.PostContent, post.UserPosterName, post.PostDate, post.PostUsers);

        }
        public async Task<PostDto> GetByIdAsync(PostId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;

            return new PostDto(cat.Id.AsGuid(),cat.PostContent,cat.UserPosterName,cat.PostDate,cat.PostUsers);
        }
        
        public async Task<List<PostDto>> GetByUserNameAsync(UserName name)
        {
            var myPosts = new List<PostDto>();
            var cat = await this._repo.GetAllAsync();
            foreach (var po in cat)
            {
                if (po.UserPosterName.Username.Equals(name.Username))
                {
                    myPosts.Add(new PostDto(po.Id.AsGuid(),po.PostContent,po.UserPosterName,po.PostDate,po.PostUsers));
                }
            }

            return myPosts;
        }

        public async Task<PostDto> AddAsync(PostDto dto)
        {
            var tag = new Post(dto.PostContent,dto.UserPosterName,dto.PostDate,dto.PostUsers);
       
            await this._repo.AddAsync(tag);

            await this._unitOfWork.CommitAsync();

            return new PostDto(tag.Id.AsGuid(),tag.PostContent,tag.UserPosterName,tag.PostDate,tag.PostUsers);
        }

        public async Task<PostDto> UpdateAsync(PostDto dto)
        {
            var tag = await this._repo.GetByIdAsync(new PostId(dto.Id));

            if (tag == null)
                return null;

            await this._unitOfWork.CommitAsync();

            return new PostDto(tag.Id.AsGuid(), tag.PostContent, tag.UserPosterName,tag.PostDate, tag.PostUsers);
        }

        public async Task<PostDto> DeleteAsync(PostId id)
        {
            var tag = await this._repo.GetByIdAsync(id); 

            if (tag == null)
                return null;   
            
            this._repo.Remove(tag);
            await this._unitOfWork.CommitAsync();

            return new PostDto(tag.Id.AsGuid(), tag.PostContent,tag.UserPosterName,tag.PostDate,tag.PostUsers);
        }
    }
}