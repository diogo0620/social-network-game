using System;
using MDR.Domain.Shared;
using Newtonsoft.Json;

namespace MDR.Domain.PedidosIntroducao
{
    public class PedidoIntroducaoId : EntityId
    {
        [JsonConstructor]
        public PedidoIntroducaoId(Guid value) : base(value)
        {
        }

        public PedidoIntroducaoId(String value) : base(value)
        {
        }

        override
        protected Object createFromString(String text)
        {
            return new Guid(text);
        }

        override
        public String AsString()
        {
            Guid obj = (Guid)base.ObjValue;
            return obj.ToString();
        }
        public Guid AsGuid()
        {
            return (Guid)base.ObjValue;
        }
    }
}