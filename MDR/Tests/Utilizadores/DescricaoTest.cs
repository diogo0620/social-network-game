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
    public class DescricaoTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Descricao_Null ()
        {
            string descricaoInvalido = null;

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Descricao(descricaoInvalido));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Descricao_Com_Mais_De_Quatro_Mil_Caracteres()
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            int length = 4100;
            Random random = new Random();

            string descricaoInvalido = new string(Enumerable.Repeat(chars, length)
                                                    .Select(s => s[random.Next(s.Length)]).ToArray());


            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Descricao(descricaoInvalido));
        }

        [Fact]
        public void Criacao_Descricao_Valido()
        {
            string descricaoValido = "descrição de teste";

            Descricao e = new(descricaoValido);

            Assert.Equal(descricaoValido, e.value);
        }


    }
}
