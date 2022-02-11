using System.Collections.Generic;

namespace MDR.Domain.Comentarios
{
    public class CriarComentarioMdpDTO
    {
        public string postId { get; set; }
        public string utilizadorId { get; set; }
        public string texto { get; set; }
        public List<string> tags { get; set; }


    }
}
