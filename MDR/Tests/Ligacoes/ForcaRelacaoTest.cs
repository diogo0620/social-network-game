using MDR.Domain.Shared;
using MDR.Domain.Ligacoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Ligacoes
{
    public class ForcaRelacaoTest
    {

        [Fact]
        public void Criacao_Forca_Relacao_Valido()
        {
            int forcaValido = 5;

            ForcaRelacao e = new(10, 5);

            Assert.Equal(forcaValido, e.valor());
        }


    }
}
