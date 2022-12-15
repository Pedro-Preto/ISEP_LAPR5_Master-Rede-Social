using DDDNetCore.Domain.IntroductionRequests;
using DDDNetCore.Infraestructure.Shared;

namespace DDDNetCore.Infraestructure.IntroductionRequests
{
    public class IntroductionRequestRepository : BaseRepository<IntroductionRequest, IntroductionRequestId>, IIntroductionRequestRepository
    {
    
        public IntroductionRequestRepository(DDDSample1DbContext context):base(context.IntroductionRequests)
        {
           
        }


    }
}