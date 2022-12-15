using System;
using DDDNetCore.Domain.Connections;
using DDDNetCore.Domain.ConnectionRequest;
using DDDNetCore.Domain.Shared;
using DDDNetCore.Domain.IntroductionRequests;
using DDDNetCore.Domain.Posts;
using DDDNetCore.Domain.SystemUsers;
using DDDNetCore.Domain.Users;
using DDDNetCore.Infraestructure;
using DDDNetCore.Infraestructure.Shared;
using DDDNetCore.Infraestructure.ConnectionRequests;
using DDDNetCore.Infraestructure.Connections;
using DDDNetCore.Infraestructure.IntroductionRequests;
using DDDNetCore.Infraestructure.Post;
using DDDNetCore.Infraestructure.SystemUsers;
using DDDNetCore.Infraestructure.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DDDNetCore
{
    public class Startup
    {
        private readonly string LocalHostsAllowed="_allowedLocalHosts";
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            /*services.AddDbContext<DDDSample1DbContext>(opt =>
                opt.UseInMemoryDatabase("DDDSample1DB")
                  //  .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());*/

            /*var connection = "Data Source = db.db";
            services.AddDbContext<DDDSample1DbContext>(options => options.UseSqlite(connection));*/

            services.AddDbContext<DDDSample1DbContext>(options =>
                    options.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=db;Trusted_Connection=True;")
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            /*services.AddDbContext<DDDSample1DbContext>(options =>
                    options.UseSqlServer("Server=tcp:socialnetworkgamedb.database.windows.net,1433;Initial Catalog=socialnetworkgamedb43;Persist Security Info=False;User ID=lapr5g43;Password=Grupo43:);MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());*/

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(LocalHostsAllowed);

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
                       
            services.AddCors(opt =>
            {
                opt.AddPolicy(LocalHostsAllowed, b =>
                {
                    b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IConnectionRequestRepository,ConnectionRequestRepository>();
            services.AddTransient<ConnectionRequestService>();
            
            services.AddTransient<IConnectionRepository,ConnectionRepository>();
            services.AddTransient<ConnectionService>();
            
            services.AddTransient<IIntroductionRequestRepository,IntroductionRequestRepository>();
            services.AddTransient<IntroductionRequestService>();

            services.AddTransient<ISystemUserRepository,SystemUserRepository>();
            services.AddTransient<SystemUserService>();
            
            
            services.AddTransient<IUserRepository,UserRepository>();
            services.AddTransient<UserService>();
            
            services.AddTransient<IPostRepository,PostRepository>();
            services.AddTransient<PostService>();
        }
    }
}
