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
    public class UtilizadorTest
    {
        [Fact]
        public void Nao_E_Possivel_Criar_Utilizador_Sem_Email ()
        {

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Utilizador(null, new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag>{new Tag("Tag test")}, new EstadoEmocional("ALEGRE")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Utilizador_Sem_Estado_Emocional ()
        {

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Utilizador(new Email("test@gmail.com"), new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag>{new Tag("Tag test")}, null));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Utilizador_Sem_Password ()
        {

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Utilizador(new Email("test@gmail.com"), null, null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag>{new Tag("Tag test")}, new EstadoEmocional("ALEGRE")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Utilizador_Sem_Data_Nascimento ()
        {

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Utilizador(new Email("test@gmail.com"), new Password("Test123_"), null, null, null, null, null, null, null, null, new List<Tag>{new Tag("Tag test")}, new EstadoEmocional("ALEGRE")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Utilizador_Sem_Tag ()
        {

            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new Utilizador(new Email("test@gmail.com"), new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, null, new EstadoEmocional("ALEGRE")));
            Assert.Throws<BusinessRuleValidationException>(() => new Utilizador(new Email("test@gmail.com"), new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag>{}, new EstadoEmocional("ALEGRE")));
        }

        [Fact]
        public void Criacao_Utilizador_Valido()
        {
            Utilizador utilizadorValido = new(new Email("test@gmail.com"), new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag>{new Tag("Tag test")}, new EstadoEmocional("ALEGRE"));
        }


    }
}