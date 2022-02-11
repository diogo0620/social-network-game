using System.Threading.Tasks;
using System.Collections.Generic;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;
using MDR.Utils;
using MDR.Mappers;

namespace MDR.Domain.PedidosLigacao
{
    public class PedidoLigacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPedidoLigacaoRepository _repo;
        private readonly UtilizadorService _utilizadorService;
        private readonly LigacaoService _ligacaoService;

        public PedidoLigacaoService(IUnitOfWork unitOfWork, IPedidoLigacaoRepository repo, UtilizadorService utiService, LigacaoService ligacaoService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._utilizadorService = utiService;
            this._ligacaoService = ligacaoService;
        }


        public async Task<List<PedidoLigacaoDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<PedidoLigacaoDTO> listDto = list.ConvertAll<PedidoLigacaoDTO>(ped => PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService).Result);

            return listDto;
        }

        public async Task<PedidoLigacaoDTO> GetByIdAsync(PedidoLigacaoId id)
        {
            var ped = await this._repo.GetByIdAsync(id);

            if (ped == null)
                return null;

            return await PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService);
        }

        public async Task<PedidoLigacaoDTO> GetByParaUtilizador_E_IdAsync(UtilizadorId para, PedidoLigacaoId id)
        {
            var ped = await this._repo.GetByParaUtilizador_E_IdAsync(para, id);

            if (ped == null)
                return null;

            return await PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService);
        }

        public async Task<List<PedidoLigacaoDTO>> GetByParaUtilizadorAsync(UtilizadorId para)
        {
            var list = await this._repo.GetByParaUtilizadorAsync(para);

            List<PedidoLigacaoDTO> listDto = list.ConvertAll<PedidoLigacaoDTO>(ped => PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService).Result);

            return listDto;
        }



        public async Task<List<PedidoLigacaoDTO>> GetByParaUtilizador_E_EstadoAsync(UtilizadorId para, EstadoPedido estado)
        {
            var list = await this._repo.GetByParaUtilizador_E_EstadoAsync(para, estado);

            List<PedidoLigacaoDTO> listDto = list.ConvertAll<PedidoLigacaoDTO>(ped => PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService).Result);

            return listDto;
        }

        public async Task<List<PedidoLigacaoDTO>> GetByDeUtilizadorAsync(UtilizadorId utilizador)
        {
            var list = await this._repo.GetByDeUtilizadorAsync(utilizador);

            List<PedidoLigacaoDTO> listDto = list.ConvertAll<PedidoLigacaoDTO>(ped => PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService).Result);

            return listDto;
        }


        public async Task<PedidoLigacaoDTO> AddAsync(CriarPedidoLigacaoDTO dto)
        {
            try
            {
                UtilizadorId idA = dto.DeUtilizadorId == null ? null : new UtilizadorId(dto.DeUtilizadorId);
                UtilizadorId idB = dto.ParaUtilizadorId == null ? null : new UtilizadorId(dto.ParaUtilizadorId);

                if (await this._utilizadorService.GetByIdAsync(idA) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador A (quem fez o pedido) não existe ou não foi especificado.");
                }

                if (await this._utilizadorService.GetByIdAsync(idB) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador B (quem vai receber o pedido) não existe ou não foi especificado.");
                }

                if (await this._ligacaoService.GetByUtilizadoresAsync(idA, idB) != null)
                {
                    throw new BusinessRuleValidationException("Os dois utilizadores já são amigos.");
                }

                if (await this._repo.GetByUtilizadores_E_EstadoAsync(idA, idB, EstadoPedido.PENDENTE) != null)
                {
                    throw new BusinessRuleValidationException("Um pedido para este utilizador já foi enviado anteriormente (encontra-se pendente).");
                }

                if (await this._repo.GetByUtilizadores_E_EstadoAsync(idB, idA, EstadoPedido.PENDENTE) != null)
                {
                    throw new BusinessRuleValidationException("Possui um pedido de ligação por aceitar vindo do utilizador a quem se pretende ligar.");
                }

                // TODO: Verificar se já nao existe um pedido a envolver os dois utilizadores.


                List<Tag> tagsList = new List<Tag>();
                if (dto.Tags != null)
                {
                    dto.Tags.ForEach(t => tagsList.Add(new Tag(t)));
                }



                var ped = new PedidoLigacao(idA, idB, new MensagemLigacao(dto.Mensagem), dto.ForcaLigacao == 0 ? null : new ForcaLigacao(dto.ForcaLigacao), tagsList);

                await this._repo.AddAsync(ped);

                await this._unitOfWork.CommitAsync();

                return await PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService);
            }
            catch (System.FormatException)
            {
                throw new BusinessRuleValidationException("Pelo menos um dos ids de utilizador é inválido.");
            }
        }

        public async Task<PedidoLigacaoDTO> AddSync(CriarPedidoLigacaoDTO dto)
        {
            try
            {
                UtilizadorId idA = dto.DeUtilizadorId == null ? null : new UtilizadorId(dto.DeUtilizadorId);
                UtilizadorId idB = dto.ParaUtilizadorId == null ? null : new UtilizadorId(dto.ParaUtilizadorId);

                if (await this._utilizadorService.GetByIdAsync(idA) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador A (quem fez o pedido) não existe ou não foi especificado.");
                }

                if (await this._utilizadorService.GetByIdAsync(idB) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador B (quem vai receber o pedido) não existe ou não foi especificado.");
                }

                if (await this._ligacaoService.GetByUtilizadoresAsync(idA, idB) != null)
                {
                    throw new BusinessRuleValidationException("Os dois utilizadores já são amigos.");
                }

                if (await this._repo.GetByUtilizadores_E_EstadoAsync(idA, idB, EstadoPedido.PENDENTE) != null)
                {
                    throw new BusinessRuleValidationException("Um pedido para este utilizador já foi enviado anteriormente (encontra-se pendente).");
                }

                if (await this._repo.GetByUtilizadores_E_EstadoAsync(idB, idA, EstadoPedido.PENDENTE) != null)
                {
                    throw new BusinessRuleValidationException("Possui um pedido de ligação por aceitar vindo do utilizador a quem se pretende ligar.");
                }


                // TODO: Verificar se já nao existe um pedido a envolver os dois utilizadores.
                // TODO: Verificar se já não existe uma ligaçaõ entre ambos.

                List<Tag> tagsList = new List<Tag>();
                if (dto.Tags != null)
                {
                    dto.Tags.ForEach(t => tagsList.Add(new Tag(t)));
                }



                var ped = new PedidoLigacao(idA, idB, new MensagemLigacao(dto.Mensagem), dto.ForcaLigacao == 0 ? null : new ForcaLigacao(dto.ForcaLigacao), tagsList);

                await this._repo.AddAsync(ped);


                return await PedidoLigacaoMapper.domainToDTO(ped, _utilizadorService);
            }
            catch (System.FormatException)
            {
                throw new BusinessRuleValidationException("Pelo menos um dos ids de utilizador é inválido.");
            }
        }

        public async Task<PedidoLigacaoDTO> UpdateAsync(EditarPedidoLigacaoDTO dto, UtilizadorId utilizador)
        {
            var lig = await this._repo.GetByParaUtilizador_E_IdAsync(utilizador, new PedidoLigacaoId(dto.Id));

            if (lig == null)
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
                    if (dto.Tags == null || dto.Tags.Count == 0)
                    {
                        throw new BusinessRuleValidationException("Para aceitar este pedido deve especificar pelo menos uma tag.");
                    }

                    if (dto.ForcaLigacao == 0)
                    {
                        throw new BusinessRuleValidationException("Para aceitar este pedido deve especificar uma forca de ligação válida.");
                    }

                    List<string> tags = new List<string>();
                    lig.Tags.ForEach(t => tags.Add(t.value));
                    await this._ligacaoService.AddSync(new CriarLigacaoDTO { UtilizadorAId = lig.DeUtilizador.AsString(), UtilizadorBId = lig.ParaUtilizador.AsString(), ForcaLigacao = lig.ForcaLigacao.valor, Tags = tags });
                    await this._ligacaoService.AddSync(new CriarLigacaoDTO { UtilizadorAId = lig.ParaUtilizador.AsString(), UtilizadorBId = lig.DeUtilizador.AsString(), ForcaLigacao = dto.ForcaLigacao, Tags = dto.Tags });

                    lig.aceitar();
                    // Criar a ligação.
                }
                else
                {
                    lig.recusar();
                }

            }


            await this._unitOfWork.CommitAsync();

            return await PedidoLigacaoMapper.domainToDTO(lig, _utilizadorService);
        }
        public async Task<PedidoLigacaoDTO> DeleteAsync(PedidoLigacaoId id)
        {
            var pedidoLigacao = await this._repo.GetByIdAsync(id);

            if (pedidoLigacao == null)
                return null;

            this._repo.Remove(pedidoLigacao);
            await this._unitOfWork.CommitAsync();

            return await PedidoLigacaoMapper.domainToDTO(pedidoLigacao, _utilizadorService);
        }

        public async Task<int> DeleteAllWithUtilizadorSync(UtilizadorId utilizador)
        {
            return await this._repo.RemoveAllByUtilizador(utilizador);
        }

    }
}