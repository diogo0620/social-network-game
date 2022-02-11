using System.Collections.Generic;

namespace MDR.Domain.Ligacoes
{
    public class CriarLigacaoDTO
    {
        public string UtilizadorAId { get; set; }
        public string UtilizadorBId { get; set; }
        public int ForcaLigacao { get; set; }
        public List<string> Tags { get; set; }
    }
}