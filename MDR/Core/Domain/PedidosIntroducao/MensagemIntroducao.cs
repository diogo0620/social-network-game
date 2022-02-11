using System;
using MDR.Domain.Shared;
using System.Text.RegularExpressions;

namespace MDR.Domain.PedidosIntroducao
{
    public class MensagemIntroducao : IValueObject
    {
        public string value { get; private set; }

        protected MensagemIntroducao() { }
        public MensagemIntroducao(string mensagemIntroducao)
        {
            this.value = mensagemIntroducao;
        }
    }

}