using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MDR.Domain.PedidosLigacao;
using Xunit;

namespace Tests.PedidosLigacao
{
    public class PedidoLigacaoIdTest { 


        [Fact]
        public void Nao_E_Possivel_Criar_Id_Sem_Formato_Correto()
        {
            string idInvalido = "idInvalido-test";

            // act & assert
            Assert.Throws<System.FormatException>(() => new PedidoLigacaoId(idInvalido));
        }

        [Fact]
        public void Criacao_Id_Valido()
        {
            string idValido = "12345678-1234-1234-1234-111111111111";

            PedidoLigacaoId e = new(idValido);

            Assert.Equal(idValido, e.AsString());
        }


    }
}