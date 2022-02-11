using Microsoft.EntityFrameworkCore;
using MDR.Domain.Utilizadores;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Ligacoes;
using MDR.Domain.PedidosIntroducao;
using MDR.Infrastructure.Utilizadores;
using MDR.Infrastructure.PedidosLigacao;
using MDR.Infrastructure.Ligacoes;
using MDR.Infrastructure.PedidosIntroducao;

namespace MDR.Infrastructure
{
    public class MDRDbContext : DbContext
    {

        public DbSet<Utilizador> Utilizadores { get; set; }

        public DbSet<PedidoLigacao> PedidosLigacao { get; set; }

        public DbSet<Ligacao> Ligacoes { get; set; }

        public DbSet<PedidoIntroducao> PedidosIntroducao { get; set; }



        public MDRDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UtilizadorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoLigacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LigacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoIntroducaoEntityTypeConfiguration());

        }
    }
}