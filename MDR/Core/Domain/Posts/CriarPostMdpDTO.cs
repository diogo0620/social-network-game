using System.Collections.Generic;

namespace MDR.Domain.Posts
{
    public class CriarPostMdpDTO
    {
        public string utilizadorId { get; set; }
        public string texto { get; set; }
        public List<string> tags { get; set; }
    }
}
