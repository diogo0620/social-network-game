using MDR.Domain.Ligacoes;
using MDR.Domain.Shared;
using Xunit;

namespace Tests.Ligacoes
{
    public class ForcaLigacaoTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Forca_Ligacao_Menor_Um ()
        {
            int forcaInvalido = 0;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new ForcaLigacao(forcaInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Forca_Ligacao_Maior_Cem ()
        {
            int forcaInvalido = 200;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new ForcaLigacao(forcaInvalido));
        }

        [Fact]
        public void Criacao_Forca_Ligacao_Valido()
        {
            int forcaValido = 50;

            ForcaLigacao e = new(forcaValido);

            Assert.Equal(forcaValido, e.valor);
        }


    }
}
