using System.Collections.Generic;

namespace MDR.Domain.PedidosIntroducao
{
    public class CriarPedidoIntroducaoDTO
    {
        public string DeUtilizadorId { get; set; }
        public string ParaUtilizadorId { get; set; }
        public string UtilizadorObjetivoId { get; set; }
        public int ForcaLigacao { get; set; }
        public List<string> Tags { get; set; }
        public string MensagemIntroducao { get; set; }
        public string MensagemLigacao { get; set; }


    }
}