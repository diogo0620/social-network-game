using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.PedidosIntroducao
{
    public interface IPedidoIntroducaoRepository : IRepository<PedidoIntroducao, PedidoIntroducaoId>
    {


        Task<List<PedidoIntroducao>> GetByParaUtilizadorAsync(UtilizadorId para);

        Task<int> RemoveAllByUtilizador(UtilizadorId utilizador);
    }
}