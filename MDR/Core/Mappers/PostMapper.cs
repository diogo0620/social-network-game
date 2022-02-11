
using MDR.Domain.Posts;
using MDR.Domain.Utilizadores;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace MDR.Mappers
{
    public class PostMapper
    {
        public static async Task<PostDTO> mdpToDTO(PostMdpDTO post, UtilizadorService service)
        {
            UtilizadorDTO uti = await service.GetByIdAsync(new UtilizadorId(post.utilizadorId));

            string data = post.data.Substring(0, 10);
            string tempo = post.data.Substring(11, 5);

            List<ReacaoDTO> reacoes = post.reacoes.ConvertAll<ReacaoDTO>(r => ReacaoMapper.mdpToDTO(r, service).Result);


            return new PostDTO { Id = post._id, Utilizador = uti, Texto = post.texto, Tags = post.tags, Data = data + " " + tempo, Reacoes = reacoes };
        }

        public static PostMdpDTO dtoToMDP(PostDTO post)
        {
            return new PostMdpDTO { texto = post.Texto == null ? null : post.Texto, tags = post.Tags == null ? new List<string>() : post.Tags, utilizadorId = post.Utilizador == null ? null : post.Utilizador.Id };
        }

        public static CriarPostMdpDTO dtoToCriarPostMDP(PostDTO post)
        {
            return new CriarPostMdpDTO { texto = post.Texto == null ? "" : post.Texto, tags = post.Tags == null ? new List<string>() : post.Tags, utilizadorId = post.Utilizador == null ? null : post.Utilizador.Id };
        }




    }
}