using MDR.Domain.Shared;
using MDR.Domain.PedidosLigacao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.PedidosLigacao
{
    public class MensagemLigacaoTest
    {

        [Fact]
        public void Criacao_Mensagem_Valido()
        {
            string mensagemValido = "teste";

            MensagemLigacao e = new(mensagemValido);

            Assert.Equal(mensagemValido, e.value);
        }


    }
}
