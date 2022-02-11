using System;
using MDR.Domain.Shared;

namespace MDR.Domain.Ligacoes
{
    public class ForcaLigacao : IValueObject
    {

        private static int VALOR_MINIMO = 1;
        private static int VALOR_MAXIMO = 100;
        public int valor { get; private set; }

        protected ForcaLigacao() { }
        public ForcaLigacao(int forca)
        {
            if (forca > VALOR_MAXIMO || forca < VALOR_MINIMO)
            {
                throw new BusinessRuleValidationException("A força de uma ligação só aceita valores compreendidos entre " + VALOR_MINIMO + " e " + VALOR_MAXIMO + ".");
            }
            this.valor = forca;
        }
    }

}