using System.Threading.Tasks;
using System.Collections.Generic;
using MDR.Domain.Shared;
using System.Linq;
using MDR.Mappers;
using MDR.Utils;
using Microsoft.Extensions.Configuration;

namespace MDR.Domain.Utilizadores
{
    public class UtilizadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUtilizadorRepository _repo;

        private readonly string mdpUrl;

        public UtilizadorService(IConfiguration configuration, IUnitOfWork unitOfWork, IUtilizadorRepository repo)
        {
            this.mdpUrl = configuration["MDP:URL"];
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<UtilizadorDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UtilizadorDTO> listDto = list.ConvertAll<UtilizadorDTO>(uti => UtilizadorMapper.domainToDTO(uti));

            return listDto;
        }

        public async Task<UtilizadorDTO> GetByIdAsync(UtilizadorId id)
        {
            var uti = id == null ? null : await this._repo.GetByIdAsync(id);

            if (uti == null)
                return null;

            return UtilizadorMapper.domainToDTO(uti);
        }



        public async Task<List<UtilizadorDTO>> GetByParametrosAsync(Email email, Nome nome, Localizacao localizacao)
        {

            var list = await this._repo.GetByParametrosAsync(email, nome, localizacao);

            List<UtilizadorDTO> listDto = list.ConvertAll<UtilizadorDTO>(uti => UtilizadorMapper.domainToDTO(uti));

            return listDto;

        }

        public async Task<List<TagCloud>> GetTagCloudByUtilizador(UtilizadorId utilizador)
        {
            List<string> res = await HttpUtils.getRequestAsync<List<string>>(this.mdpUrl, "api/posts/tags/" + utilizador.AsString());
            return TagMapper.listaTagsToTagCloud(res);
        }

        public async Task<List<TagCloud>> GetTagCloud()
        {
            List<string> res = await HttpUtils.getRequestAsync<List<string>>(this.mdpUrl, "api/posts/tags");
            return TagMapper.listaTagsToTagCloud(res);
        }

        public async Task<List<UtilizadorDTO>> GetSugestoesRecemRegistadoAsync(UtilizadorId utilizador)
        {
            var list = await this._repo.GetSugestoesRecemRegistadoAsync(utilizador);

            List<UtilizadorDTO> listDto = list.ConvertAll<UtilizadorDTO>(uti => UtilizadorMapper.domainToDTO(uti));

            return listDto;
        }

        public async Task<UtilizadorDTO> GetByEmail_E_Password(Email email, Password password)
        {
            var uti = await this._repo.GetByEmailEPassword(email, password);

            if (uti == null)
                return null;

            return UtilizadorMapper.domainToDTO(uti);
        }

        public async Task<UtilizadorDTO> AddAsync(CriarUtilizadorDTO dto)
        {

            Email e = dto.Email == null ? null : new Email(dto.Email);

            if (e != null && await this._repo.GetByEmail(e) != null)
                throw new BusinessRuleValidationException("Já existe um utilizador com o email introduzido.");

            List<Tag> tags = new List<Tag>();

            if (dto.Tags != null)
                dto.Tags.ForEach(t => tags.Add(new Tag(t)));



            var uti = new Utilizador(e, dto.Password == null ? null : new Password(dto.Password), dto.Nome == null ? null : new Nome(dto.Nome), dto.DataNascimento == null ? null : new DataNascimento(dto.DataNascimento), (dto.CodigoPaisTelefone == null && dto.NumeroTelefone == null) ? null : new Telefone(dto.CodigoPaisTelefone, dto.NumeroTelefone), dto.LinkedIn == null ? null : new PerfilLinkedIn(dto.LinkedIn), dto.Facebook == null ? null : new PerfilFacebook(dto.Facebook), dto.Avatar == null ? null : new Avatar(dto.Avatar), (dto.Pais == null && dto.Cidade == null) ? null : new Localizacao(dto.Pais, dto.Cidade), dto.Descricao == null ? null : new Descricao(dto.Descricao), tags, dto.EstadoEmocional == null ? null : new EstadoEmocional(dto.EstadoEmocional));

            await this._repo.AddAsync(uti);

            await this._unitOfWork.CommitAsync();

            return UtilizadorMapper.domainToDTO(uti);
        }

        public async Task<UtilizadorDTO> UpdateAsync(EditarUtilizadorDTO dto)
        {
            var uti = await this._repo.GetByIdAsync(new UtilizadorId(dto.Id));

            if (uti == null)
                return null;

            if (dto.Password != null)
                uti.alterarPassword(new Password(dto.Password));

            if (dto.Nome != null)
                uti.alterarNome(new Nome(dto.Nome));

            if (dto.DataNascimento != null)
                uti.alterarDataNascimento(new DataNascimento(dto.DataNascimento));

            if (dto.CodigoPaisTelefone != null || dto.NumeroTelefone != null)
                uti.alterarTelefone(new Telefone(dto.CodigoPaisTelefone, dto.NumeroTelefone));

            if (dto.Pais != null || dto.Cidade != null)
                uti.alterarLocalizacao(new Localizacao(dto.Pais, dto.Cidade));

            if (dto.Avatar != null)
                uti.alterarAvatar(new Avatar(dto.Avatar));

            if (dto.Descricao != null)
                uti.alterarDescricao(new Descricao(dto.Descricao));

            if (dto.Facebook != null)
                uti.alterarPerfilFacebook(new PerfilFacebook(dto.Facebook));

            if (dto.LinkedIn != null)
                uti.alterarPerfilLinkedIn(new PerfilLinkedIn(dto.LinkedIn));

            if (dto.EstadoEmocional != null)
                uti.alterarEstadoEmocional(new EstadoEmocional(dto.EstadoEmocional));

            if (dto.Tags != null)
                uti.alterarTags(dto.Tags.ConvertAll<Tag>(t => new Tag(t)));

            await this._unitOfWork.CommitAsync();

            return UtilizadorMapper.domainToDTO(uti);
        }

        public async Task<UtilizadorDTO> DeleteAsync(UtilizadorId id)
        {
            var utilizador = await this.DeleteSync(id);
            await this._unitOfWork.CommitAsync();
            return utilizador;
        }

        public async Task<UtilizadorDTO> DeleteSync(UtilizadorId uti)
        {
            var utilizador = await this._repo.GetByIdAsync(uti);

            if (utilizador == null)
                return null;


            this._repo.Remove(utilizador);


            return UtilizadorMapper.domainToDTO(utilizador);
        }


    }
}

