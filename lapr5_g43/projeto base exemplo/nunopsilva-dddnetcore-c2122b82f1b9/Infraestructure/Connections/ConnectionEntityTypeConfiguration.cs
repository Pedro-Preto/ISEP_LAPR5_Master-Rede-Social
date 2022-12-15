using DDDNetCore.Domain.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetCore.Infraestructure.Connections
{
    internal class ConnectionEntityTypeConfiguration : IEntityTypeConfiguration<Connection>
    {
        public void Configure(EntityTypeBuilder<Connection> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
         //   builder.ToTable("Connections", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            
            builder.OwnsOne(x => x.User1Id, u =>
            {
                u.Property(a => a.Value);
            });
            
            builder.OwnsOne(x => x.User1ConnectionStrength, us =>
            {
                us.Property(a => a.Strength)
                    .IsRequired();
            });
            builder.OwnsOne(x => x.User1RelationStrength, ur =>
            {
                ur.Property(a => a.Strength);
            });

            builder.OwnsOne(x => x.User2Id, u =>
            {
                u.Property(a => a.Value);
            });
            
            builder.OwnsOne(x => x.User2ConnectionStrength, us =>
            {
                us.Property(a => a.Strength);
            });
            builder.OwnsOne(x => x.User2RelationStrength, ur =>
            {
                ur.Property(a => a.Strength);
            });

            builder.OwnsMany(x => x.ConnectionTags, tags =>
            {
                tags.WithOwner().HasForeignKey("ConnectionTags");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });

            //  builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}