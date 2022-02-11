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
    public class TelefoneTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Telefone_Sem_Codigo_Do_Pais ()
        {
            string telefoneInvalido = "911111111";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone(null, telefoneInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Telefone_Com_Menos_De_Quatro_Digitos ()
        {
            string codigoPais = "351";
            string telefoneInvalido = "911";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone(codigoPais,telefoneInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Telefone_Com_Mais_De_Onze_Digitos ()
        {
            string codigoPais = "351";
            string telefoneInvalido = "911111111111";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone(codigoPais,telefoneInvalido));
        }

        [Fact]
        public void Criacao_Telefone_Valido()
        {
            string codigoPais = "351";
            string telefoneValido = "911111111";

            Telefone e = new(codigoPais,telefoneValido);

            Assert.Equal("+351 911111111", e.asString());
        }


    }
}
