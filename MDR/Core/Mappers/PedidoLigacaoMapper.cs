using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Ligacoes;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class PedidoLigacaoMapper
    {
        public static async Task<PedidoLigacaoDTO> domainToDTO(PedidoLigacao ped, UtilizadorService service)
        {
            UtilizadorDTO utiA = await service.GetByIdAsync(ped.DeUtilizador);
            UtilizadorDTO utiB = await service.GetByIdAsync(ped.ParaUtilizador);


            string data = String.Format("{0}-{1, 0:D2}-{2, 0:D2} {3, 0:D2}:{4, 0:D2}:{5, 0:D2}", ped.Data.Year, ped.Data.Month, ped.Data.Day, ped.Data.Hour, ped.Data.Minute, ped.Data.Second);
            List<string> tagsDTO = ped.Tags.ConvertAll<string>(t => t.value);
            return new PedidoLigacaoDTO { Id = ped.Id.AsString(), DeUtilizador = utiA, ParaUtilizador = utiB, Mensagem = ped.MensagemLigacao == null ? null : ped.MensagemLigacao.value, Estado = ped.Estado.ToString(), ForcaLigacao = ped.ForcaLigacao.valor, Tags = tagsDTO, Data = data };
        }





    }
}