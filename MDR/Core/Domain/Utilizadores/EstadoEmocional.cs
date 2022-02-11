using System;
using MDR.Domain.Shared;
using MDR.Utils;


namespace MDR.Domain.Utilizadores
{
    public class EstadoEmocional : IValueObject
    {
        public Emocao emocao { get; private set; }
        public DateTime desde { get; private set; }

        protected EstadoEmocional() { }
        public EstadoEmocional(string emocao)
        {

            var em = EnumsUtils.valor(typeof(Emocao), emocao);

            if (em == null)
            {
                throw new BusinessRuleValidationException("A emoção " + emocao + " não é uma das emoções válidas.");
            }

            this.emocao = (Emocao)em;
            this.desde = DateTime.Now;

        }


        public string asString()
        {
            return StringsUtils.capitalizarInicial(emocao.ToString());
        }
    }

}