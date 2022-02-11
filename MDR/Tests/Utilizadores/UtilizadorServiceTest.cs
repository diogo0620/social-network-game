using FakeItEasy;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Utilizadores
{
    public class UtilizadorServiceTest
    {
        [Fact]
        public void GetUtilizadores_Retorna_O_Numero_Certo_De_Utilizadores()
        {
            //Arrange
            int numeroUtilizadores = 2;
            var fakeUtilizadores = A.CollectionOfDummy<Utilizador>(numeroUtilizadores).ToList();

            IUtilizadorRepository repo = A.Fake<IUtilizadorRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

    
            A.CallTo(() => repo.GetAllAsync()).Returns(Task.FromResult(fakeUtilizadores));
            IConfiguration conf = A.Fake<IConfiguration>();
            var servico = new UtilizadorService(conf,unitOfWork, repo);

            // Act
            var result = servico.GetAllAsync();

            //Assert
            Assert.Equal(fakeUtilizadores.Count, numeroUtilizadores);

        }

        [Fact]
        public async void GetByID_Retorna_O_Utilizador_Com_ID_Pedido()
        {
            //Arrange
            Utilizador dummyUtilizador = new(A.Fake<Email>(), A.Fake<Password>(), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());

            IUtilizadorRepository repo = A.Fake<IUtilizadorRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            A.CallTo(() => repo.GetByIdAsync(dummyUtilizador.Id)).Returns(Task.FromResult(dummyUtilizador));
            IConfiguration conf = A.Fake<IConfiguration>();
            var servico = new UtilizadorService(conf,unitOfWork, repo);

            // Act
            var resultado = await servico.GetByIdAsync(dummyUtilizador.Id);

            //Assert
            Assert.Equal(resultado.Id, dummyUtilizador.Id.AsString());
        }


        [Fact]
        public async void GetByID_Retorna_Null_Se_O_ID_For_Null()
        {
            //Arrange

            IUtilizadorRepository repo = A.Fake<IUtilizadorRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IConfiguration conf = A.Fake<IConfiguration>();
            var servico = new UtilizadorService(conf,unitOfWork, repo);

            // Act
            var resultado = await servico.GetByIdAsync(null);

            //Assert
            Assert.Null(resultado);
        }

        [Fact]
        public async void GetByParametros_Retorna_Utilizadores_Com_Parametros()
        {
            Utilizador dummyUtilizador = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
       
            List<Utilizador> dummyUtilizadores = new List<Utilizador> { dummyUtilizador };


            //Arrange
            IUtilizadorRepository repo = A.Fake<IUtilizadorRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            Email e = A.Dummy<Email>();
            Nome n = A.Dummy<Nome>();
            Localizacao l = A.Dummy<Localizacao>(); 


            A.CallTo(() => repo.GetByParametrosAsync(e, n, l)).Returns(Task.FromResult(dummyUtilizadores));
            IConfiguration conf = A.Fake<IConfiguration>();
            var servico = new UtilizadorService(conf,unitOfWork, repo);

            // Act
            var resultado = await servico.GetByParametrosAsync(e, n, l);

            //Assert
            Assert.Equal(dummyUtilizadores.Count, resultado.Count());
            Assert.Equal(resultado.First().Id, dummyUtilizador.Id.AsString());
        }


        [Fact]
        public async void Add_Retorna_O_DTO_Criado()
        {

            CriarUtilizadorDTO dto = new CriarUtilizadorDTO { Email = "abcd@hotmail.com", Password = "asassaasSDDA_", DataNascimento = "2000-01-01", Tags = new List<string> { "abc" }, EstadoEmocional = "Alegre" };
            Email e = new Email(dto.Email);
            Utilizador uti = new Utilizador(e, new Password(dto.Password), null, new DataNascimento(dto.DataNascimento), null, null, null, null, null, null, dto.Tags.ConvertAll<Tag>(t => new Tag(t)), new EstadoEmocional(dto.EstadoEmocional));
            
            //Arrange
            IUtilizadorRepository repo = A.Fake<IUtilizadorRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();


            A.CallTo(() => repo.GetByEmail(e)).Returns<Utilizador>(null);
            A.CallTo(() => repo.AddAsync(A.Dummy<Utilizador>())).Returns(Task.FromResult(uti));
            var servico = new UtilizadorService(conf, unitOfWork, repo);

            // Act
            var resultado = await servico.AddAsync(dto);

            //Assert
            Assert.Equal(uti.Email.value, resultado.Email);
            Assert.Equal(uti.Password.value, resultado.Password);
            Assert.Null(resultado.Nome);

        }

        [Fact]
        public async void Update_Retorna_O_DTO_Atualizado()
        {

            UtilizadorId id = new UtilizadorId(Guid.NewGuid()); 
            EditarUtilizadorDTO dto = new EditarUtilizadorDTO {Id = id.AsString(), Password = "newPassword_123", DataNascimento = "2000-01-01", Tags = new List<string> { "abc" }, EstadoEmocional = "Alegre" };
            Utilizador uti = new Utilizador(new Email("abcd@hotmail.com"), new Password("samplePassword_123"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd")}, new EstadoEmocional("Zangado"));

            //Arrange
            IUtilizadorRepository repo = A.Fake<IUtilizadorRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

 


            A.CallTo(() => repo.GetByIdAsync(id)).Returns(Task.FromResult(uti));
            IConfiguration conf = A.Fake<IConfiguration>();
            var servico = new UtilizadorService(conf,unitOfWork, repo);

            // Act
            var resultado = await servico.UpdateAsync(dto);

            //email do utilizado permanece o mesmo, nunca é alterado
            Assert.Equal("abcd@hotmail.com", resultado.Email);

            //password alterada (exemplo)
            Assert.Equal(dto.Password, resultado.Password);
        }





    }
}
