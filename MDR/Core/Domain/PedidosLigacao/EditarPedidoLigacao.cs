using System.Collections.Generic;

namespace MDR.Domain.PedidosLigacao
{
    public class EditarPedidoLigacaoDTO
    {
        public string Id { get; set; }

        public int ForcaLigacao { get; set; }

        public List<string> Tags { get; set; }
        public string Estado { get; set; }
    }
}