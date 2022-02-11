using System.Threading.Tasks;
using MDR.Domain.Utilizadores;
using MDR.Mappers;
using MDR.Utils;
using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MDR.Domain.Posts;
using MDR.Domain.Ligacoes;

namespace MDR.Domain.Comentarios
{
    public class ComentarioService
    {

        private readonly UtilizadorService _utilizadorService;

        private readonly LigacaoService _ligacoesService;
        private string MDPurl;

        public ComentarioService(IConfiguration configuration, UtilizadorService utilizadorService, LigacaoService ligacaoService)
        {
            this.MDPurl = configuration["MDP:URL"];
            this._utilizadorService = utilizadorService;
            this._ligacoesService = ligacaoService;
        }


        public async Task<ComentarioDTO> CriarComentarioAsync(ComentarioDTO comentario)
        {
            CriarComentarioMdpDTO mdp = ComentarioMapper.dtoToCriarComentarioMDP(comentario);
            var criado = await HttpUtils.postRequestAsync<ComentarioMdpDTO, CriarComentarioMdpDTO>(this.MDPurl, "/api/comentarios", mdp);
            return await ComentarioMapper.mdpToDTO(criado, _utilizadorService);
        }

        public async Task<List<ComentarioDTO>> GetComentariosByPost(string idPost)
        {
            var recebidos = await HttpUtils.getRequestAsync<List<ComentarioMdpDTO>>(this.MDPurl, "/api/comentarios?post=" + idPost);
            List<ComentarioDTO> res = recebidos.ConvertAll<ComentarioDTO>(p => ComentarioMapper.mdpToDTO(p, this._utilizadorService).Result);
            return res;
        }

        public async Task<ComentarioDTO> Like(string postID, UtilizadorId utilizador)
        {
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.requestAsync<ComentarioMdpDTO, ReacaoMdpDTO>("put", this.MDPurl, "api/comentarios/" + postID + "/like", reacao);
            var post = await ComentarioMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.IncrementarNumeroLikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }


            return post;
        }

        public async Task<ComentarioDTO> Dislike(string postID, UtilizadorId utilizador)
        {
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.requestAsync<ComentarioMdpDTO, ReacaoMdpDTO>("put", this.MDPurl, "api/comentarios/" + postID + "/dislike", reacao);
            var post = await ComentarioMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.IncrementarNumeroDislikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }


            return post;
        }

        public async Task<ComentarioDTO> TirarLike(string comentarioID, UtilizadorId utilizador)
        {
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.deleteRequestAsync<ComentarioMdpDTO>(this.MDPurl, "api/comentarios/" + comentarioID + "/" + utilizador.AsString() + "/like");
            var post = await ComentarioMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.DecrementarNumeroLikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }

            return post;
        }

        public async Task<ComentarioDTO> TirarDislike(string comentarioID, UtilizadorId utilizador)
        {
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.deleteRequestAsync<ComentarioMdpDTO>(this.MDPurl, "api/comentarios/" + comentarioID + "/" + utilizador.AsString() + "/dislike");
            var post = await ComentarioMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.DecrementarNumeroDislikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }


            return post;
        }

    }
}