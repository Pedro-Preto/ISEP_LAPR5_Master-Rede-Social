using DDDNetCore.Domain.IntroductionRequests;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetCore.Infraestructure.IntroductionRequests
{
    internal class IntroductionRequestEntityTypeConfiguration : IEntityTypeConfiguration<IntroductionRequest>
    {
        public void Configure(EntityTypeBuilder<IntroductionRequest> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("IntroductionRequest", SchemaNames.DDDSample1);
            
            builder.HasKey(b => b.Id);

            builder.OwnsOne(x => x.Date, date =>
            {
                date.Property(d => d.Date).IsRequired();
            });
            
            builder.OwnsOne(x => x.MessageToIntermediary, msg =>
            {
                msg.Property(d => d.Message).IsRequired();
            });
            
            builder.OwnsOne(x => x.MessageToTarget, msg =>
            {
                msg.Property(d => d.Message).IsRequired();
            });
            
            builder.OwnsOne(x => x.UserRequesterId, urid =>
            {
                urid.Property(d => d.Value).IsRequired();
            });
            
            builder.OwnsOne(x => x.UserIntermediaryId, uiid =>
            {
                uiid.Property(d => d.Value).IsRequired();
            });
            
            builder.OwnsOne(x => x.UserTargetId, utid =>
            {
                utid.Property(d => d.Value).IsRequired();
            });
            
            builder.OwnsOne(x => x.State, state =>
            {
                state.Property(d => d.IntroductionRequestStateAttribute).IsRequired();
            });

            builder.OwnsMany(x => x.TagList, tags =>
            {
                tags.WithOwner().HasForeignKey("ConnectionTags");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });
            
            builder.OwnsOne(x => x.ConnectionStrength, cs =>
            {
                cs.Property(d => d.Strength).IsRequired();
            });
            
            //builder.Property(x => x.Date);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}