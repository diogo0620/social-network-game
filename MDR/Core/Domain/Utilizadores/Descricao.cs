using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class Descricao : IValueObject
    {

        private static int MAXIMO_CARATERES = 4000;
        public string value { get; private set; }

        protected Descricao() { }

        public Descricao(string descricao)
        {
            if (descricao == null)
            {
                throw new BusinessRuleValidationException("A descrição não deve ser null.");
            }

            if (descricao.Length > MAXIMO_CARATERES)
            {
                throw new BusinessRuleValidationException("A descrição não pode conter mais de " + MAXIMO_CARATERES + " carateres.");
            }
            this.value = descricao;
        }
    }

}