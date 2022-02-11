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
    public class NomeTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Nome_Null ()
        {
            string nomeInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Nome(nomeInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Nome_Com_Espacos_No_Inicio ()
        {
            string nomeInvalido = " José";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Nome(nomeInvalido));
        }

        [Fact]
        public void Criacao_Email_Valido()
        {
            string nomeValido = "José";

            Nome e = new(nomeValido);

            Assert.Equal(nomeValido, e.value);
        }


    }
}