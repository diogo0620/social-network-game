using System;
using MDR.Domain.Shared;

namespace MDR.Domain.PedidosLigacao
{

    public class MensagemLigacao : IValueObject
    {
        public string value { get; private set; }

        protected MensagemLigacao() { }
        public MensagemLigacao(string mensagem)
        {
            this.value = mensagem;
        }
    }

}