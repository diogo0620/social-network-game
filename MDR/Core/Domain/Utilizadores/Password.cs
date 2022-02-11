using System;
using MDR.Domain.Shared;
using MDR.Utils;

namespace MDR.Domain.Utilizadores
{
    public class Password : IValueObject
    {


        private static int MINIMO_CARATERES = 8;
        public string value { get; private set; }

        protected Password() { }
        public Password(string password)
        {
            if (password == null)
            {
                throw new BusinessRuleValidationException("A password não pode ser null.");
            }

            if (password.Length < MINIMO_CARATERES)
            {
                throw new BusinessRuleValidationException("A password deve ter pelo menos " + MINIMO_CARATERES + " carateres.");
            }

            if (!StringsUtils.temLetraMaiscula(password))
            {
                throw new BusinessRuleValidationException("A password deve ter pelo menos uma letra maiscula.");
            }

            if (!StringsUtils.temCaraterEspecial(password))
            {
                throw new BusinessRuleValidationException("A password deve ter pelo menos um carater especial.");
            }


            this.value = password;
        }
    }

}