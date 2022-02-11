using System.Threading.Tasks;
using System.Collections.Generic;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using System;
using MDR.Mappers;
using MDR.Domain.Planeamento;
using System.Linq;
using MDR.Utils;
using Microsoft.Extensions.Configuration;

namespace MDR.Domain.Ligacoes
{
    public class LigacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILigacaoRepository _repo;
        private readonly UtilizadorService _utilizadorService;
        private readonly string planeamentoUrl;

        private readonly string mdpUrl;

        public LigacaoService(IConfiguration configuration, IUnitOfWork unitOfWork, ILigacaoRepository repo, UtilizadorService utiService)
        {
            this.planeamentoUrl = configuration["Planeamento:URL"];
            this.mdpUrl = configuration["MDP:URL"];
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._utilizadorService = utiService;
        }

        public async Task<List<LigacaoDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<LigacaoDTO> listDto = list.ConvertAll<LigacaoDTO>(lig => LigacaoMapper.domainToDTO(lig, _utilizadorService).Result);
            return listDto;
        }

        public async Task<List<List<LigacaoDTO>>> GetRedeByUtilizadorNivelAsync(UtilizadorId utilizadorQueFezPedido, int nivel)
        {

            if (nivel <= 0)
                return null;

            List<Ligacao> todasLigacoes = new List<Ligacao>();
            List<List<Ligacao>> rede = new List<List<Ligacao>>();
            var nivelAtual = 0;
            var vizinhosDoAutenticado = await _repo.GetByUtilizadorAAsync(utilizadorQueFezPedido);
            rede.Add(vizinhosDoAutenticado);
            todasLigacoes.AddRange(vizinhosDoAutenticado);
            nivelAtual++;

            while (nivelAtual < nivel)
            {
                var vizinhosNivel = new List<Ligacao>();
                List<Ligacao> aProcurar = rede.ElementAt(nivelAtual - 1);
                aProcurar.ForEach(l =>
                {
                    var vizinhosNo = _repo.GetByUtilizadorAAsync(new UtilizadorId(l.UtilizadorB.AsString())).Result;
                    vizinhosNo.ForEach(v =>
                    {
                        var jaExiste = todasLigacoes.Find(l => l.UtilizadorA.Equals(v.UtilizadorB) && (l.UtilizadorB.Equals(v.UtilizadorA))) != null;
                        if (!jaExiste)
                        {
                            todasLigacoes.Add(v);
                            vizinhosNivel.Add(v);
                        }
                    });
                });


                rede.Add(vizinhosNivel);
                nivelAtual++;
            }

            List<List<LigacaoDTO>> redeDTO = new List<List<LigacaoDTO>>();
            rede.ForEach(lista =>
            {
                redeDTO.Add(lista.ConvertAll<LigacaoDTO>(lig => LigacaoMapper.domainToDTO(lig, _utilizadorService).Result));
            });

            return redeDTO;

        }



        public async Task<int> GetDimensaoRede(UtilizadorId utilizador)
        {
            int dimensao = 0;
            List<List<LigacaoDTO>> redeAteSegundoNivel = await this.GetRedeByUtilizadorNivelAsync(utilizador, 2);

            redeAteSegundoNivel.ForEach(n => { n.ForEach(l => { dimensao++; }); });
            return dimensao;
        }

        public async Task<int> GetFortalezaRede(UtilizadorId utilizador)
        {
            int fortaleza = 0;
            List<LigacaoDTO> amigos = await this.GetByUtilizadorAAsync(utilizador);

            amigos.ForEach(l => { fortaleza = fortaleza + l.ForcaLigacao; });
            return fortaleza;
        }

        public async Task<InformacaoRedeDTO> GetInformacaoRede(UtilizadorId utilizador)
        {
            int fortaleza = 0;
            int dimensao = 0;

            List<List<LigacaoDTO>> redeAteSegundoNivel = await this.GetRedeByUtilizadorNivelAsync(utilizador, 2);

            for (int i = 0; i < redeAteSegundoNivel.Count; i++)
            {
                for (int a = 0; a < redeAteSegundoNivel.ElementAt(i).Count; a++)
                {
                    LigacaoDTO ligacao = redeAteSegundoNivel.ElementAt(i).ElementAt(a);

                    if (i == 0)
                    {
                        fortaleza = fortaleza + ligacao.ForcaLigacao;
                    }
                    dimensao++;
                }
            }


            return new InformacaoRedeDTO { Fortaleza = fortaleza, Dimensao = dimensao };
        }

        public async Task<List<LigacaoDTO>> GetByUtilizadorAAsync(UtilizadorId utilizadorA)
        {
            var list = await this._repo.GetByUtilizadorAAsync(utilizadorA);

            List<LigacaoDTO> listDto = list.ConvertAll<LigacaoDTO>(lig => LigacaoMapper.domainToDTO(lig, _utilizadorService).Result);
            return listDto;
        }

        public async Task<List<UtilizadorDTO>> GetAmigosEmComum(UtilizadorId utiA, UtilizadorId utiB)
        {
            var amigosDoA = await this.GetAmigos(utiA);
            var amigosDoB = await this.GetAmigos(utiB);
            List<UtilizadorDTO> res = new List<UtilizadorDTO>();

            amigosDoA.ForEach(uA =>
            {
                var uti = amigosDoB.Find(b => b.Id == uA.Id);
                if (uti != null)
                {
                    res.Add(uti);
                }
            });

            return res;

        }


        public async Task<List<UtilizadorDTO>> GetSugestoes(UtilizadorId utilizador)
        {


            var amigos = await GetAmigos(utilizador);


            if (amigos.Count < 2)
            {
                return await GetSugestoesAleatorias(utilizador, amigos);
            }



            var res = new List<UtilizadorDTO>();
            try
            {
                res = await getSugestoesPorAmigosEmComumEtags(utilizador, 3);
            }
            catch (Exception)
            {
                res = new List<UtilizadorDTO>();
            }

            if (res.Count == 0)
            {
                return await GetSugestoesAleatorias(utilizador, amigos);
            }

            return res;
        }

        public async Task<List<SugestaoGrupoDTO>> GetSugestoesGrupo(UtilizadorId utilizador, int numeroTags, int numeroUtilizadores, string tagsObrigatorias)
        {

            var res = await HttpUtils.getRequestAsync<SugestaoGrupoPlaneamentoDTO>(this.planeamentoUrl, "api/sugestoesGrupos?para=" + utilizador.AsString() + "&numeroTags=" + numeroTags + "&numeroUtilizadores=" + numeroUtilizadores + "&tagsObrigatorias=" + tagsObrigatorias);


            var sugestoes = SugestaoMapper.grupoSugestaoPlaneamentoToGrupoSugestaoDTO(res, _utilizadorService);
            return sugestoes;
        }


        public async Task<List<UtilizadorDTO>> GetSugestoesPorTags(UtilizadorId utilizador, int numeroTags)
        {
            var res = await HttpUtils.getRequestAsync<ListaUtilizadores>(this.planeamentoUrl, "api/sugestoesUtilizadores?para=" + utilizador.AsString() + "&numeroTags=" + numeroTags);
            List<UtilizadorDTO> list = res.utilizadores.ConvertAll<UtilizadorDTO>(id => _utilizadorService.GetByIdAsync(new UtilizadorId(id)).Result);
            return list;
        }

        private async Task<List<UtilizadorDTO>> getSugestoesPorAmigosEmComumEtags(UtilizadorId utilizador, int nivel)
        {
            var res = await HttpUtils.getRequestAsync<ListaUtilizadores>(this.planeamentoUrl, "api/sugestoes?para=" + utilizador.AsString() + "&nivel=" + nivel);
            List<UtilizadorDTO> list = res.utilizadores.ConvertAll<UtilizadorDTO>(id => _utilizadorService.GetByIdAsync(new UtilizadorId(id)).Result);
            return list;
        }

        private async Task<List<UtilizadorDTO>> GetSugestoesAleatorias(UtilizadorId utilizador, List<UtilizadorDTO> amigos)
        {
            List<UtilizadorDTO> todos = await _utilizadorService.GetAllAsync();
            List<UtilizadorDTO> naoAmigos = new List<UtilizadorDTO>();

            todos.ForEach(u =>
            {
                var uti = amigos.Find(a => a.Id == u.Id);
                if (uti == null && u.Id != utilizador.AsString())
                {
                    naoAmigos.Add(u);
                }
            });

            return naoAmigos;
        }


        public async Task<List<TagCloud>> GetTagCloudByUtilizador(UtilizadorId utilizador)
        {
            var ligacoes = await this.GetByUtilizadorAAsync(utilizador);
            List<string> cloud = new List<string>();

            ligacoes.ForEach(f => cloud.AddRange(f.Tags));

            return TagMapper.listaTagsToTagCloud(cloud);
        }

        public async Task<List<TagCloud>> GetTagCloud()
        {
            var ligacoes = await this.GetAllAsync();
            List<string> cloud = new List<string>();

            ligacoes.ForEach(f => cloud.AddRange(f.Tags));

            return TagMapper.listaTagsToTagCloud(cloud);
        }


        public async Task<List<UtilizadorDTO>> GetAmigos(UtilizadorId utilizador)
        {
            var ligacoes = await this.GetByUtilizadorAAsync(utilizador);
            List<UtilizadorDTO> res = new List<UtilizadorDTO>();

            ligacoes.ForEach(l => res.Add(l.UtilizadorB));
            return res;
        }

        public async Task<LigacaoDTO> GetByIdAsync(LigacaoId id)
        {
            var lig = await this._repo.GetByIdAsync(id);

            if (lig == null)
                return null;

            return await LigacaoMapper.domainToDTO(lig, _utilizadorService);
        }

        public async Task<LigacaoDTO> GetByUtilizadorA_E_IdAsync(UtilizadorId utilizadorA, LigacaoId id)
        {
            var lig = await GetByIdAsync(id);

            if (lig == null || lig.UtilizadorA.Id != utilizadorA.AsString())
                return null;

            return lig;
        }

        public async Task<LigacaoDTO> GetByUtilizadoresAsync(UtilizadorId u1, UtilizadorId u2)
        {
            var lig = await this._repo.GetByUtilizadoresAsync(u1, u2);

            if (lig == null)
                return null;

            return await LigacaoMapper.domainToDTO(lig, _utilizadorService);
        }

        public async Task<List<LigacaoDTO>> GetLigacoesRedeAsync(UtilizadorId id)
        {
            var list = await this._repo.GetLigacoesRedeAsync(id);

            List<LigacaoDTO> listDto = list.ConvertAll<LigacaoDTO>(lig => LigacaoMapper.domainToDTO(lig, _utilizadorService).Result);

            return listDto;
        }


        public async Task<LigacaoDTO> AddAsync(CriarLigacaoDTO dto)
        {
            var resultado = await AddSync(dto);
            await this._unitOfWork.CommitAsync();
            return resultado;
        }


        public async Task<LigacaoDTO> AddSync(CriarLigacaoDTO dto)
        {
            try
            {
                UtilizadorId idA = dto.UtilizadorAId == null ? null : new UtilizadorId(dto.UtilizadorAId);
                UtilizadorId idB = dto.UtilizadorBId == null ? null : new UtilizadorId(dto.UtilizadorBId);

                if (await this._utilizadorService.GetByIdAsync(idA) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador A  não foi especificado ou não existe.");
                }

                if (await this._utilizadorService.GetByIdAsync(idB) == null)
                {
                    throw new BusinessRuleValidationException("O utilizador B  não foi especificado ou não existe.");
                }

                var likesEdislikes = await this.LikesDislikesEntreUtilizadores(idA, idB);


                List<Tag> tags = new List<Tag>();

                if (dto.Tags != null)
                    dto.Tags.ForEach(t => tags.Add(new Tag(t)));

                var lig = new Ligacao(idA, idB, new ForcaLigacao(dto.ForcaLigacao), new ForcaRelacao(likesEdislikes.likes, likesEdislikes.dislikes), tags);

                await this._repo.AddAsync(lig);


                return await LigacaoMapper.domainToDTO(lig, _utilizadorService);
            }
            catch (System.FormatException)
            {
                throw new BusinessRuleValidationException("Pelo menos um dos ids de utilizador é inválido.");
            }
        }


        public async Task<ResultadoDiferencaDTO> LikesDislikesEntreUtilizadores(UtilizadorId utilizadorA, UtilizadorId utilizadorB)
        {
            return await HttpUtils.getRequestAsync<ResultadoDiferencaDTO>(this.mdpUrl, "api/diferencaReacoes?utilizadorA=" + utilizadorA.AsString() + "&utilizadorB=" + utilizadorB.AsString());
        }

        public async Task<LigacaoDTO> IncrementarNumeroLikes(UtilizadorId utilizadorA, UtilizadorId utilizadorB)
        {
            var ligacao = await this._repo.GetByUtilizadoresAsync(utilizadorA, utilizadorB);

            if (ligacao == null)
            {
                return null;
            }

            ligacao.aumentarNumeroLikes();

            await this._unitOfWork.CommitAsync();
            return await LigacaoMapper.domainToDTO(ligacao, _utilizadorService);
        }

        public async Task<LigacaoDTO> DecrementarNumeroLikes(UtilizadorId utilizadorA, UtilizadorId utilizadorB)
        {
            var ligacao = await this._repo.GetByUtilizadoresAsync(utilizadorA, utilizadorB);

            if (ligacao == null)
            {
                return null;
            }

            ligacao.diminuirNumeroLikes();

            await this._unitOfWork.CommitAsync();
            return await LigacaoMapper.domainToDTO(ligacao, _utilizadorService);
        }




        public async Task<LigacaoDTO> IncrementarNumeroDislikes(UtilizadorId utilizadorA, UtilizadorId utilizadorB)
        {
            var ligacao = await this._repo.GetByUtilizadoresAsync(utilizadorA, utilizadorB);

            if (ligacao == null)
            {
                return null;
            }

            ligacao.aumentarNumeroDislikes();

            await this._unitOfWork.CommitAsync();
            return await LigacaoMapper.domainToDTO(ligacao, _utilizadorService);
        }

        public async Task<LigacaoDTO> DecrementarNumeroDislikes(UtilizadorId utilizadorA, UtilizadorId utilizadorB)
        {
            var ligacao = await this._repo.GetByUtilizadoresAsync(utilizadorA, utilizadorB);

            if (ligacao == null)
            {
                return null;
            }


            ligacao.diminuirNumeroDislikes();

            await this._unitOfWork.CommitAsync();
            return await LigacaoMapper.domainToDTO(ligacao, _utilizadorService);
        }


        public async Task<LigacaoDTO> UpdateAsync(EditarLigacaoDTO dto, UtilizadorId utilizador)
        {
            var lig = await this._repo.GetByIdAsync(new LigacaoId(dto.Id));

            if (lig == null || !lig.UtilizadorA.Equals(utilizador))
                return null;


            if (dto.ForcaLigacao > 0)
                lig.alterarForcaLigacao(new ForcaLigacao(dto.ForcaLigacao));

            if (dto.Tags != null)
            {
                List<Tag> tagsList = new List<Tag>();
                dto.Tags.ForEach(t => tagsList.Add(new Tag(t)));
                lig.alterarTags(tagsList);
            }

            await this._unitOfWork.CommitAsync();

            return await LigacaoMapper.domainToDTO(lig, _utilizadorService);
        }


        public async Task<LigacaoDTO> DeleteAsync(LigacaoId id)
        {
            var ligacao = await this._repo.GetByIdAsync(id);

            if (ligacao == null)
                return null;

            var outraLigacao = await this._repo.GetByUtilizadoresAsync(ligacao.UtilizadorB, ligacao.UtilizadorA);

            this._repo.Remove(ligacao);
            this._repo.Remove(outraLigacao);
            await this._unitOfWork.CommitAsync();

            return await LigacaoMapper.domainToDTO(ligacao, _utilizadorService);
        }

        public async Task<int> DeleteAllAsync(UtilizadorId utilizador)
        {
            var res = await this.DeleteAllSync(utilizador);
            await this._unitOfWork.CommitAsync();
            return res;
        }

        public async Task<int> DeleteAllSync(UtilizadorId utilizador)
        {
            int ligacoesApagadas = await this._repo.RemoveAllByUtilizador(utilizador);
            return ligacoesApagadas;
        }


    }
}

public class ListaUtilizadores
{
    public List<string> utilizadores { get; set; }
}

public class ListaSugestoesUtilizadores
{
    public List<string> utilizadores { get; set; }
    public List<string> tags { get; set; }
}

public class ResultadoDiferencaDTO
{
    public int likes { get; set; }
    public int dislikes { get; set; }
}
