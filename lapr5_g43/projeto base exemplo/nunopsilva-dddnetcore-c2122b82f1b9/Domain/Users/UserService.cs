using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;

namespace DDDNetCore.Domain.Users
{
    public class UserService{
     private readonly IUnitOfWork _unitOfWork;
     private readonly IUserRepository _repo;
     private readonly ISystemUserRepository _repoSysUser;
        
        public UserService(IUnitOfWork unitOfWork, IUserRepository repo, ISystemUserRepository repoSysUser)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoSysUser = repoSysUser;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<UserDto> listDto = list.ConvertAll<UserDto>(us => new UserDto(us.Id.AsGuid(),us.UserName,us.Birthday,us.EmotionalState,us.Gender,us.Description,us.PhoneNumber,us.Address,us.UserTags,us.SystemUserId));

            return listDto;
        }
        
        public async Task<List<UserPrologDto>> GetAllPrologAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UserPrologDto> listDto = list.ConvertAll<UserPrologDto>(us => new UserPrologDto(us.Id.Value, us.UserName.Username, us.UserTags.ConvertAll(s => s.ToString())));

            return listDto;
        }
        

        public async Task<UserDto> GetByIdAsync(UserId id)
        {
            var us = await this._repo.GetByIdAsync(id);
            if (us == null)
            {
                return null;
            }
            
            //Console.WriteLine("usrService l 36 "+us.Id +" " +us.UserName +" " +us.Birthday +" " +us.EmotionalState +" " +us.Gender +" " +us.Description +" " +us.PhoneNumber +" " +us.Address +" " +us.SystemUser.Email.EmailAtri +" " +us.SystemUser.Pass.Psw);
            
        /*    Console.WriteLine("UserService line 36: ");
            Console.WriteLine("Id "+us.Id.Value);
            Console.WriteLine("UserName "+us.UserName.Username);
            Console.WriteLine("Birthday "+us.Birthday.Birthday);
            Console.WriteLine("EmotionalState "+us.EmotionalState.EmotionalStateAtri);
            Console.WriteLine("Gender "+us.Gender);
            Console.WriteLine("Description "+us.Description.Desc);
            Console.WriteLine("PhoneNumber "+us.PhoneNumber.Number);
            Console.WriteLine("Address "+us.Address.Addr);
            foreach (var a in us.UserTags.List)
            {
                Console.WriteLine(a.Id+" ==== "+a.Description);
            }*/
            //Console.WriteLine("SystemUser.Email.EmailAtri "+us.SystemUser.Email);
            //Console.WriteLine("SystemUser.Pass.Psw "+us.SystemUser.Pass.Psw);

            return new UserDto(us.Id.AsGuid(),us.UserName,us.Birthday,us.EmotionalState,us.Gender,us.Description,us.PhoneNumber,us.Address,us.UserTags,us.SystemUserId);
        }
        
        public async Task<List<UserDto>> GetByKeywordAsync(string keyword)
        {
            var list = await this._repo.GetAllAsync();
            var result = new List<UserDto>();

            foreach (var user in list)
            {
                if(user.Description.Desc.Contains(keyword) || user.UserName.ToString().Contains(keyword))
                    result.Add(new UserDto(user.Id.AsGuid(), user.UserName, user.Birthday, user.EmotionalState, user.Gender, user.Description,user.PhoneNumber, user.Address,user.UserTags,user.SystemUserId));
            }

            return result;
        }
        
        public async Task<UserDto> AddAsync(UserDto dto)
        {
            /*
            var sysUs = new SystemUser(dto.SystemUser.Email.EmailAtri, dto.SystemUser.Psw);
            await this._repoSysUser.AddAsync(sysUs);
            await this._unitOfWork.CommitAsync();*/
            
            var us = new User(dto.UserName,dto.Birthday,dto.EmotionalState,dto.Gender,dto.Description,dto.PhoneNumber,dto.Address,dto.Tags, dto.SystemUserId);
            await this._repo.AddAsync(us);
            await this._unitOfWork.CommitAsync();

            return new UserDto(us.Id.AsGuid(), us.UserName, us.Birthday, us.EmotionalState, us.Gender, us.Description, us.PhoneNumber, us.Address, us.UserTags, us.SystemUserId);
        }
        
        public async Task<UserDto> UpdateAsync(UserDto dto)
        {
            var user = await this._repo.GetByIdAsync(new UserId(dto.Id)); 

            if (user == null)
                return null;   

            // change all field
            user.ChangeUserName(dto.UserName);
            user.ChangeBirthday(dto.Birthday);
            user.ChangeEmotionalState(dto.EmotionalState);  
            user.ChangeGender(dto.Gender);
            user.ChangeDescription(dto.Description);
            user.ChangePhoneNumber(dto.PhoneNumber);
            user.ChangeAddress(dto.Address);
            user.UserTags = dto.Tags;
            
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.UserName, user.Birthday, user.EmotionalState, user.Gender,
                user.Description,user.PhoneNumber, user.Address,user.UserTags,user.SystemUserId);
        }

        public async Task<UserDto> UpdateEmotionalStateAsync(UserDto dto)
        {
            var user = await this._repo.GetByIdAsync(new UserId(dto.Id)); 

            if (user == null)
                return null;   

            // change all field
            user.ChangeEmotionalState(dto.EmotionalState);
            
            await this._unitOfWork.CommitAsync();

            return new UserDto(user.Id.AsGuid(), user.UserName, user.Birthday, user.EmotionalState, user.Gender,
                user.Description,user.PhoneNumber, user.Address,user.UserTags,user.SystemUserId);
            
        }
        

        public async Task<UserDto> DeleteAsync(UserId id)
        {
            var us = await this._repo.GetByIdAsync(id); 

            if (us == null)
                return null;   
            
            this._repo.Remove(us);
            await this._unitOfWork.CommitAsync();

            return new UserDto(us.Id.AsGuid(), us.UserName, us.Birthday, us.EmotionalState, us.Gender, us.Description,us.PhoneNumber, us.Address,us.UserTags,us.SystemUserId);
        }
        
        public async Task<UserDto> GetBySysUserAsync(Guid systemUserId)
        {
            var list = await this._repo.GetAllAsync();

            foreach (var user in list)
            {
                if (user.SystemUserId.Equals(new SystemUserId(systemUserId)))
                {
                    return  new UserDto(user.Id.AsGuid(), user.UserName, user.Birthday, user.EmotionalState,
                        user.Gender, user.Description, user.PhoneNumber, user.Address, user.UserTags,user.SystemUserId);
                }
            }

            return null;
        }
    }
}