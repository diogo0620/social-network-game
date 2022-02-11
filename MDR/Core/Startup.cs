using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MDR.Infrastructure;
using MDR.Infrastructure.Utilizadores;
using MDR.Infrastructure.PedidosLigacao;
using MDR.Infrastructure.Ligacoes;
using MDR.Infrastructure.PedidosIntroducao;
using MDR.Infrastructure.Shared;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Ligacoes;
using MDR.Domain.PedidosIntroducao;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MDR.Domain.Planeamento;
using MDR.Domain.Posts;
using MDR.Domain.Classificacao;
using MDR.Domain.Comentarios;
using MDR.Domain.Sistema;

namespace MDR
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MDRDbContext>(opt =>
                // opt.UseInMemoryDatabase("MDRDB")

                opt.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"),
                sqlServerOptionsAction: sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: TimeSpan.FromSeconds(120),
                            errorNumbersToAdd: null
                        );
                })
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });


            services.AddCors(options =>
            {
                options.AddPolicy("_MyAllowSubdomainPolicy",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });


            ConfigureMyServices(services);

            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().Build();
                });
            });


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


            app.UseDefaultFiles();
            app.UseStaticFiles();





            app.UseRouting();

            app.UseCors("_MyAllowSubdomainPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("EnableCORS");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

            });



            app.UseHttpsRedirection();

        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<IUtilizadorRepository, UtilizadorRepository>();
            services.AddTransient<UtilizadorService>();

            services.AddTransient<IPedidoLigacaoRepository, PedidoLigacaoRepository>();
            services.AddTransient<PedidoLigacaoService>();

            services.AddTransient<ILigacaoRepository, LigacaoRepository>();
            services.AddTransient<LigacaoService>();

            services.AddTransient<IPedidoIntroducaoRepository, PedidoIntroducaoRepository>();
            services.AddTransient<PedidoIntroducaoService>();

            services.AddTransient<PostService>();
            services.AddTransient<PlaneamentoService>();
            services.AddTransient<ComentarioService>();

            services.AddTransient<ClassificacaoService>();

            services.AddTransient<SistemaService>();

        }
    }
}
