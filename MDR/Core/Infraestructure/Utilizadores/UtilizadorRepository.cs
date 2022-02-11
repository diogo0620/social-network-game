using MDR.Domain.Utilizadores;
using MDR.Infrastructure.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MDR.Domain.Ligacoes;
using MDR.Domain.PedidosLigacao;
using MDR.Infrastructure.Ligacoes;

namespace MDR.Infrastructure.Utilizadores
{
    public class UtilizadorRepository : BaseRepository<Utilizador, UtilizadorId>, IUtilizadorRepository
    {



        public UtilizadorRepository(MDRDbContext context) : base(context.Utilizadores)
        {
        }

        public async Task<List<Utilizador>> GetByParametrosAsync(Email email, Nome nome, Localizacao localizacao)
        {
            return await _objs.Where(u => (email == null || email.value.Equals(u.Email.value)) && (nome == null || u.Nome != null && (nome.value.ToLower().Equals(u.Nome.value.ToLower())) || u.Nome.value.ToLower().Contains(nome.value.ToLower())) && (localizacao == null || (u.Localizacao != null && (localizacao.cidade == null && localizacao.pais != null && localizacao.pais.Equals(u.Localizacao.pais) || localizacao.pais == null && localizacao.cidade != null && localizacao.cidade.Equals(u.Localizacao.cidade) || localizacao.pais != null && localizacao.cidade != null && localizacao.pais.Equals(u.Localizacao.pais) && localizacao.cidade.Equals(u.Localizacao.cidade))))).ToListAsync();
        }

        public async Task<List<Utilizador>> GetSugestoesRecemRegistadoAsync(UtilizadorId uti)
        {
            return await _objs.Where(u => !u.Id.Equals(uti)).ToListAsync();
        }

        public async Task<Utilizador> GetByEmailEPassword(Email email, Password p)
        {
            email.value.ToLower();
            return await _objs.Where(u => email.value.Equals(u.Email.value) && p.value.Equals(u.Password.value)).FirstOrDefaultAsync();
        }

        public async Task<Utilizador> GetByEmail(Email email)
        {
            return await _objs.Where(u => email.value.Equals(u.Email.value)).FirstOrDefaultAsync();
        }





    }
}