using System.Collections.Generic;

namespace MDR.Domain.Planeamento
{
    public class CaminhoRecebidoDTO
    {
        public List<string> utilizadores { get; set; }
        public int numeroNos { get; set; }
        public double forcaTotal { get; set; }
        public double forcaMinima { get; set; }
    }

}