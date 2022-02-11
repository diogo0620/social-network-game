using System.Threading.Tasks;
using MDR.Domain.Posts;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class ReacaoMapper
    {
        public static async Task<ReacaoDTO> mdpToDTO(ReacaoMdpDTO reacao, UtilizadorService service)
        {
            UtilizadorDTO uti = await service.GetByIdAsync(new UtilizadorId(reacao.utilizadorId));



            return new ReacaoDTO { Utilizador = uti, Tipo = reacao.tipo, Data = reacao.data };
        }
    }
}