using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class Localizacao : IValueObject
    {
        public string pais { get; private set; }
        public string cidade { get; private set; }

        protected Localizacao() { }

        public Localizacao(string pais, string cidade)
        {
            if (pais == null && cidade == null)
            {
                throw new BusinessRuleValidationException("A localização precisa de um país ou de uma cidade.");
            }

            this.pais = pais;
            this.cidade = cidade;
        }

        public string asString()
        {
            if (pais != null && cidade != null)
            {
                return cidade + ", " + pais;
            }

            if (pais == null)
            {
                return cidade;
            }

            return pais;
        }
    }

}