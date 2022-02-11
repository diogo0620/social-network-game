using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class PerfilFacebook : IValueObject
    {
        public string url { get; private set; }

        protected PerfilFacebook() { }

        public PerfilFacebook(string url)
        {
            if (url == null)
            {
                throw new BusinessRuleValidationException("O perfil Facebook precisa de url.");
            }

            this.url = url;
        }
    }

}