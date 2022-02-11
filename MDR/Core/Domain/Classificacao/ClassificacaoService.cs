using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;

namespace MDR.Domain.Classificacao
{


    public class ClassificacaoService
    {
        private readonly UtilizadorService _utilizadorService;

        private readonly LigacaoService _ligacoesService;


        public ClassificacaoService(UtilizadorService utilizadorService, LigacaoService ligacaoService)
        {
            this._utilizadorService = utilizadorService;
            this._ligacoesService = ligacaoService;
        }

        public async Task<List<InformacaoRedeDTO>> getClassificacaoAsync()
        {
            List<InformacaoRedeDTO> classificacao = new List<InformacaoRedeDTO>();
            List<UtilizadorDTO> utilizadores = await _utilizadorService.GetAllAsync();
            utilizadores.ForEach(u =>
            {
                InformacaoRedeDTO inf = this._ligacoesService.GetInformacaoRede(new UtilizadorId(u.Id)).Result;
                inf.Utilizador = u;
                classificacao.Add(inf);
            });

            return classificacao;

        }
    }
}