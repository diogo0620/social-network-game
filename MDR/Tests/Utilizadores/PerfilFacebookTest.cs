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
    public class PerfilFacebookTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Perfil_Facebook_Sem_URL ()
        {
            string PerfilFacebookInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PerfilFacebook(PerfilFacebookInvalido));
        }

        [Fact]
        public void Criacao_Perfil_Facebook_Valido()
        {
            string PerfilFacebookValido = "facebook.com/Jose";

            PerfilFacebook e = new(PerfilFacebookValido);

            Assert.Equal(PerfilFacebookValido, e.url);
        }


    }
}
