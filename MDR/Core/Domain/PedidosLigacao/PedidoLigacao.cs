using System;
using System.Collections.Generic;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;

namespace MDR.Domain.PedidosLigacao
{
    public class PedidoLigacao : Entity<PedidoLigacaoId>, IAggregateRoot
    {
        public MensagemLigacao MensagemLigacao { get; private set; }
        public UtilizadorId DeUtilizador { get; private set; }
        public UtilizadorId ParaUtilizador { get; private set; }
        public ForcaLigacao ForcaLigacao { get; private set; }
        public List<Tag> Tags { get; private set; }
        public EstadoPedido Estado { get; private set; }

        public DateTime Data { get; private set; }




        protected PedidoLigacao()
        {
        }

        public PedidoLigacao(UtilizadorId deUtilizador, UtilizadorId paraUtilizador, MensagemLigacao mensagem, ForcaLigacao forcaLigacao, List<Tag> tags)
        {
            if (deUtilizador == null)
            {
                throw new BusinessRuleValidationException("Um pedido de ligação deve ser feito por alguém.");
            }

            if (paraUtilizador == null)
            {
                throw new BusinessRuleValidationException("Um pedido de ligação deve ser feito para alguém.");
            }

            if (deUtilizador.Equals(paraUtilizador))
            {
                throw new BusinessRuleValidationException("Um utilizador não pode fazer um pedido de ligação a si mesmo.");
            }

            if (forcaLigacao == null)
            {
                throw new BusinessRuleValidationException("Deve especificar a força da ligação caso ela se concretize.");
            }

            if (tags == null || tags.Count == 0)
            {
                throw new BusinessRuleValidationException("Deve especificar pelo menos uma tag caso a ligação se concretize.");
            }


            this.Id = new PedidoLigacaoId(Guid.NewGuid());
            this.DeUtilizador = deUtilizador;
            this.ParaUtilizador = paraUtilizador;
            this.MensagemLigacao = mensagem;
            this.ForcaLigacao = forcaLigacao;
            this.Tags = tags;
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