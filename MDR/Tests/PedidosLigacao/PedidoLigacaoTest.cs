using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;
using MDR.Domain.Shared;
using Xunit;

namespace Tests.PedidosLigacao
{
    public class PedidoLigacaoTest { 

        private static UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
        private static UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
        private static List<string> tags = new List<string> { "abc" };

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Origem ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoLigacao (null, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList()));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Destino ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoLigacao (u1, null, new MensagemLigacao("teste"), new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList()));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_A_Si_Mesmo ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoLigacao (u1, u1, new MensagemLigacao("teste"), new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList()));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Forca_Ligacao ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoLigacao (u1, u2, new MensagemLigacao("teste"), null, tags.ConvertAll<Tag>(t => new Tag(t)).ToList()));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Tags ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoLigacao (u1, null, new MensagemLigacao("teste"), new ForcaLigacao(4), null));
        }


        [Fact]
        public void Criacao_Pedido_Valido()
        {
            PedidoLigacao pedidoValido = new(u1, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList());
        }


    }
}