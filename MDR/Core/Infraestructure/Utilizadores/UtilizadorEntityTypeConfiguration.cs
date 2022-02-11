using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDR.Domain.Utilizadores;

namespace MDR.Infrastructure.Utilizadores
{
    internal class UtilizadorEntityTypeConfiguration : IEntityTypeConfiguration<Utilizador>
    {
        public void Configure(EntityTypeBuilder<Utilizador> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDR);
            builder.HasKey(uti => uti.Id);
            builder.OwnsOne(uti => uti.Email);
            builder.OwnsOne(uti => uti.Password);
            builder.OwnsOne(uti => uti.Nome);
            builder.OwnsOne(uti => uti.DataNascimento);
            builder.OwnsOne(uti => uti.Telefone);
            builder.OwnsOne(uti => uti.PerfilLinkedIn);
            builder.OwnsOne(uti => uti.PerfilFacebook);
            builder.OwnsOne(uti => uti.Avatar);
            builder.OwnsOne(uti => uti.Localizacao);
            builder.OwnsOne(uti => uti.Descricao);
            builder.OwnsMany(uti => uti.Tags);
            builder.OwnsOne(uti => uti.EstadoEmocional);



            //builder.HasIndex(p => new { p.Email }).IsUnique(true);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}