using System;
using System.Collections.Generic;

namespace MDR.Domain.Posts
{
    public class PostMdpDTO
    {
        public string _id { get; set; }
        public string utilizadorId { get; set; }
        public string texto { get; set; }
        public List<string> tags { get; set; }
        public string data { get; set; }
        public List<ReacaoMdpDTO> reacoes { get; set; }
    }
}
