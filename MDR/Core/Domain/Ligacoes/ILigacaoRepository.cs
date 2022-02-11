using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MDR.Domain.Ligacoes
{
    public interface ILigacaoRepository : IRepository<Ligacao, LigacaoId>
    {

        Task<List<Ligacao>> GetByUtilizadorAAsync(UtilizadorId utilizadorA);
        Task<Ligacao> GetByUtilizadoresAsync(UtilizadorId u1, UtilizadorId u2);
        Task<List<Ligacao>> GetLigacoesRedeAsync(UtilizadorId id);

        Task<int> RemoveAllByUtilizador(UtilizadorId utilizador);


    }
}