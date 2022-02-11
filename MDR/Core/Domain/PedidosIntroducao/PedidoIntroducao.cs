using System;
using System.Collections.Generic;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;
using MDR.Domain.PedidosLigacao;

namespace MDR.Domain.PedidosIntroducao
{
    public class PedidoIntroducao : Entity<PedidoIntroducaoId>, IAggregateRoot
    {


        public UtilizadorId DeUtilizador { get; private set; }
        public UtilizadorId ParaUtilizador { get; private set; }
        public UtilizadorId UtilizadorObjetivo { get; private set; }
        public ForcaLigacao ForcaLigacao { get; private set; }
        public List<Tag> Tags { get; private set; }
        public MensagemIntroducao MensagemIntroducao { get; private set; }
        public MensagemLigacao MensagemLigacao { get; private set; }
        public EstadoPedido Estado { get; private set; }

        public DateTime Data { get; private set; }

        protected PedidoIntroducao() { }
        public PedidoIntroducao(UtilizadorId DeUtilizador, UtilizadorId ParaUtilizador, UtilizadorId UtilizadorObjetivo,
                                ForcaLigacao ForcaLigacao, List<Tag> Tags, MensagemIntroducao mensagemIntroducao, MensagemLigacao mensagemLigacao)
        {

            if (DeUtilizador == null)
            {
                throw new BusinessRuleValidationException("Um pedido de introdução deve ser feito por alguém.");
            }

            if (ParaUtilizador == null)
            {
                throw new BusinessRuleValidationException("Um pedido de introdução deve ser solicitado a alguém.");
            }

            if (UtilizadorObjetivo == null)
            {
                throw new BusinessRuleValidationException("Um pedido de introdução deve ser introduzido a alguém.");
            }

            if (DeUtilizador.Equals(ParaUtilizador))
            {
                throw new BusinessRuleValidationException("Um utilizador não pode fazer um pedido de introdução a si mesmo.");
            }

            if (DeUtilizador.Equals(UtilizadorObjetivo))
            {
                throw new BusinessRuleValidationException("Um utilizador não pode fazer um pedido de introdução a si mesmo.");
            }

            if (ForcaLigacao == null)
            {
                throw new BusinessRuleValidationException("Deve especificar a força da ligação caso ela se concretize.");
            }

            if (Tags == null || Tags.Count == 0)
            {
                throw new BusinessRuleValidationException("Deve especificar pelo menos uma tag caso a introdução se concretize.");
            }

            this.Id = new PedidoIntroducaoId(Guid.NewGuid());
            this.DeUtilizador = DeUtilizador;
            this.ParaUtilizador = ParaUtilizador;
            this.UtilizadorObjetivo = UtilizadorObjetivo;
            this.ForcaLigacao = ForcaLigacao;
            this.Tags = Tags;
            this.MensagemIntroducao = mensagemIntroducao;
            this.MensagemLigacao = mensagemLigacao;
            this.Estado = EstadoPedido.PENDENTE;
            this.Data = DateTime.Now;
        }


        public void aceitar()
        {
            if (Estado.Equals(EstadoPedido.ACEITE))
            {
                throw new BusinessRuleValidationException("O pedido já se encontra aceite.");
            }

            if (Estado.Equals(EstadoPedido.RECUSADO))
            {
                throw new BusinessRuleValidationException("Não pode aceitar este pedido pois o mesmo já se encontra recusado.");
            }

            this.Estado = EstadoPedido.ACEITE;

        }

        public void recusar()
        {
            if (Estado.Equals(EstadoPedido.RECUSADO))
            {
                throw new BusinessRuleValidationException("O pedido já se encontra recusado.");
            }

            if (Estado.Equals(EstadoPedido.ACEITE))
            {
                throw new BusinessRuleValidationException("Não pode recusar este pedido pois o mesmo já se encontra aceite.");
            }

            this.Estado = EstadoPedido.RECUSADO;
        }



    }
}