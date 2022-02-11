using System;
using System.Collections.Generic;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Ligacoes
{
    public class LigacaoDTO
    {
        public string Id { get; set; }
        public UtilizadorDTO UtilizadorA { get; set; }
        public UtilizadorDTO UtilizadorB { get; set; }
        public int ForcaRelacao { get; set; }
        public int NumeroLikes { get; set; }
        public int NumeroDislikes { get; set; }
        public int ForcaLigacao { get; set; }
        public List<string> Tags { get; set; }
    }
}