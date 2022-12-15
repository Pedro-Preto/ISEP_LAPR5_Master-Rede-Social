using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.Users;

namespace DDDNetCore.Domain.IntroductionRequests
{
    public class IntroductionRequestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IIntroductionRequestRepository _repo;

        public IntroductionRequestService(IUnitOfWork unitOfWork, IIntroductionRequestRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<IntroductionRequestDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<IntroductionRequestDto> listDto = list.ConvertAll<IntroductionRequestDto>(cat => new IntroductionRequestDto(cat.Id.AsGuid(), cat.Date, cat.MessageToIntermediary, cat.MessageToTarget, cat.UserRequesterId, cat.UserIntermediaryId, cat.UserTargetId, cat.State, cat.TagList, cat.ConnectionStrength));

            return listDto;
        }

        public async Task<IntroductionRequestDto> GetByIdAsync(IntroductionRequestId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;

            return new IntroductionRequestDto(cat.Id.AsGuid(), cat.Date, cat.MessageToIntermediary, cat.MessageToTarget, cat.UserRequesterId, cat.UserIntermediaryId, cat.UserTargetId, cat.State, cat.TagList, cat.ConnectionStrength);
        }

        public async Task<List<IntroductionRequestDto>> GetByUserAsync(UserId id)
        {
            var list = await this._repo.GetAllAsync();
            List<IntroductionRequestDto> result = new List<IntroductionRequestDto>();

            foreach (var ir in list)
             {
                 if (ir.UserTargetId.Equals(id))
                 {
                     result.Add(new IntroductionRequestDto(ir.Id.AsGuid(), ir.Date, ir.MessageToIntermediary, ir.MessageToTarget, ir.UserRequesterId, ir.UserIntermediaryId, ir.UserTargetId, ir.State,ir.TagList, ir.ConnectionStrength));
                 }
             }

             return result;
            
        }
        
        public async Task<List<IntroductionRequestDto>> GetUserPendingIntroductionRequestAsync(UserId id)
        {
            var list = await this._repo.GetAllAsync();
            List<IntroductionRequestDto> result = new List<IntroductionRequestDto>();

            foreach (var ir in list)
            {
                if (ir.UserIntermediaryId.Equals(id) && ir.State.IntroductionRequestStateAttribute.Equals(IntroductionRequestStateEnum.AwaitingApproval))
                {
                    result.Add(new IntroductionRequestDto(ir.Id.AsGuid(), ir.Date, ir.MessageToIntermediary, ir.MessageToTarget, ir.UserRequesterId, ir.UserIntermediaryId, ir.UserTargetId, ir.State,ir.TagList, ir.ConnectionStrength));
                }
            }

            return result;
            
        }
        
        

        public async Task<IntroductionRequestDto> AddAsync(IntroductionRequestDto dto)
        {
            var intReq = new IntroductionRequest(dto.Date, dto.MessageToIntermediary, dto.MessageToTarget,
                dto.UserRequesterId, dto.UserIntermediaryId, dto.UserTargetId, dto.State, dto.TagList,
                dto.ConnectionStrength);

            await this._repo.AddAsync(intReq);

            await this._unitOfWork.CommitAsync();

            return new IntroductionRequestDto(intReq.Id.AsGuid(), intReq.Date, intReq.MessageToIntermediary, intReq.MessageToTarget, intReq.UserRequesterId, intReq.UserIntermediaryId, intReq.UserTargetId, intReq.State, intReq.TagList, intReq.ConnectionStrength);
        }

        public async Task<IntroductionRequestDto> UpdateAsync(IntroductionRequestId id,IntroductionRequestDto dto)
        {
            var intReq = await this._repo.GetByIdAsync(id);
            if (intReq == null)
            {
                Console.WriteLine();
                Console.WriteLine();
                Console.WriteLine();
                Console.WriteLine("Sou null");
                Console.WriteLine();
                Console.WriteLine();
                Console.WriteLine();
                return null;
            }
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("Cheguei ao repoo");
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine();
           // intReq.ChangeDate(dto.Date);
            intReq.ChangeState(dto.State);
            intReq.ChangeMessageInter(dto.MessageToIntermediary);
            intReq.ChangeMessageTarg(dto.MessageToTarget);
            intReq.ChangeUserInter(dto.UserIntermediaryId);
            intReq.ChangeUserReque(dto.UserRequesterId);
            intReq.ChangeUserTar(dto.UserTargetId);
            intReq.ChangeStrength(dto.ConnectionStrength);
            intReq.ChangeTags(dto.TagList);
            
            

            await this._unitOfWork.CommitAsync();

            return new IntroductionRequestDto(intReq.Id.AsGuid(), intReq.Date, intReq.MessageToIntermediary, intReq.MessageToTarget, intReq.UserRequesterId, intReq.UserIntermediaryId, intReq.UserTargetId, intReq.State, intReq.TagList, intReq.ConnectionStrength);
        }

        public async Task<IntroductionRequestDto> InactivateAsync(IntroductionRequestId id)
        {
            var intReq = await this._repo.GetByIdAsync(id); 

            if (intReq == null)
                return null;

            await this._unitOfWork.CommitAsync();

            return new IntroductionRequestDto (intReq.Id.AsGuid(), intReq.Date, intReq.MessageToIntermediary, intReq.MessageToTarget, intReq.UserRequesterId, intReq.UserIntermediaryId, intReq.UserTargetId, intReq.State, intReq.TagList, intReq.ConnectionStrength);
        }

         public async Task<IntroductionRequestDto> DeleteAsync(IntroductionRequestId id)
        {
            var intReq = await this._repo.GetByIdAsync(id); 

            if (intReq == null)
                return null;   
            
            this._repo.Remove(intReq);
            await this._unitOfWork.CommitAsync();

            return new IntroductionRequestDto (intReq.Id.AsGuid(), intReq.Date, intReq.MessageToIntermediary, intReq.MessageToTarget, intReq.UserRequesterId, intReq.UserIntermediaryId, intReq.UserTargetId, intReq.State, intReq.TagList, intReq.ConnectionStrength);
        }
    }
}