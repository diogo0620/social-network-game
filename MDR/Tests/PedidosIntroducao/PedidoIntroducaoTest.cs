using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MDR.Domain.PedidosIntroducao;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;
using MDR.Domain.Shared;
using Xunit;

namespace Tests.PedidosIntroducao
{
    public class PedidoIntroducaoTest { 

        private static UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
        private static UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
        private static UtilizadorId u3 = new UtilizadorId("12345678-1234-1234-1234-111111111113");
        private static List<string> tags = new List<string> { "abc" };

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Origem ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (null, u2, u3, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Destino ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (u1, u2, null, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Solicitado ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (u1, null, u3, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_A_Si_Mesmo ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (u1, u1, u3, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (u1, u2, u1, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Forca_Ligacao ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (u1, u2, u3, null, tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
        }

        [Fact]
        public void Nao_E_Possivel_Criar_Pedido_Sem_Tags ()
        {
            // act & assert
            Assert.Throws<BusinessRuleValidationException>(() => new PedidoIntroducao (u1, u2, u3, new ForcaLigacao(4), null, new MensagemIntroducao("teste"), new MensagemLigacao("teste")));
        }


        [Fact]
        public void Criacao_Pedido_Valido()
        {
            PedidoIntroducao pedidoValido = new(u1, u2, u3, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste"));
        }


    }
}