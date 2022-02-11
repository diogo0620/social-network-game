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
    public class DataNascimentoTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Data_Nascimento_Com_Menos_De_Dezasseis_Anos ()
        {
            string dataNascimentoInvalido = "01/01/2020";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new DataNascimento(dataNascimentoInvalido));
        }

        [Fact]
        public void Criacao_Data_Nascimento_Valido()
        {
            string dataNascimentoValido = "01/01/2000";

            DataNascimento e = new(dataNascimentoValido);

            Assert.Equal("2000-01-01", e.asString());
        }


    }
}
