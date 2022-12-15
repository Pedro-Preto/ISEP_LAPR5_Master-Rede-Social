using DDDNetCore.Domain.IntroductionRequests;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.IntroductionRequests
{
    public interface IIntroductionRequestRepository: IRepository<IntroductionRequest, IntroductionRequestId>
    {
    }
}