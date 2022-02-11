using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.PedidosIntroducao;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class PedidoIntroducaoMapper
    {
        public static async Task<PedidoIntroducaoDTO> domainToDTO(PedidoIntroducao ped, UtilizadorService service)
        {
            UtilizadorDTO utiA = await service.GetByIdAsync(ped.DeUtilizador);
            UtilizadorDTO utiB = await service.GetByIdAsync(ped.ParaUtilizador);
            UtilizadorDTO utiObjetivo = await service.GetByIdAsync(ped.UtilizadorObjetivo);




            string data = String.Format("{0}-{1, 0:D2}-{2, 0:D2} {3, 0:D2}:{4, 0:D2}:{5, 0:D2}", ped.Data.Year, ped.Data.Month, ped.Data.Day, ped.Data.Hour, ped.Data.Minute, ped.Data.Second);
            return new PedidoIntroducaoDTO { Id = ped.Id.AsString(), DeUtilizador = utiA, ParaUtilizador = utiB, UtilizadorObjetivo = utiObjetivo, Estado = ped.Estado.ToString(), Mensagem = ped.MensagemIntroducao == null ? null : ped.MensagemIntroducao.value, Data = data };
        }





    }
}