using System;
using MDR.Domain.Shared;
using MDR.Utils;

namespace MDR.Domain.Utilizadores
{
    public class DataNascimento : IValueObject
    {

        private static int IDADE_MINIMA = 16;
        public DateTime value { get; private set; }

        protected DataNascimento() { }

        public DataNascimento(string dataNascimento)
        {

            DateTime data = DateTime.Parse(dataNascimento);
            if (DatasUtils.calcularIdade(data) < IDADE_MINIMA)
            {
                throw new BusinessRuleValidationException("A idade mínima para usar o sistema é " + IDADE_MINIMA + " anos.");
            }

            this.value = data;
        }

        public string asString()
        {
            return String.Format("{0}-{1, 0:D2}-{2, 0:D2}", value.Year, value.Month, value.Day);
        }

    }

}