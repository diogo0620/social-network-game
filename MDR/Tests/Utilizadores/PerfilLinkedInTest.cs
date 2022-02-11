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
    public class PerfilLinkedInTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Perfil_Linked_In_Sem_URL ()
        {
            string PerfilLinkedInInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PerfilLinkedIn(PerfilLinkedInInvalido));
        }

        [Fact]
        public void Criacao_Perfil_Linked_In_Valido()
        {
            string PerfilLinkedInValido = "linkedin.com/Jose";

            PerfilLinkedIn e = new(PerfilLinkedInValido);

            Assert.Equal(PerfilLinkedInValido, e.url);
        }


    }
}
