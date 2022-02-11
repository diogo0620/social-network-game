using System.Collections.Generic;
using System.Linq;
using MDR.Domain.Ligacoes;
using MDR.Domain.Planeamento;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class SugestaoMapper
    {
        public static List<SugestaoGrupoDTO> grupoSugestaoPlaneamentoToGrupoSugestaoDTO(SugestaoGrupoPlaneamentoDTO planeamento, UtilizadorService service)
        {
            List<SugestaoGrupoDTO> sugestoes = new List<SugestaoGrupoDTO>();

            for (var i = 0; i < planeamento.grupos.Count; i++)
            {
                List<string> utilizadoresId = planeamento.grupos.ElementAt(i);
                List<UtilizadorDTO> utilizadores = utilizadoresId.ConvertAll<UtilizadorDTO>(id => service.GetByIdAsync(new UtilizadorId(id)).Result);
                List<string> tags = planeamento.tags.ElementAt(i);
                sugestoes.Add(new SugestaoGrupoDTO { Grupo = utilizadores, TagsEmComum = tags });
            }

            return sugestoes;
        }

    }
}