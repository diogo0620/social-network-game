using System;
using MDR.Domain.Shared;

namespace MDR.Domain.Ligacoes
{
    public class ForcaRelacao : IValueObject
    {

        public int likes { get; private set; }

        public int dislikes { get; private set; }
        public ForcaRelacao()
        {
            this.likes = 0;
            this.dislikes = 0;
        }

        public ForcaRelacao(int likes, int dislikes)
        {
            this.likes = likes;
            this.dislikes = dislikes;
        }

        public int valor()
        {
            return likes - dislikes;
        }

    }

}