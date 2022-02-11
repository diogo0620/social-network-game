using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class Avatar : IValueObject
    {
        public string value { get; private set; }

        protected Avatar() { }

        public Avatar(string nome)
        {
            if (nome == null)
            {
                throw new BusinessRuleValidationException("É necessário especificar qual o ficheiro a usar para o avatar.");
            }

            this.value = nome;
        }
    }

}