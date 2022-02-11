using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace MDR.Domain.PedidosLigacao
{
    public interface IPedidoLigacaoRepository : IRepository<PedidoLigacao, PedidoLigacaoId>
    {

        Task<PedidoLigacao> GetByParaUtilizador_E_IdAsync(UtilizadorId para, PedidoLigacaoId id);
        Task<List<PedidoLigacao>> GetByParaUtilizadorAsync(UtilizadorId para);
        Task<List<PedidoLigacao>> GetByParaUtilizador_E_EstadoAsync(UtilizadorId para, EstadoPedido estado);
        Task<PedidoLigacao> GetByUtilizadores_E_EstadoAsync(UtilizadorId idA, UtilizadorId idB, EstadoPedido estado);
        Task<List<PedidoLigacao>> GetByDeUtilizadorAsync(UtilizadorId de);

        Task<int> RemoveAllByUtilizador(UtilizadorId utilizador);


    }
}