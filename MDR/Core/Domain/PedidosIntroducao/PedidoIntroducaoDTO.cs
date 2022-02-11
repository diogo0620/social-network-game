using System;
using System.Collections.Generic;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.PedidosIntroducao
{
    public class PedidoIntroducaoDTO
    {
        public string Id { get; set; }
        public UtilizadorDTO DeUtilizador { get; set; }
        public UtilizadorDTO ParaUtilizador { get; set; }
        public UtilizadorDTO UtilizadorObjetivo { get; set; }
        public string Mensagem { get; set; }
        public string Estado { get; set; }

        public string Data { get; set; }
    }
}