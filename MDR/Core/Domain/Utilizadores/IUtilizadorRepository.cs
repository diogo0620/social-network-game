using MDR.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace MDR.Domain.Utilizadores
{
    public interface IUtilizadorRepository : IRepository<Utilizador, UtilizadorId>
    {


        Task<List<Utilizador>> GetSugestoesRecemRegistadoAsync(UtilizadorId utilizador);
        Task<List<Utilizador>> GetByParametrosAsync(Email email, Nome nome, Localizacao localizacao);
        Task<Utilizador> GetByEmailEPassword(Email email, Password p);
        Task<Utilizador> GetByEmail(Email email);


    }
}