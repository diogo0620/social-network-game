using System;
using System.Collections.Generic;

namespace MDR.Domain.Utilizadores
{
    public class UtilizadorDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Nome { get; set; }
        public string DataNascimento { get; set; }

        public string CodigoPais { get; set; }
        public string NumeroTelemovel { get; set; }
        public string LinkedIn { get; set; }
        public string Facebook { get; set; }
        public string Avatar { get; set; }
        public string Pais { get; set; }

        public string Cidade { get; set; }
        public string Descricao { get; set; }

        public List<string> Tags { get; set; }

        public string EstadoEmocional { get; set; }

        public string DataEstadoEmocional { get; set; }


    }
}