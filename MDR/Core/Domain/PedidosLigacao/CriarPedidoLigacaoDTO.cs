using System.Collections.Generic;



namespace MDR.Domain.PedidosLigacao
{
    public class CriarPedidoLigacaoDTO
    {
        public string DeUtilizadorId { get; set; }
        public string ParaUtilizadorId { get; set; }
        public string Mensagem { get; set; }
        public int ForcaLigacao { get; set; }
        public List<string> Tags { get; set; }
    }
}