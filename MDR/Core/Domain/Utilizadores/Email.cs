using System;
using MDR.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDR.Domain.Utilizadores
{
    public class Email : IValueObject
    {
        private static Regex emailRegex = new Regex(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", RegexOptions.CultureInvariant | RegexOptions.Singleline);
        public string value { get; private set; }

        protected Email() { }
        public Email(string email)
        {
            if (!emailRegex.IsMatch(email))
            {
                throw new BusinessRuleValidationException("O email " + email + " não é válido.");
            }

            this.value = email;
        }

        public override bool Equals(Object obj)
        {
            //Check for null and compare run-time types.
            if ((obj == null) || !this.GetType().Equals(obj.GetType()))
            {
                return false;
            }
            else
            {
                Email e = (Email)obj;
                return this.value.Equals(e.value);
            }
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }
    }

}