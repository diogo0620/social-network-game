using System.Threading.Tasks;
using System.Collections.Generic;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Ligacoes;
using MDR.Utils;
using System;
using MDR.Mappers;

namespace MDR.Domain.PedidosIntroducao
{
    public class PedidoIntroducaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPedidoIntroducaoRepository _repo;
        private readonly UtilizadorService _utilizadorService;
        private readonly PedidoLigacaoService _pedidoLigacaoService;

        private readonly LigacaoService _ligacaoService;

        public PedidoIntroducaoService(IUnitOfWork unitOfWork, IPedidoIntroducaoRepository repo, UtilizadorService utiService, PedidoLigacaoService pedidoLigacaoService, LigacaoService ligacaoService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._utilizadorService = utiService;
            this._pedidoLigacaoService = pedidoLigacaoService;
            this._ligacaoService = ligacaoService;
        }

        public async Task<List<PedidoIntroducaoDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<PedidoIntroducaoDTO> listDto = list.ConvertAll<PedidoIntroducaoDTO>(ped => PedidoIntroducaoMapper.domainToDTO(ped, _utilizadorService).Result);

            return listDto;
        }

        public async Task<List<PedidoIntroducaoDTO>> GetByParaUtilizadorAsync(UtilizadorId para)
        {
            var list = await this._repo.GetByParaUtilizadorAsync(para);

            List<PedidoIntroducaoDTO> listDto = list.ConvertAll<PedidoIntroducaoDTO>(ped => PedidoIntroducaoMapper.domainToDTO(ped, _utilizadorService).Result);

            return listDto;
        }

        public async Task<PedidoIntroducaoDTO> GetByIdAsync(PedidoIntroducaoId id)
        {
            var ped = await this._repo.GetByIdAsync(id);

            if (ped == null)
                return null;

            return await PedidoIntroducaoMapper.domainToDTO(ped, _utilizadorService);
        }

        public async Task<PedidoIntroducaoDTO> GetByParaUtilizador_E_IdAsync(UtilizadorId para, PedidoIntroducaoId id)
        {
            var ped = await this._repo.GetByIdAsync(id);

            if (ped == null || !ped.ParaUtilizador.Equals(para))
                return null;

            return await PedidoIntroducaoMapper.domainToDTO(ped, _utilizadorService);
        }

        public async Task<PedidoIntroducaoDTO> AddAsync(CriarPedidoIntroducaoDTO dto)
        {
            try
            {
                UtilizadorId idA = dto.DeUtilizadorId == null ? null : new UtilizadorId(dto.DeUtilizadorId);
                UtilizadorId idB = dto.ParaUtilizadorId == null ? null : new UtilizadorId(dto.ParaUtilizadorId);
                UtilizadorId idC = dto.UtilizadorObjetivoId == null ? null : new UtilizadorId(dto.UtilizadorObjetivoId);

                Console.WriteLine(idA.AsString());
                Console.WriteLine(idB.AsString());
                Console.WriteLine(idC.AsString());


                if (await this._utilizadorService.GetByIdAsync(idA) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador A não existe ou não foi especificado.");
                }

                if (await this._utilizadorService.GetByIdAsync(idB) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador B não existe ou não foi especificado.");
                }

                if (await this._utilizadorService.GetByIdAsync(idC) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador C não existe ou não foi especificado.");
                }


                if (await this._ligacaoService.GetByUtilizadoresAsync(idA, idB) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador não pode fazer um pedido de introdução a alguém que não é amigo.");
                }

                if (await this._ligacaoService.GetByUtilizadoresAsync(idB, idC) == null)
                {
                    throw new BusinessRuleValidationException("Este pedido de introdução não é valido, pois o utilizador B não é amigo do utilizador C.");
                }

                if (await this._ligacaoService.GetByUtilizadoresAsync(idA, idC) != null)
                {
                    throw new BusinessRuleValidationException("Os utilizadores A e C já são amigos.");
                }



                List<Tag> tagsList = new List<Tag>();
                if (dto.Tags != null)
                {
                    dto.Tags.ForEach(t => tagsList.Add(new Tag(t)));
                }



                var ped = new PedidoIntroducao(idA, idB, idC, dto.ForcaLigacao == 0 ? null : new ForcaLigacao(dto.ForcaLigacao), tagsList, dto.MensagemIntroducao == null ? null : new MensagemIntroducao(dto.MensagemIntroducao), dto.MensagemLigacao == null ? null : new MensagemLigacao(dto.MensagemLigacao));

                await this._repo.AddAsync(ped);

                await this._unitOfWork.CommitAsync();

                return await PedidoIntroducaoMapper.domainToDTO(ped, _utilizadorService);
            }
            catch (System.FormatException)
            {
                throw new BusinessRuleValidationException("Pelo menos um dos ids de utilizador é inválido.");
            }
        }

        public async Task<PedidoIntroducaoDTO> UpdateAsync(EditarPedidoIntroducaoDTO dto, UtilizadorId para)
        {
            var lig = await this._repo.GetByIdAsync(new PedidoIntroducaoId(dto.Id));

            if (lig == null || lig.ParaUtilizador != para)
                return null;

            if (dto.Estado != null)
            {

                var estado = EnumsUtils.valor(typeof(EstadoPedido), dto.Estado);
                if (estado == null)
                {
                    throw new BusinessRuleValidationException("O estado do pedido " + dto.Estado + " não é valido.");
                }
                else if (((EstadoPedido)estado).Equals(EstadoPedido.ACEITE))
                {
                    List<string> tags = new List<string>();
                    lig.Tags.ForEach(t => tags.Add(t.value));

                    await this._pedidoLigacaoService.AddSync(new CriarPedidoLigacaoDTO { DeUtilizadorId = lig.DeUtilizador.AsString(), ParaUtilizadorId = lig.UtilizadorObjetivo.AsString(), Mensagem = lig.MensagemLigacao == null ? null : lig.MensagemLigacao.value, ForcaLigacao = lig.ForcaLigacao.valor, Tags = tags });

                    lig.aceitar();
                }
                else
                {
                    lig.recusar();
                }
            }


            await this._unitOfWork.CommitAsync();

            return await PedidoIntroducaoMapper.domainToDTO(lig, _utilizadorService);
        }
        public async Task<PedidoIntroducaoDTO> DeleteAsync(PedidoIntroducaoId id)
        {
            var ligacao = await this._repo.GetByIdAsync(id);

            if (ligacao == null)
                return null;


            this._repo.Remove(ligacao);
            await this._unitOfWork.CommitAsync();

            return await PedidoIntroducaoMapper.domainToDTO(ligacao, _utilizadorService);
        }

        public async Task<int> DeleteAllWithUtilizadorSync(UtilizadorId utilizador)
        {
            return await this._repo.RemoveAllByUtilizador(utilizador);
        }

    }
}