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
    public class AvatarTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Avatar_Null ()
        {
            string avatarInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Avatar(avatarInvalido));
        }

        [Fact]
        public void Criacao_Avatar_Valido()
        {
            string avatarValido = "avatar.png";

            Avatar e = new(avatarValido);

            Assert.Equal(avatarValido, e.value);
        }


    }
}
