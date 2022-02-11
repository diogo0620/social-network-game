using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MDR.Domain.Shared;
using MDR.Infrastructure.Shared;

namespace MDR.Infrastructure.Ligacoes
{
    public class LigacaoRepository : BaseRepository<Ligacao, LigacaoId>, ILigacaoRepository
    {

        public LigacaoRepository(MDRDbContext context) : base(context.Ligacoes)
        {

        }
        public async Task<List<Ligacao>> GetLigacoesRedeAsync(UtilizadorId id)
        {
            return await _objs.Where(u => (u.UtilizadorA.Equals(id) || u.UtilizadorB.Equals(id))).ToListAsync();
        }

        public async Task<Ligacao> GetByUtilizadoresAsync(UtilizadorId u1, UtilizadorId u2)
        {
            return await _objs.Where(l => l.UtilizadorA.Equals(u1) && l.UtilizadorB.Equals(u2)).FirstOrDefaultAsync();
        }

        public async Task<List<Ligacao>> GetByUtilizadorAAsync(UtilizadorId utilizadorA)
        {
            return await _objs.Where(u => (u.UtilizadorA.Equals(utilizadorA))).ToListAsync();
        }


        public async Task<int> RemoveAllByUtilizador(UtilizadorId utilizador)
        {
            var ligacoes = await _objs.Where(l => (l.UtilizadorA.Equals(utilizador) || l.UtilizadorB.Equals(utilizador))).ToListAsync();
            _objs.RemoveRange(ligacoes);
            return ligacoes.Count;
        }

    }
}