using MDR.Domain.Shared;
using MDR.Domain.PedidosIntroducao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.PedidosIntroducao
{
    public class MensagemIntroducaoTest
    {

        [Fact]
        public void Criacao_Mensagem_Valido()
        {
            string mensagemValido = "teste";

            MensagemIntroducao e = new(mensagemValido);

            Assert.Equal(mensagemValido, e.value);
        }


    }
}
