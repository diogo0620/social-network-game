using System.Collections.Generic;
using MDR.Domain.Ligacoes;

namespace MDR.Domain.Planeamento
{
    public class CaminhoDTO
    {
        public List<LigacaoDTO> ligacoes { get; set; }
        public int numeroNos { get; set; }
        public int forcaLigacaoTotal { get; set; }
        public int forcaRelacaoTotal { get; set; }
        public double custoMinimo { get; set; }
        public double custoTotal { get; set; }
    }

}