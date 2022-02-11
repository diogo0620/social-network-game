using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDR.Domain.Ligacoes;

namespace MDR.Infrastructure.Ligacoes
{
    internal class LigacaoEntityTypeConfiguration : IEntityTypeConfiguration<Ligacao>
    {
        public void Configure(EntityTypeBuilder<Ligacao> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            builder.HasKey(lig => lig.Id);

            builder.OwnsOne(lig => lig.ForcaLigacao);
            builder.OwnsOne(lig => lig.ForcaRelacao);
            builder.OwnsMany(lig => lig.Tags);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}