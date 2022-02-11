using System;
using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class Telefone : IValueObject
    {

        private static int MINIMO_DIGITOS_NUMERO = 4;
        private static int MAXIMO_DIGITOS_NUMERO = 11;
        public string codigoPais { get; set; }
        public string numero { get; set; }

        protected Telefone() { }

        public Telefone(string codigoPais, string numero)
        {
            if (codigoPais == null)
            {
                throw new BusinessRuleValidationException("O número de telemóvel deve ter o código do país.");
            }

            int numeroDigitos = numero == null ? 0 : numero.Length;

            if (numeroDigitos < MINIMO_DIGITOS_NUMERO)
            {
                throw new BusinessRuleValidationException("O número de telemóvel deve ter pelo menos " + MINIMO_DIGITOS_NUMERO + " dígitos.");
            }

            if (numeroDigitos > MAXIMO_DIGITOS_NUMERO)
            {
                throw new BusinessRuleValidationException("O número de telemóvel deve ter no máximo " + MAXIMO_DIGITOS_NUMERO + " dígitos.");
            }

            this.codigoPais = codigoPais;
            this.numero = numero;
        }

        public string asString()
        {
            return "+" + codigoPais + " " + numero;
        }
    }
}