
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Ligacoes
{
    public class InformacaoRedeDTO
    {
        public UtilizadorDTO Utilizador { get; set; }
        public int Dimensao { get; set; }
        public int Fortaleza { get; set; }
    }
}