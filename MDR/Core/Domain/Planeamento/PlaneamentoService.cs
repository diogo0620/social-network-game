using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;
using MDR.Mappers;
using MDR.Utils;
using Microsoft.Extensions.Configuration;

namespace MDR.Domain.Planeamento
{


    public class PlaneamentoService
    {
        private readonly LigacaoService _ligacaoesService;

        private readonly UtilizadorService _utilizadoresService;
        private string planeamentoUrl;

        public PlaneamentoService(IConfiguration configuration, LigacaoService ligacoesService, UtilizadorService utilizadorService)
        {
            this.planeamentoUrl = configuration["Planeamento:URL"];
            this._ligacaoesService = ligacoesService;
            this._utilizadoresService = utilizadorService;
        }

        public async Task<CaminhoDTO> getCaminhoMaisCurtoAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/caminhoMaisCurto?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoMaisCurtoMulticriterioAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/caminhoMaisCurtoMulticriterio?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoMaisForteAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/caminhoMaisForte?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoMaisForteMulticriterioAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/caminhoMaisForteMulticriterio?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoMaisSeguroAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, int forcaMinima, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/caminhoMaisSeguro?de=" + de.AsString() + "&para=" + para.AsString() + "&forcaMinima=" + forcaMinima + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoMaisSeguroMulticriterioAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, int forcaMinima, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/caminhoMaisSeguroMulticriterio?de=" + de.AsString() + "&para=" + para.AsString() + "&forcaMinima=" + forcaMinima + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoDfsAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/dfs?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoDfsMulticriterioAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/dfsMulticriterio?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }


        public async Task<CaminhoDTO> getCaminhoAstarAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/aStar?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoAstarMulticriterioAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/aStarMulticriterio?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoBestFirstAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/bestFirst?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }

        public async Task<CaminhoDTO> getCaminhoBestFirstMulticriterioAsync(UtilizadorId de, UtilizadorId para, int maxLigacoes, string emocoesProibidas)
        {
            var res = await HttpUtils.getRequestAsync<CaminhoRecebidoDTO>(this.planeamentoUrl, "api/bestFirstMulticriterio?de=" + de.AsString() + "&para=" + para.AsString() + "&maxLigacoes=" + maxLigacoes + "&emocoesProibidas=" + emocoesProibidas);
            return CaminhoMapper.recebidoToDTO(res, _ligacaoesService);
        }


    }
}


