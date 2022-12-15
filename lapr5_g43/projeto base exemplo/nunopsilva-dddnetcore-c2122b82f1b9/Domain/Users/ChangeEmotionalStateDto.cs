namespace DDDNetCore.Domain.Users
{
    public class ChangeEmotionalStateDto
    {
        public string EmotionalState { get; set; }
        
        
        public ChangeEmotionalStateDto(string emotionalState)
        {
            EmotionalState = emotionalState;
            
        }
    }
}