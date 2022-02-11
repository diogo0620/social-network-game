using System;
using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class Tag : IValueObject
    {

        private static int MINIMO_CARATERES = 1;
        private static int MAXIMO_CARATERES = 255;
        public string value { get; private set; }
        protected Tag() { }
        public Tag(string tag)
        {
            if (tag == null)
            {
                throw new BusinessRuleValidationException("O valor da tag não pode ser null.");
            }

            if (tag.Length < MINIMO_CARATERES)
            {
                throw new BusinessRuleValidationException("A tag de interesse deve ter pelo menos " + MINIMO_CARATERES + " carater(es).");
            }

            if (tag.Length > MAXIMO_CARATERES)
            {
                throw new BusinessRuleValidationException("A tag de interesse deve ter menos de  " + MAXIMO_CARATERES + " carateres.");
            }

            this.value = tag;
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
                Tag t = (Tag)obj;
                return this.value.Equals(t.value, StringComparison.OrdinalIgnoreCase);
            }
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }
    }

}