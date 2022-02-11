using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Utilizadores
{
    public class UtilizadorIdTest
    {

        [Fact]
        public void Nao_E_Possivel_Criar_Id_Sem_Formato_Correto ()
        {
            string idInvalido = "idInvalido-test";

            // act & assert
            Assert.Throws<System.FormatException>(() => new UtilizadorId(idInvalido));
        }

        [Fact]
        public void Criacao_Id_Valido()
        {
            string idValido = "12345678-1234-1234-1234-111111111111";

            UtilizadorId e = new(idValido);

            Assert.Equal(idValido, e.AsString());
        }


    }
}