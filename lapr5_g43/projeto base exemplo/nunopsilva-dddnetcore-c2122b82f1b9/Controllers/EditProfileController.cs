using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditProfileController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly SystemUserService _systemUserService;

        public EditProfileController(UserService userService, SystemUserService systemUserService)
        {
            _userService = userService;
            _systemUserService = systemUserService;
        }

        // GET: api/EditProfile/5
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetGetById(Guid id)
        {
            var user = await _userService.GetByIdAsync(new UserId(id));

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/EditProfile
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            SystemUserDto sysUser = await _systemUserService.GetLoggedUserAsync();
            if (sysUser == null)
            {
                return NotFound();
            }
            
            var user = await _userService.GetBySysUserAsync(sysUser.Id);
            if (user == null)
            {
                return NotFound();
            }
            
            return user;
        }
        
        // PUT: api/EditProfile/5
        [HttpPut("/api/user/updateProfile/id/{id}")]
        public async Task<ActionResult<UserDto>> Update(string id, CreatingUserDto dto)
        {
            var user = _userService.GetByIdAsync(new UserId(id)).Result;
            try
            {
                var userDto = new UserDto(new Guid(id), dto.UserName, dto.Birthday, dto.EmotionalState, dto.Gender, " ", dto.PhoneNumber, dto.Address,dto.Tags,new Guid(user.SystemUserId.Value));
                userDto = await _userService.UpdateAsync(userDto);

                if (userDto == null)
                {
                    return NotFound();
                }

                return Ok(userDto);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // PUT: api/EditProfile/5
        [HttpPut("/api/user/editProfile/id/{id}")]
        public async Task<ActionResult<UserDto>> EditProfile(string id, EditingProfileDto dto)
        {
            var user = _userService.GetByIdAsync(new UserId(id)).Result;
            try
            {
                var auxName = dto.UserName ?? user.UserName.Username;
                var auxPhone = dto.PhoneNumber ?? user.PhoneNumber.Number;
                var auxDescription = dto.Description ?? user.Description.Desc;
                var auxAddress = dto.Address ?? user.Address.Addr;

                var userDto = new UserDto(
                    user.Id,
                    auxName,
                    user.Birthday,
                    user.EmotionalState,
                    user.Gender,
                    auxDescription,
                    auxPhone,
                    auxAddress,
                    user.Tags,
                    user.SystemUserId
                );

                if (dto.Tag != null)
                {
                    var alreadyHasTag = false;
                    try
                    {
                        foreach (var tag in userDto.Tags)
                        {
                            if (tag.TagIdValue.Equals(dto.Tag))
                                alreadyHasTag = true;
                        }
                        if (alreadyHasTag == false)
                            userDto.Tags.Add(new UserTags(dto.Tag));
                    }
                    catch (BusinessRuleValidationException ex)
                    {
                        return BadRequest(new {Message = ex.Message});
                    }
                }
                
                if (dto.RemoveTag != null)
                {
                    var tagAux = new UserTags("");
                    try
                    {
                        foreach (var tag in userDto.Tags)
                        {
                            if (tag.TagIdValue.Equals(dto.RemoveTag))
                                tagAux = tag;
                        }
                        userDto.Tags.Remove(tagAux);
                    }
                    catch (BusinessRuleValidationException ex)
                    {
                        return BadRequest(new {Message = ex.Message});
                    }
                }

                userDto = await _userService.UpdateAsync(userDto);

                if (userDto == null)
                    return NotFound();

                return Ok(userDto);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
    }
}