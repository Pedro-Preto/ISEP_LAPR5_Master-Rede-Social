using DDDNetCore.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetCore.Infraestructure.Users
{

    internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(j => j.Id);

            builder.OwnsOne(j => j.Address, adr =>
            {
                adr.Property(a => a.Addr)
                    .IsRequired();
            });

            builder.OwnsOne(j => j.Birthday, dat =>
            {
                dat.Property(a => a.Birthday)
                    .IsRequired();
            });

            builder.OwnsOne(j => j.Description, des =>
            {
                des.Property(a => a.Desc)
                    .IsRequired();
            });

            builder.OwnsOne(j => j.EmotionalState, emo =>
            {
                emo.Property(a => a.EmotionalStateAtri)
                    .IsRequired();
                emo.Property(a => a.Date)
                    .IsRequired();
            });

            builder.OwnsOne(j => j.PhoneNumber, phn =>
            {
                phn.Property(a => a.Number)
                    .IsRequired();
            });

            builder.OwnsOne(j => j.UserName, usn =>
            {
                usn.Property(a => a.Username)
                    .IsRequired();
                usn.HasIndex(a => a.Username).IsUnique();
            });
            builder.OwnsOne(k => k.Gender, g =>
                { g.Property(a => a.GenderAtri)
                    .IsRequired();
                });
            builder.OwnsMany(a => a.UserTags, tags =>
            {
                tags.WithOwner().HasForeignKey("UserTags");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });
           // builder.Metadata.FindNavigation(nameof(User.UserTags)).SetPropertyAccessMode(PropertyAccessMode.Field);
          
            builder.OwnsOne(x => x.SystemUserId, u =>
            {
                u.Property(a => a.Value); 
                
            });
        }
    }
}