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
    public class EstadoEmocionalTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Estado_Emocional_Sem_Emocao_Valida ()
        {
            string estadoEmocionalInvalido = "invalido";

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new EstadoEmocional(estadoEmocionalInvalido));
        }

        [Fact]
        public void Criacao_Estado_Emocional_Valido()
        {
            string estadoEmocionalValido = "ALEGRE";

            EstadoEmocional e = new(estadoEmocionalValido);

            Assert.Equal(estadoEmocionalValido, e.emocao.ToString());
        }


    }
}
