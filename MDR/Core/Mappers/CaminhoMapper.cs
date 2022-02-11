using System.Collections.Generic;
using System.Linq;
using MDR.Domain.Ligacoes;
using MDR.Domain.Planeamento;
using MDR.Domain.Utilizadores;
using System;

namespace MDR.Mappers
{
    public class CaminhoMapper
    {
        public static CaminhoDTO recebidoToDTO(CaminhoRecebidoDTO dto, LigacaoService ligacaoService)
        {


            var numeroNos = dto.utilizadores.Count;
            var forcaLigacaoTotal = 0;
            var forcaRelacaoTotal = 0;

            List<LigacaoDTO> ligacoes = new List<LigacaoDTO>();
            for (var i = 0; i < dto.utilizadores.Count - 1; i++)
            {
                var ligacao = ligacaoService.GetByUtilizadoresAsync(new UtilizadorId(dto.utilizadores.ElementAt(i)), new UtilizadorId(dto.utilizadores.ElementAt(i + 1))).Result;
                forcaLigacaoTotal = forcaLigacaoTotal + ligacao.ForcaLigacao;
                forcaRelacaoTotal = forcaRelacaoTotal + ligacao.ForcaRelacao;
                ligacoes.Add(ligacao);
            }

            return new CaminhoDTO { ligacoes = ligacoes, numeroNos = numeroNos, forcaLigacaoTotal = forcaLigacaoTotal, forcaRelacaoTotal = forcaRelacaoTotal, custoMinimo = dto.forcaMinima, custoTotal = dto.forcaTotal };
        }

    }
}