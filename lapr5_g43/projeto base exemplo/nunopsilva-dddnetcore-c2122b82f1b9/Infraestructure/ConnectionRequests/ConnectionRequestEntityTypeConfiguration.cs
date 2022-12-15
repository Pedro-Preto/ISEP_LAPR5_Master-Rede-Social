using DDDNetCore.Domain.ConnectionRequest;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetCore.Infraestructure.ConnectionRequests
{
    internal class ConnectionRequestEntityTypeConfiguration: IEntityTypeConfiguration<ConnectionRequest>
    {
        public void Configure(EntityTypeBuilder<ConnectionRequest> builder)
        {
            //builder.ToTable("ConnectionRequest", SchemaNames.DDDSample1);
            builder.HasKey(j => j.Id);
            
            builder.OwnsOne(x => x.Date, dt =>
            {
                dt.Property(a => a.Date)
                    .IsRequired();
            } );
            
            builder.OwnsOne(j => j.Message, msg=>
            {
                msg.Property(a => a.Message).IsRequired();
            });
            
            builder.OwnsOne(j => j.UserTargetId, utid=>
            {
                utid.Property(a => a.Value).IsRequired();
            });
            
            builder.OwnsOne(j => j.UserRequesterId, urid=>
            {
                urid.Property(a => a.Value).IsRequired();
            });

            builder.OwnsMany(j => j.Tags, tags =>
            {
                tags.WithOwner().HasForeignKey("ConnectionTags");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });
            
          
            builder.OwnsOne(x => x.ConnectionStrength, cd =>
            {
                cd.Property(c => c.Strength).IsRequired();
            });
            
            builder.OwnsOne(x => x.State, st =>
            {
                st.Property(c => c.ConnectionRequestStateAttribute).IsRequired();
            });
            
            
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}