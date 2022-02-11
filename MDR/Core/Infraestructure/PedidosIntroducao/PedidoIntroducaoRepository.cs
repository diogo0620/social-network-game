using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MDR.Domain.PedidosIntroducao;
using MDR.Domain.Utilizadores;
using MDR.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDR.Infrastructure.PedidosIntroducao
{
    public class PedidoIntroducaoRepository : BaseRepository<PedidoIntroducao, PedidoIntroducaoId>, IPedidoIntroducaoRepository
    {

        public PedidoIntroducaoRepository(MDRDbContext context) : base(context.PedidosIntroducao)
        {

        }

        async Task<List<PedidoIntroducao>> IPedidoIntroducaoRepository.GetByParaUtilizadorAsync(UtilizadorId para)
        {
            return await this._objs
                .Where(x => (x.ParaUtilizador.Equals(para))).ToListAsync();
        }

        public async Task<int> RemoveAllByUtilizador(UtilizadorId utilizador)
        {
            var ligacoes = await _objs.Where(l => (l.DeUtilizador.Equals(utilizador) || l.ParaUtilizador.Equals(utilizador) || l.UtilizadorObjetivo.Equals(utilizador))).ToListAsync();
            _objs.RemoveRange(ligacoes);
            return ligacoes.Count;
        }
    }
}