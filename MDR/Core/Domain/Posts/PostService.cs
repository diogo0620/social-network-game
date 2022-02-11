using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Ligacoes;
using MDR.Domain.Utilizadores;
using MDR.Mappers;
using MDR.Utils;
using Microsoft.Extensions.Configuration;

namespace MDR.Domain.Posts
{
    public class PostService
    {

        private readonly UtilizadorService _utilizadorService;

        private readonly LigacaoService _ligacoesService;
        private string MDPurl;

        public PostService(IConfiguration configuration, LigacaoService ligacaoService, UtilizadorService utilizadorService)
        {
            this.MDPurl = configuration["MDP:URL"];
            this._utilizadorService = utilizadorService;
            this._ligacoesService = ligacaoService;
        }


        public async Task<PostDTO> CriarPostAsync(PostDTO post)
        {
            CriarPostMdpDTO mdp = PostMapper.dtoToCriarPostMDP(post);
            var criado = await HttpUtils.postRequestAsync<PostMdpDTO, CriarPostMdpDTO>(this.MDPurl, "/api/posts", mdp);
            return await PostMapper.mdpToDTO(criado, _utilizadorService);
        }



        public async Task<List<PostDTO>> GetByUtilizadorAsync(UtilizadorId utilizadorId)
        {
            var recebidos = await HttpUtils.getRequestAsync<List<PostMdpDTO>>(this.MDPurl, "/api/posts?utilizadores=" + utilizadorId.AsString());
            List<PostDTO> posts = recebidos.ConvertAll<PostDTO>(p => PostMapper.mdpToDTO(p, this._utilizadorService).Result);
            return posts;
        }

        public async Task<List<PostDTO>> GetDosAmigosAsync(UtilizadorId utilizadorId)
        {
            List<UtilizadorDTO> amigos = await _ligacoesService.GetAmigos(utilizadorId);

            List<string> ids = amigos.ConvertAll<string>(u => u.Id);
            ids.Add(utilizadorId.AsString());
            var recebidos = await HttpUtils.getRequestAsync<List<PostMdpDTO>>(this.MDPurl, "/api/posts?utilizadores=" + ColecoesUtils.ListToString(ids));
            List<PostDTO> posts = recebidos.ConvertAll<PostDTO>(p => PostMapper.mdpToDTO(p, this._utilizadorService).Result);
            return posts;
        }

        public async Task<PostDTO> Like(string postID, UtilizadorId utilizador)
        {
            // Dar like
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.requestAsync<PostMdpDTO, ReacaoMdpDTO>("put", this.MDPurl, "api/posts/" + postID + "/like", reacao);
            var post = await PostMapper.mdpToDTO(recebido, _utilizadorService);

            // Atualizar forca de relação.
            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.IncrementarNumeroLikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }


            return post;
        }

        public async Task<PostDTO> TirarLike(string postID, UtilizadorId utilizador)
        {

            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.deleteRequestAsync<PostMdpDTO>(this.MDPurl, "api/posts/" + postID + "/" + utilizador.AsString() + "/like");
            var post = await PostMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.DecrementarNumeroLikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }

            return post;
        }

        public async Task<PostDTO> TirarDislike(string postID, UtilizadorId utilizador)
        {
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.deleteRequestAsync<PostMdpDTO>(this.MDPurl, "api/posts/" + postID + "/" + utilizador.AsString() + "/dislike");
            var post = await PostMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.DecrementarNumeroDislikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }

            return post;
        }


        public async Task<PostDTO> Dislike(string postID, UtilizadorId utilizador)
        {
            ReacaoMdpDTO reacao = new ReacaoMdpDTO { utilizadorId = utilizador.AsString() };
            var recebido = await HttpUtils.requestAsync<PostMdpDTO, ReacaoMdpDTO>("put", this.MDPurl, "api/posts/" + postID + "/dislike", reacao);
            var post = await PostMapper.mdpToDTO(recebido, _utilizadorService);

            if (utilizador.AsString() != post.Utilizador.Id)
            {
                await _ligacoesService.IncrementarNumeroDislikes(utilizador, new UtilizadorId(post.Utilizador.Id));
            }


            return post;
        }



        public async Task<string> DeleteAllByUtilizador(UtilizadorId utilizador)
        {
            var recebido = await HttpUtils.deleteRequestAsync<string>(this.MDPurl, "api/all/" + utilizador.AsString());
            return recebido;
        }




    }
}

