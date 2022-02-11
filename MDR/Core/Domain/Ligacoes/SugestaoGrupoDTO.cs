using System.Collections.Generic;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Ligacoes
{
    public class SugestaoGrupoDTO
    {
        public List<UtilizadorDTO> Grupo { get; set; }
        public List<string> TagsEmComum { get; set; }
    }
}