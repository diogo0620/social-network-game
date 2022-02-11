using System.Collections.Generic;
using System.Threading.Tasks;
using MDR.Domain.Comentarios;
using MDR.Domain.Posts;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class ComentarioMapper
    {
        public static async Task<ComentarioDTO> mdpToDTO(ComentarioMdpDTO comentario, UtilizadorService service)
        {
            UtilizadorDTO uti = await service.GetByIdAsync(new UtilizadorId(comentario.utilizadorId));

            string data = comentario.data.Substring(0, 10);
            string tempo = comentario.data.Substring(11, 5);

            List<ReacaoDTO> reacoes = comentario.reacoes == null ? new List<ReacaoDTO>() : comentario.reacoes.ConvertAll<ReacaoDTO>(r => ReacaoMapper.mdpToDTO(r, service).Result);

            return new ComentarioDTO { Id = comentario._id, Utilizador = uti, IdPost = comentario.postId, Texto = comentario.texto, Tags = comentario.tags, Data = data + " " + tempo, Reacoes = reacoes };
        }

        public static ComentarioMdpDTO dtoToMDP(ComentarioDTO comentario)
        {
            return new ComentarioMdpDTO { texto = comentario.Texto, postId = comentario.IdPost, tags = comentario.Tags == null ? new List<string>() : comentario.Tags, utilizadorId = comentario.Utilizador == null ? null : comentario.Utilizador.Id };
        }

        public static CriarComentarioMdpDTO dtoToCriarComentarioMDP(ComentarioDTO comentario)
        {
            return new CriarComentarioMdpDTO { postId = comentario.IdPost == null ? "" : comentario.IdPost, texto = comentario.Texto == null ? "" : comentario.Texto, tags = comentario.Tags == null ? new List<string>() : comentario.Tags, utilizadorId = comentario.Utilizador == null ? null : comentario.Utilizador.Id };
        }




    }
}