using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.SystemUsers
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _repo;

        public SystemUserService(IUnitOfWork unitOfWork, ISystemUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<SystemUserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<SystemUserDto> listDto = list.ConvertAll<SystemUserDto>(sys => new SystemUserDto(sys.Id.AsGuid(), sys.Email,sys.Pass));

            return listDto;
        }

        public async Task<SystemUserDto> GetByIdAsync(SystemUserId id)
        {
            var prod = await this._repo.GetByIdAsync(id);
            
            if(prod == null)
                return null;

            return new SystemUserDto(prod.Id.AsGuid(),prod.Email,prod.Pass);
        }
        public async Task<SystemUserDto> MarkAsLoggedInAsync(SystemUserId id)
        {
            var product = await this._repo.GetByIdAsync(id); 

            if (product == null)
            {
                return null;
            }
            
            product.MarkAsLoggedIn();

            await this._unitOfWork.CommitAsync();
            
            return new SystemUserDto(product.Id.AsGuid(),product.Email,product.Pass);
        }
        
        public async Task<SystemUserDto> MarkAsLoggedOutAsync(SystemUserId id)
        {
            var product = await this._repo.GetByIdAsync(id); 

            if (product == null)
                return null;   

            product.MarkAsLoggedOut();
            
            await this._unitOfWork.CommitAsync();

            return new SystemUserDto(product.Id.AsGuid(),product.Email,product.Pass);
        }
        public async Task<SystemUserDto> GetLoggedUserAsync()
        {
            var listDto =  await this._repo.GetAllAsync();
            foreach (var s in listDto)
            {
                if (s.Logged.LoggedIn.Equals(true))
                {
                    return new SystemUserDto(s.Id.AsGuid(),s.Email,s.Pass);

                }
                    
            }

            return null;
        }
        
        
        public async Task<SystemUserDto> AddAsync(SystemUserDto dto)
        {
            var a = await GetAllAsync();

            foreach (var e in a)
            {
                if (e.Email.EmailAtri.Equals(dto.Email.EmailAtri))
                {
                    return null;
                }
            }
            var systemUser = new SystemUser(dto.Email, dto.Pass);

            await this._repo.AddAsync(systemUser);

            await this._unitOfWork.CommitAsync();

            return new SystemUserDto (systemUser.Id.AsGuid(),systemUser.Email,systemUser.Pass);
        }
        
         public async Task<SystemUserDto> DeleteAsync(SystemUserId id)
        {
            var sysUser = await this._repo.GetByIdAsync(id); 

            if (sysUser == null)
                return null;

            this._repo.Remove(sysUser);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDto( sysUser.Id.AsGuid(),sysUser.Email,sysUser.Pass);
        }
         public async Task<SystemUserDto> GetByEmailAsync(string email)
         {
             var list = await this._repo.GetAllAsync();

             foreach (var user in list)
             {
                 if (user.Email.Value().Equals(email))
                 {
                     return  new SystemUserDto(user.Id.AsGuid(),user.Email,user.Pass);
                 }
             }

             return null;
         }
    }
}