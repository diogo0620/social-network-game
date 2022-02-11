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
    public class LocalizacaoTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Localizacao_Sem_Cidade_Ou_Pais ()
        {
            string paisInvalido = null;
            string cidadeInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Localizacao(paisInvalido, cidadeInvalido));
        }

        [Fact]
        public void Criacao_Localizacao_Valido()
        {
            string paisValido = "Portugal";
            string cidadeValido = "Porto";

            Localizacao e1 = new(paisValido,null);
            Localizacao e2 = new(null,cidadeValido);
            Localizacao e3 = new(paisValido,cidadeValido);

            Assert.Equal(paisValido, e1.asString());
            Assert.Equal(cidadeValido, e2.asString());
            Assert.Equal(cidadeValido + ", " + paisValido, e3.asString());
        }


    }
}
