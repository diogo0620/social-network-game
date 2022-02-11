using System;
using MDR.Domain.Utilizadores;
using System.Collections.Generic;

namespace MDR.Domain.PedidosLigacao
{
    public class PedidoLigacaoDTO
    {
        public string Id { get; set; }
        public UtilizadorDTO DeUtilizador { get; set; }
        public UtilizadorDTO ParaUtilizador { get; set; }
        public string Mensagem { get; set; }
        public string Estado { get; set; }
        public List<string> Tags { get; set; }
        public int ForcaLigacao { get; set; }

        public string Data { get; set; }
    }

}