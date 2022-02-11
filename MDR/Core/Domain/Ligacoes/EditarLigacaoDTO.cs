using System.Collections.Generic;

namespace MDR.Domain.Ligacoes
{
    public class EditarLigacaoDTO
    {
        public string Id { get; set; }
        public int ForcaLigacao { get; set; }
        public List<string> Tags { get; set; }
    }
}