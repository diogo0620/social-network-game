using System.Threading.Tasks;
using MDR.Domain.Ligacoes;
using MDR.Domain.PedidosIntroducao;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Posts;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Sistema
{
    public class SistemaService
    {
        private readonly UtilizadorService _utiService;
        private readonly LigacaoService _ligacoesService;
        private readonly PedidoIntroducaoService _pedidosIntroducaoService;
        private readonly PedidoLigacaoService _pedidosLigacaoService;
        private readonly PostService _postsService;

        private readonly IUnitOfWork _unit;

        public SistemaService(IUnitOfWork unitOfWork, PostService postService, UtilizadorService utiService, LigacaoService ligacaoService, PedidoIntroducaoService pedidoIntroducaoService, PedidoLigacaoService pedidoLigacaoService)
        {
            this._utiService = utiService;
            this._ligacoesService = ligacaoService;
            this._pedidosIntroducaoService = pedidoIntroducaoService;
            this._pedidosLigacaoService = pedidoLigacaoService;
            this._postsService = postService;
            this._unit = unitOfWork;
        }

        public async Task<UtilizadorDTO> ApagarContaAsync(UtilizadorId utilizador)
        {
            await _ligacoesService.DeleteAllSync(utilizador);
            await _pedidosIntroducaoService.DeleteAllWithUtilizadorSync(utilizador);
            await _pedidosLigacaoService.DeleteAllWithUtilizadorSync(utilizador);
            await _postsService.DeleteAllByUtilizador(utilizador);
            var uti = await _utiService.DeleteSync(utilizador);
            await _unit.CommitAsync();
            return uti;
        }


    }
}



