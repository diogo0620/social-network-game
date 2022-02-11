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
    public class EmailTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Email_Sem_Arroba ()
        {
            string emailInvalido = "abcddhotmail.com";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Email(emailInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Email_Sem_Dominio()
        {
            string emailInvalido = "abcdd@hotmail";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Email(emailInvalido));
        }

        [Fact]
        public void Criacao_Email_Valido()
        {
            string emailValido = "abcd@hotmail.com";

            Email e = new(emailValido);

            Assert.Equal(emailValido, e.value);
        }


    }
}
