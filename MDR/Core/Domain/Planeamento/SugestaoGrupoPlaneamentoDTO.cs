using System.Collections.Generic;

namespace MDR.Domain.Planeamento
{
    public class SugestaoGrupoPlaneamentoDTO
    {
        public List<List<string>> grupos { get; set; }
        public List<List<string>> tags { get; set; }
    }
}