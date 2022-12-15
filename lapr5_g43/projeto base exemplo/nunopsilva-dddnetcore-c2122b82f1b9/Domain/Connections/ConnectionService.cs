using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.Connections
{
    public class ConnectionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConnectionRepository _repo;

        public ConnectionService(IUnitOfWork unitOfWork, IConnectionRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<ConnectionDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<ConnectionDto> listDto = list.ConvertAll<ConnectionDto>(cat => new ConnectionDto(cat.Id.AsGuid(), 
                cat.User1Id, cat.User1ConnectionStrength, cat.User1RelationStrength, cat.User2Id, cat.User2ConnectionStrength, 
                cat.User2RelationStrength, cat.ConnectionTags));

            return listDto;
        }
        
        public async Task<List<ConnectionPrologDto>> GetAllPrologAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<ConnectionPrologDto> listDto = list.ConvertAll<ConnectionPrologDto>(cat => new ConnectionPrologDto( 
                cat.User1Id.Value, cat.User1ConnectionStrength.ToString(), cat.User1RelationStrength.ToString(), cat.User2Id.Value, cat.User2ConnectionStrength.ToString(), 
                cat.User2RelationStrength.ToString()));

            return listDto;
        }
        

        public async Task<ConnectionDto> GetByIdAsync(ConnectionId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;

            return new ConnectionDto(cat.Id.AsGuid(), cat.User1Id, cat.User1ConnectionStrength, cat.User1RelationStrength, 
                cat.User2Id, cat.User2ConnectionStrength, cat.User2RelationStrength, cat.ConnectionTags);

        }
        
        public async Task<List<ConnectionDto>> GetByUserAsync(UserDto user)
        {
            var list = await _repo.GetAllAsync();
            var result = new List<ConnectionDto>();
            
            if (list == null)
                return null;

            if (list.Count > 0) {
                foreach (var connection in list)
                {
                    if (connection.User1Id.Equals(new UserId(user.Id)) || connection.User2Id.Equals(new UserId(user.Id)))
                    {
                        result.Add(new ConnectionDto(connection.Id.AsGuid(), connection.User1Id,
                            connection.User1ConnectionStrength,
                            connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength,
                            connection.User2RelationStrength,connection.ConnectionTags));
                    }
                }
            }
            return result;
        }
        
        public async Task<UserId> GetOtherUserOfConnection(ConnectionDto connection, UserDto userDto)
        {
            UserId us;
            if (connection.User2Id.Equals(new UserId(userDto.Id)))
            {
                us = connection.User1Id;
            } else if (connection.User1Id.Equals(new UserId(userDto.Id)))
            {
                us = connection.User2Id;
            }
            else
            {
                us = null;
            }
            return us;
        }

        public async Task<ConnectionDto> AddAsync(ConnectionDto dto)
        {
            var connection = new Connection(dto.User1Id, dto.User1ConnectionStrength, dto.User1RelationStrength,
                dto.User2Id, dto.User2ConnectionStrength, dto.User2RelationStrength, dto.ConnectionTags);

            await this._repo.AddAsync(connection);

            await this._unitOfWork.CommitAsync();

            return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength, 
                connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength, connection.User2RelationStrength, connection.ConnectionTags);
        }

        public async Task<ConnectionDto> UpdateAsync(ConnectionDto dto)
        {
            var connection = await this._repo.GetByIdAsync(new ConnectionId(dto.Id)); 

            if (connection == null)
                return null;
            
            connection.User1Id = dto.User1Id;
            connection.User2Id = dto.User2Id;
            connection.ConnectionTags = dto.ConnectionTags;
            connection.User1ConnectionStrength = dto.User1ConnectionStrength;
            
            await this._unitOfWork.CommitAsync();

            return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength, 
                connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength, connection.User2RelationStrength, connection.ConnectionTags);
        }

        public async Task<ConnectionDto> InactivateAsync(ConnectionId id)
        {
            var connection = await this._repo.GetByIdAsync(id); 

            if (connection == null)
                return null;

            await this._unitOfWork.CommitAsync();

            return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength, 
                connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength, connection.User2RelationStrength, connection.ConnectionTags);
        }

         public async Task<ConnectionDto> DeleteAsync(ConnectionId id)
        {
            var connection = await this._repo.GetByIdAsync(id); 

            if (connection == null)
                return null;   
            
            this._repo.Remove(connection);
            await this._unitOfWork.CommitAsync();

            return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength, 
                connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength, connection.User2RelationStrength, connection.ConnectionTags);
        }

         public async Task<ConnectionDto> UpdateConnectionStrengthUser2(ConnectionDto dto, int connectionStrength)
         {
             var connection = await this._repo.GetByIdAsync(new ConnectionId(dto.Id));

             if (connection == null){
                 return null;
             }
             
             connection.UpdateUser2ConnectionStrength(new ConnectionStrength(connectionStrength));
             
             await this._unitOfWork.CommitAsync();
             
             return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength,
                 connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength,
                 connection.User2RelationStrength, connection.ConnectionTags);
         }
         
         public async Task<ConnectionDto> UpdateTags(ConnectionId id,ConnectionTags tagId)
         {
             var connection = await this._repo.GetByIdAsync(id); 

             if (connection == null)
                 return null;   
             
             connection.AddTags(tagId);
             
             await this._unitOfWork.CommitAsync();

             return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength,
                 connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength,
                 connection.User2RelationStrength, connection.ConnectionTags);
         }
         public async Task<ConnectionDto> UpdateConnectionRelation(ConnectionId id,EditRelationStrengthDto dto)
         {
             var connection = await this._repo.GetByIdAsync(id); 

             if (connection == null)
                 return null;
             switch (dto.LikeOrDislike)
             {
                 case 1:
                     if (connection.User1Id.Value.Equals(dto.UserId))
                     {
                         int value = connection.User1RelationStrength.Strength + 1;
                         connection.User1RelationStrength =new ConnectionRelationStrength(value);
                     }

                     if (connection.User2Id.Value.Equals(dto.UserId))
                     {
                         int value = connection.User2RelationStrength.Strength + 1;
                         connection.User2RelationStrength =new ConnectionRelationStrength(value); 
                     }
                     
                     break;
                 case 2:        
                     if (connection.User1Id.Value.Equals(dto.UserId))
                     {
                         int value = connection.User1RelationStrength.Strength - 1;
                         connection.User1RelationStrength =new ConnectionRelationStrength(value);
                     }

                     if (connection.User2Id.Value.Equals(dto.UserId))
                     {
                         int value = connection.User2RelationStrength.Strength - 1;
                         connection.User2RelationStrength =new ConnectionRelationStrength(value); 
                     }
                     break;
             }
             
             
             await this._unitOfWork.CommitAsync();

             return new ConnectionDto(connection.Id.AsGuid(), connection.User1Id, connection.User1ConnectionStrength,
                 connection.User1RelationStrength, connection.User2Id, connection.User2ConnectionStrength,
                 connection.User2RelationStrength, connection.ConnectionTags);
         }
        
    }
}