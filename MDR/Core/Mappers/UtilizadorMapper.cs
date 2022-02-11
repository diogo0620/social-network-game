using System.Collections.Generic;
using MDR.Domain.Utilizadores;

namespace MDR.Mappers
{
    public class UtilizadorMapper
    {
        public static UtilizadorDTO domainToDTO(Utilizador uti)
        {
            List<string> tagsDTO = new List<string>();
            uti.Tags.ForEach(t => tagsDTO.Add(t.value));
            string dataEstadoEmocional = uti.EstadoEmocional.desde.Year + "-" + uti.EstadoEmocional.desde.Month + "-" + uti.EstadoEmocional.desde.Day + ", " + uti.EstadoEmocional.desde.ToShortTimeString();
            return new UtilizadorDTO { Id = uti.Id.AsString(), Email = uti.Email.value, Password = uti.Password.value, Nome = uti.Nome == null ? null : uti.Nome.value, DataNascimento = uti.DataNascimento.asString(), CodigoPais = uti.Telefone == null ? null : uti.Telefone.codigoPais, NumeroTelemovel = uti.Telefone == null ? null : uti.Telefone.numero, LinkedIn = uti.PerfilLinkedIn == null ? null : uti.PerfilLinkedIn.url, Facebook = uti.PerfilFacebook == null ? null : uti.PerfilFacebook.url, Avatar = uti.Avatar == null ? null : uti.Avatar.value, Pais = uti.Localizacao == null ? null : uti.Localizacao.pais, Cidade = uti.Localizacao == null ? null : uti.Localizacao.cidade, Descricao = uti.Descricao == null ? null : uti.Descricao.value, Tags = tagsDTO, EstadoEmocional = uti.EstadoEmocional.asString(), DataEstadoEmocional = dataEstadoEmocional };
        }

    }
}