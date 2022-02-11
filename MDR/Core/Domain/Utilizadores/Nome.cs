using System;
using MDR.Domain.Shared;

namespace MDR.Domain.Utilizadores
{
    public class Nome : IValueObject
    {
        public string value { get; private set; }

        protected Nome() { }

        public Nome(string nome)
        {
            if (nome == null)
            {
                throw new BusinessRuleValidationException("O nome não pode ser null.");
            }

            if (char.IsWhiteSpace(nome, 0))
            {
                throw new BusinessRuleValidationException("O nome não pode conter espaços no início.");
            }
            this.value = nome;
        }


    }

}