using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.ConnectionRequest
{
    public class ConnectionRequestService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IConnectionRequestRepository _repo;

        public ConnectionRequestService(IUnitOfWork unitOfWork, IConnectionRequestRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<ConnectionRequestDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<ConnectionRequestDto> listDto = list.ConvertAll<ConnectionRequestDto>(cat => new ConnectionRequestDto(new Guid(cat.Id.Value),
                cat.Date, cat.Message, 
                cat.UserRequesterId, cat.UserTargetId,
                cat.Tags, cat.ConnectionStrength));

            return listDto;
        }
        public async Task<List<ConnectionRequestDto>> GetAllPendingConnectionRequestsAsync(UserId id)
        {

            List<ConnectionRequest>list = this._repo.GetAllAsync().Result;
            var result = new List<ConnectionRequestDto>();
            foreach (var s in list)
            {
                if (s.UserTargetId == id && s.State.ConnectionRequestStateAttribute==ConnectionRequestStateEnum.Unanswered)
                {
                    var a = new ConnectionRequestDto(new Guid(s.Id.Value), s.Date, s.Message, s.UserRequesterId,s.UserTargetId, s.Tags, s.ConnectionStrength);
                    a.SetUnansweredConnectionRequest();
                    result.Add(a);                }
            }

            return result;
        }
        
        public async Task<List<ConnectionRequestDto>> GetAllAcceptedAsync()
        {

            Task<List<ConnectionRequest> >list = this._repo.GetAllAsync();
            var result = new List<ConnectionRequestDto>();
            foreach (var s in list.Result)
            {
                if (s.State.ConnectionRequestStateAttribute==ConnectionRequestStateEnum.Accepted)
                {
                    result.Add(new ConnectionRequestDto(new Guid(s.Id.Value), s.Date, s.Message,s.UserRequesterId,s.UserTargetId, s.Tags, s.ConnectionStrength));                }
            }

            return result;
        }
        public async Task<List<ConnectionRequestDto>> GetAllDeniedAsync()
        {
            Task<List<ConnectionRequest> >list = this._repo.GetAllAsync();
            var result = new List<ConnectionRequestDto>();
           
            foreach (var s in list.Result)
            {
                if (s.State.ConnectionRequestStateAttribute==ConnectionRequestStateEnum.Denied)
                {
                    result.Add(new ConnectionRequestDto(new Guid(s.Id.Value), s.Date, s.Message,s.UserRequesterId,s.UserTargetId, s.Tags, s.ConnectionStrength));                }
            }

            return result;
        }


        public async Task<ConnectionRequestDto> GetByIdAsync(ConnectionRequestId id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return new ConnectionRequestDto(new Guid(cat.Id.Value), cat.Date, cat.Message, cat.UserRequesterId,
                cat.UserTargetId, cat.Tags, cat.ConnectionStrength);
        }

        public async Task<ConnectionRequestDto> AddAsync(ConnectionRequestDto dto)
        {
            var connection = new ConnectionRequest(dto.Message, dto.UserRequesterId,
                dto.UserTargetId, dto.Tags, dto.ConnectionStrength);

            await this._repo.AddAsync(connection);

            await this._unitOfWork.CommitAsync();
            var a = new ConnectionRequestDto(new Guid(connection.Id.Value), connection.Date, connection.Message,
                connection.UserRequesterId, connection.UserTargetId, connection.Tags, connection.ConnectionStrength);
            a.SetUnansweredConnectionRequest();
            return a;
        }
        
        public async Task<ConnectionRequestDto> DeleteAsync(ConnectionRequestId id)
        {
            var connection = await this._repo.GetByIdAsync(id);

            if (connection == null)
                return null;

            this._repo.Remove(connection);
            await this._unitOfWork.CommitAsync();

            return new ConnectionRequestDto(new Guid(connection.Id.Value), connection.Date, connection.Message,
                connection.UserRequesterId, connection.UserTargetId, connection.Tags, connection.ConnectionStrength);
        }
        
        public async Task<ConnectionRequestDto> AcceptConnectionRequestStateAsync(ConnectionRequestDto dto)
        {
            var connectionRequest = await this._repo.GetByIdAsync(new ConnectionRequestId(dto.Id));

            if (connectionRequest == null)
            {
                return null;
            }
            connectionRequest.AcceptConnectionRequest();
            
            await this._unitOfWork.CommitAsync();
            
            var a = new ConnectionRequestDto(connectionRequest.Id.AsGuid(), connectionRequest.Date,
                connectionRequest.Message, connectionRequest.UserRequesterId, connectionRequest.UserTargetId,
                connectionRequest.Tags, connectionRequest.ConnectionStrength);
            a.AcceptConnectionRequest();
            return a;
        }
        
        public async Task<ConnectionRequestDto> DenyConnectionRequestStateAsync(ConnectionRequestDto dto)
        {
            var connectionRequest = await this._repo.GetByIdAsync(new ConnectionRequestId(dto.Id)); 
            
            if (connectionRequest == null)
                return null;   

            // change all field
            connectionRequest.DenyConnectionRequest();
            
            await this._unitOfWork.CommitAsync();
            var a = new ConnectionRequestDto(connectionRequest.Id.AsGuid(), connectionRequest.Date,
                connectionRequest.Message, connectionRequest.UserRequesterId, connectionRequest.UserTargetId,
                connectionRequest.Tags, connectionRequest.ConnectionStrength);
            a.DenyConnectionRequest();
            return a;

        }
    }
}
