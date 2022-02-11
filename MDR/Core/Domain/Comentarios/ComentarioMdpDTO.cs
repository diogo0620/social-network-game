using System;
using System.Collections.Generic;
using MDR.Domain.Posts;

namespace MDR.Domain.Comentarios
{
    public class ComentarioMdpDTO
    {
        public string _id { get; set; }
        public string postId { get; set; }
        public string utilizadorId { get; set; }
        public string texto { get; set; }
        public List<string> tags { get; set; }
        public string data { get; set; }

        public List<ReacaoMdpDTO> reacoes { get; set; }
    }
}
