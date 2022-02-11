using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class LigacaoMapper
    {
        public static async Task<LigacaoDTO> domainToDTO(Ligacao lig, UtilizadorService service)
        {
            List<string> tagsDTO = new List<string>();
            lig.Tags.ForEach(t => tagsDTO.Add(t.value));

            UtilizadorDTO utiA = await service.GetByIdAsync(lig.UtilizadorA);
            UtilizadorDTO utiB = await service.GetByIdAsync(lig.UtilizadorB);


            return new LigacaoDTO { Id = lig.Id.AsString(), UtilizadorA = utiA, UtilizadorB = utiB, ForcaRelacao = lig.ForcaRelacao.valor(), NumeroLikes = lig.ForcaRelacao.likes, NumeroDislikes = lig.ForcaRelacao.dislikes, ForcaLigacao = lig.ForcaLigacao.valor, Tags = tagsDTO };
        }





    }
}