using System.Collections.Generic;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Posts
{
    public class ReacaoDTO
    {
        public UtilizadorDTO Utilizador { get; set; }
        public string Tipo { get; set; }
        public string Data { get; set; }
    }
}