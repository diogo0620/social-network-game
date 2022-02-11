using System;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using System.Collections.Generic;

namespace MDR.Domain.Ligacoes
{
    public class Ligacao : Entity<LigacaoId>, IAggregateRoot
    {

        public UtilizadorId UtilizadorA { get; private set; }

        public UtilizadorId UtilizadorB { get; private set; }

        public ForcaLigacao ForcaLigacao { get; private set; }

        public ForcaRelacao ForcaRelacao { get; private set; }

        public List<Tag> Tags { get; private set; }

        private Ligacao()
        {
        }

        public Ligacao(UtilizadorId utiA, UtilizadorId utiB, ForcaLigacao forcaLigacao, ForcaRelacao forcaRelacao, List<Tag> tags)
        {
            if (utiA == null || utiB == null)
            {
                throw new BusinessRuleValidationException("Uma ligação requer a especificação de dois utilizadores.");
            }

            if (utiA.Equals(utiB))
            {
                throw new BusinessRuleValidationException("Não é possivel existir uma ligação consigo mesmo.");
            }


            this.Id = new LigacaoId(Guid.NewGuid());
            this.UtilizadorA = utiA;
            this.UtilizadorB = utiB;
            this.ForcaRelacao = forcaRelacao;
            alterarForcaLigacao(forcaLigacao);
            alterarTags(tags);
        }

        public void alterarForcaLigacao(ForcaLigacao forcaLigacao)
        {
            if (forcaLigacao == null)
            {
                throw new BusinessRuleValidationException("Uma ligação tem de ter uma força de ligação definida.");
            }

            this.ForcaLigacao = forcaLigacao;
        }

        public void alterarTags(List<Tag> tags)
        {
            if (tags == null || tags.Count == 0)
            {
                throw new BusinessRuleValidationException("Uma ligação tem de ter pelo menos uma tag que a caracterize.");
            }

            this.Tags = tags;
        }

        public void aumentarNumeroLikes()
        {
            this.ForcaRelacao = new ForcaRelacao(this.ForcaRelacao.likes + 1, this.ForcaRelacao.dislikes);
        }

        public void diminuirNumeroLikes()
        {
            this.ForcaRelacao = new ForcaRelacao(this.ForcaRelacao.likes - 1, this.ForcaRelacao.dislikes);
        }

        public void aumentarNumeroDislikes()
        {
            this.ForcaRelacao = new ForcaRelacao(this.ForcaRelacao.likes, this.ForcaRelacao.dislikes + 1);
        }

        public void diminuirNumeroDislikes()
        {
            this.ForcaRelacao = new ForcaRelacao(this.ForcaRelacao.likes, this.ForcaRelacao.dislikes - 1);
        }


    }
}