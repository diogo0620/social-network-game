using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class PerfilLinkedIn : IValueObject
    {
        public string url { get; private set; }

        protected PerfilLinkedIn() { }

        public PerfilLinkedIn(string url)
        {
            if (url == null)
            {
                throw new BusinessRuleValidationException("O perfil LinkedIn precisa de url.");
            }

            this.url = url;
        }
    }

}