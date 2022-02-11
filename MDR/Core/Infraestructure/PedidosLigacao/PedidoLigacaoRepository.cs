using MDR.Domain.PedidosLigacao;
using MDR.Domain.Utilizadores;
using MDR.Infrastructure.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MDR.Domain.Shared;

namespace MDR.Infrastructure.PedidosLigacao
{
    public class PedidoLigacaoRepository : BaseRepository<PedidoLigacao, PedidoLigacaoId>, IPedidoLigacaoRepository
    {

        public PedidoLigacaoRepository(MDRDbContext context) : base(context.PedidosLigacao)
        {
        }

        public async Task<PedidoLigacao> GetByParaUtilizador_E_IdAsync(UtilizadorId para, PedidoLigacaoId id)
        {
            return await this._objs
                .Where(x => (id.Equals(x.Id) && para.Equals(x.ParaUtilizador))).FirstOrDefaultAsync();
        }

        public async Task<List<PedidoLigacao>> GetByDeUtilizadorAsync(UtilizadorId de)
        {
            return await this._objs
                .Where(x => (de.Equals(x.DeUtilizador))).ToListAsync();
        }



        public async Task<List<PedidoLigacao>> GetByParaUtilizadorAsync(UtilizadorId para)
        {
            return await this._objs
                .Where(x => (x.ParaUtilizador.Equals(para))).ToListAsync();
        }

        public async Task<List<PedidoLigacao>> GetByParaUtilizador_E_EstadoAsync(UtilizadorId para, EstadoPedido estado)
        {
            return await this._objs
                .Where(x => (x.ParaUtilizador.Equals(para) && x.Estado.Equals(estado))).ToListAsync();
        }

        public async Task<PedidoLigacao> GetByUtilizadores_E_EstadoAsync(UtilizadorId idA, UtilizadorId idB, EstadoPedido estado)
        {
            return await this._objs
                .Where(x => (idA.Equals(x.DeUtilizador) && idB.Equals(x.ParaUtilizador) && estado.Equals(x.Estado))).FirstOrDefaultAsync();
        }

        public async Task<int> RemoveAllByUtilizador(UtilizadorId utilizador)
        {
            var ligacoes = await _objs.Where(l => (l.DeUtilizador.Equals(utilizador) || l.ParaUtilizador.Equals(utilizador))).ToListAsync();
            _objs.RemoveRange(ligacoes);
            return ligacoes.Count;
        }

    }
}