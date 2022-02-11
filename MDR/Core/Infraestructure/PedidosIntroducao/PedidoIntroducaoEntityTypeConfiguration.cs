using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDR.Domain.PedidosIntroducao;

namespace MDR.Infrastructure.PedidosIntroducao
{
    internal class PedidoIntroducaoEntityTypeConfiguration : IEntityTypeConfiguration<PedidoIntroducao>
    {
        public void Configure(EntityTypeBuilder<PedidoIntroducao> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDR);
            builder.HasKey(ped => ped.Id);
            builder.OwnsOne(ped => ped.MensagemIntroducao);
            builder.OwnsOne(ped => ped.MensagemLigacao);
            builder.OwnsOne(ped => ped.ForcaLigacao);
            builder.OwnsMany(ped => ped.Tags);

            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}