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
    public class PasswordTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Password_Null ()
        {
            string passwordInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Password(passwordInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Password_Com_Menos_De_Oito_Caracteres ()
        {
            string passwordInvalido = "Jos@2";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Password(passwordInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Password_Sem_Uma_Letra_Maiscula ()
        {
            string passwordInvalido = "jose1234_";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Password(passwordInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Password_Sem_Um_Caractere_Especial ()
        {
            string passwordInvalido = "Jose1234";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Password(passwordInvalido));
        }

        [Fact]
        public void Criacao_Password_Valido()
        {
            string passwordValido = "Jose1234_";

            Password e = new(passwordValido);

            Assert.Equal(passwordValido, e.value);
        }


    }
}
