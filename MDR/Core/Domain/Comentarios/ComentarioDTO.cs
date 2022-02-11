using System.Collections.Generic;
using MDR.Domain.Posts;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Comentarios
{
    public class ComentarioDTO
    {
        public string Id { get; set; }
        public string IdPost { get; set; }
        public UtilizadorDTO Utilizador { get; set; }
        public string Texto { get; set; }
        public List<string> Tags { get; set; }
        public string Data { get; set; }

        public List<ReacaoDTO> Reacoes { get; set; }



    }
}