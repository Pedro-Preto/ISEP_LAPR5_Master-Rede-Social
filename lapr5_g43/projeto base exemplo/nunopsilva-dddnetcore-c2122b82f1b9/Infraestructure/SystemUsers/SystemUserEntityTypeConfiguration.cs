using DDDNetCore.Domain.SystemUsers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetCore.Infraestructure.SystemUsers
{
   
    internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {

            builder.HasKey(b => b.Id);
            builder.OwnsOne(j => j.Email, ema =>
            {
                ema.Property(a => a.EmailAtri)
                    .IsRequired();
                ema.HasIndex(b => b.EmailAtri).IsUnique();
            }); 

            builder.OwnsOne(j => j.Pass, psw =>
            {
                psw.Property(a => a.Psw)
                    .IsRequired();
            });
            
            builder.OwnsOne(j => j.Logged, log =>
            {
                log.Property(a => a.LoggedIn)
                    .IsRequired();
            });

        }
    }
}
