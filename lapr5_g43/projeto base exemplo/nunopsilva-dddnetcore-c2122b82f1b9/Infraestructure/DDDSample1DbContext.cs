using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.IntroductionRequests;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using DDDNetCore.Infraestructure.ConnectionRequests;
using DDDNetCore.Infraestructure.Connections;
using DDDNetCore.Infraestructure.IntroductionRequests;
using DDDNetCore.Infraestructure.Post;
using DDDNetCore.Infraestructure.SystemUsers;
using DDDNetCore.Infraestructure.Users;
using Microsoft.EntityFrameworkCore;

namespace DDDNetCore.Infraestructure
{
    public partial class DDDSample1DbContext : DbContext
    {        
        public DDDSample1DbContext()
        {

        }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=db;Trusted_Connection=True;");
            }
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {  
            OnModelCreatingPartial(modelBuilder);

            modelBuilder.ApplyConfiguration(new ConnectionRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectionEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IntroductionRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PostEntityTypeConfiguration());
        }
        
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<SystemUser> SystemUsers { get; set; }
        
        public DbSet<User> Users { get; set; }

        public DbSet<ConnectionRequest> ConnectionRequests { get; set; }

        public DbSet<Connection> Connections { get; set; }

        public DbSet<IntroductionRequest> IntroductionRequests { get; set; }
        
        public DbSet<Domain.Posts.Post> Posts { get; set; }

    }
    
    
}