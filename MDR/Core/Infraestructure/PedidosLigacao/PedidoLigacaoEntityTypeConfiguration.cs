using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDR.Domain.PedidosLigacao;

namespace MDR.Infrastructure.PedidosLigacao
{
    internal class PedidoLigacaoEntityTypeConfiguration : IEntityTypeConfiguration<PedidoLigacao>
    {
        public void Configure(EntityTypeBuilder<PedidoLigacao> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDR);
            builder.HasKey(ped => ped.Id);

            builder.OwnsOne(ped => ped.MensagemLigacao);
            builder.OwnsOne(ped => ped.ForcaLigacao);
            builder.OwnsMany(ped => ped.Tags);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}