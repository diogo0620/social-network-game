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
    public class TagTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Tag_Null ()
        {
            string TagInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Tag(TagInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Tag_Com_Menos_De_Um_Caracter ()
        {
            string TagInvalido = "";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Tag(TagInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Tag_Acima_Do_Maximo_De_Caracteres ()
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            int length = 260;
            Random random = new Random();

            string tagInvalido = new string(Enumerable.Repeat(chars, length)
                                                    .Select(s => s[random.Next(s.Length)]).ToArray());

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Tag(tagInvalido));
        }

        [Fact]
        public void Criacao_Tag_Valido()
        {
            string TagValido = "Tag Test";

            Tag e = new(TagValido);

            Assert.Equal(TagValido, e.value);
        }


    }
}
