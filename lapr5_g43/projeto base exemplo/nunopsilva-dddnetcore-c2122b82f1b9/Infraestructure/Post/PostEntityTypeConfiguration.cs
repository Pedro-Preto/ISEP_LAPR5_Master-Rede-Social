using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetCore.Infraestructure.Post
{
    internal class PostEntityTypeConfiguration : IEntityTypeConfiguration<Domain.Posts.Post>
    {
        public void Configure(EntityTypeBuilder<Domain.Posts.Post> builder)
        {
            builder.HasKey(j => j.Id);

            builder.OwnsOne(j => j.PostContent, cont =>
            {
                cont.Property(j => j.Content).IsRequired();
            });

            builder.OwnsOne(j => j.UserPosterName, name =>
            {
                name.Property(j => j.Username).IsRequired();
            });
            builder.OwnsOne(j => j.PostDate, dat =>
            {
                dat.Property(j => j.Date).IsRequired();
            });
            builder.OwnsMany(j => j.PostUsers, users =>
            {
                users.WithOwner().HasForeignKey("PostUsers");
                users.Property<int>("Id");
                users.HasKey("Id");
            });
        }
    }
}  