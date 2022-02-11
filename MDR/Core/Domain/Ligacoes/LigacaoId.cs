using System;
using MDR.Domain.Shared;
using Newtonsoft.Json;

namespace MDR.Domain.Ligacoes
{
    public class LigacaoId : EntityId
    {
        [JsonConstructor]
        public LigacaoId(Guid value) : base(value)
        {
        }

        public LigacaoId(String value) : base(value)
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