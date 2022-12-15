namespace DDDNetCore.Domain.Tag
{
    public class TagCloud
    {
        public string Tag { get; set; }

        public int Weight { get; set; }

        public TagCloud(string tag, int weight)
        {
            Tag = tag;
            Weight = weight;
        }
    }
}