using FakeItEasy;
using MDR.Domain.Shared;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Extensions.Configuration;

namespace Tests.PedidosLigacao
{
    public class PedidoLigacaoServiceTest
    {
        [Fact]
        public void GetPedidosLigacao_Retorna_O_Numero_Certo_De_Pedidos()
        {
            //Arrange
            int numeroPedidos = 5;
            var fakePedidos = A.CollectionOfDummy<PedidoLigacao>(numeroPedidos).ToList();

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            UtilizadorService utilizadorService = A.Fake<UtilizadorService>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

    
            A.CallTo(() => pedidoLigacaoRepo.GetAllAsync()).Returns(Task.FromResult(fakePedidos));
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var result = servico.GetAllAsync();

            //Assert
            Assert.Equal(fakePedidos.Count, numeroPedidos);

        }

        [Fact]
        public async void GetByID_Retorna_O_Pedido_Com_ID_Pedido()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));

            PedidoLigacao dummyPedido = new(u1, u2, A.Fake<MensagemLigacao>(), A.Fake<ForcaLigacao>(), A.CollectionOfDummy<Tag>(1).ToList());

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo);



            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => pedidoLigacaoRepo.GetByIdAsync(dummyPedido.Id)).Returns(Task.FromResult(dummyPedido));
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.GetByIdAsync(dummyPedido.Id);

            //Assert
            Assert.Equal(resultado.Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void GetByID_Retorna_Null_Se_O_ID_For_Null()
        {
            //Arrange

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            UtilizadorService utilizadorService = A.Fake<UtilizadorService>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            A.CallTo(() => pedidoLigacaoRepo.GetByIdAsync(null)).Returns<PedidoLigacao>(null);
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.GetByIdAsync(null);

            //Assert
            Assert.Null(resultado);
        }

        [Fact]
        public async void GetByID_E_Utilizador()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));

            PedidoLigacao dummyPedido = new(u1, u2, A.Fake<MensagemLigacao>(), A.Fake<ForcaLigacao>(), A.CollectionOfDummy<Tag>(1).ToList());

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo);



            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => pedidoLigacaoRepo.GetByParaUtilizador_E_IdAsync(u1, dummyPedido.Id)).Returns(Task.FromResult(dummyPedido));
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.GetByParaUtilizador_E_IdAsync(u1, dummyPedido.Id);

            //Assert
            Assert.Equal(resultado.Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void GetByUtilizador()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));

            PedidoLigacao dummyPedido = new(u1, u2, A.Fake<MensagemLigacao>(), A.Fake<ForcaLigacao>(), A.CollectionOfDummy<Tag>(1).ToList());

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo); 

            List<PedidoLigacao> list = new List<PedidoLigacao>{dummyPedido};

            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => pedidoLigacaoRepo.GetByParaUtilizadorAsync(u1)).Returns(Task.FromResult(list));
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.GetByParaUtilizadorAsync(u1);

            //Assert
            Assert.Equal(list.Count, resultado.Count());
            Assert.Equal(resultado.First().Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void GetByUtilizador_E_Estado()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");

            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));

            PedidoLigacao dummyPedido = new(u1, u2, A.Fake<MensagemLigacao>(), A.Fake<ForcaLigacao>(), A.CollectionOfDummy<Tag>(1).ToList());

            List<PedidoLigacao> list = new List<PedidoLigacao>{dummyPedido};

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo);


            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => pedidoLigacaoRepo.GetByParaUtilizador_E_EstadoAsync(u1,EstadoPedido.PENDENTE)).Returns(list);
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.GetByParaUtilizador_E_EstadoAsync(u1,EstadoPedido.PENDENTE);

            //Assert
            Assert.Equal(list.Count, resultado.Count());
            Assert.Equal(resultado.First().Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void AddAsync_Retorna_Pedido()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            CriarPedidoLigacaoDTO dto = new CriarPedidoLigacaoDTO{DeUtilizadorId = u1.AsString(), ParaUtilizadorId = u2.AsString(), Mensagem = "teste", ForcaLigacao = 4, Tags = new List<string> { "abc" }};
            PedidoLigacao dummyPedido = new(u1, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), dto.Tags.ConvertAll<Tag>(t => new Tag(t)).ToList());
            dummyPedido.aceitar();

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utilizadorRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utilizadorRepo);

            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd")}, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd")}, new EstadoEmocional("Zangado"));

            A.CallTo(() => pedidoLigacaoRepo.AddAsync(A.Dummy<PedidoLigacao>())).Returns(Task.FromResult(dummyPedido));
            A.CallTo(() => pedidoLigacaoRepo.GetByUtilizadores_E_EstadoAsync(u1, u2, EstadoPedido.PENDENTE)).Returns<PedidoLigacao>(null);
            A.CallTo(() => pedidoLigacaoRepo.GetByUtilizadores_E_EstadoAsync(u2, u1, EstadoPedido.PENDENTE)).Returns<PedidoLigacao>(null);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.AddAsync(dto);

            //Assert
            Assert.Equal(resultado.DeUtilizador.Id, uti1.Id.AsString());
            Assert.Equal(resultado.ParaUtilizador.Id, uti2.Id.AsString());
        }

        [Fact]
        public async void AddSync_Retorna_Pedido()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            CriarPedidoLigacaoDTO dto = new CriarPedidoLigacaoDTO{DeUtilizadorId = u1.AsString(), ParaUtilizadorId = u2.AsString(), Mensagem = "teste", ForcaLigacao = 4, Tags = new List<string> { "abc" }};
            PedidoLigacao dummyPedido = new(u1, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), dto.Tags.ConvertAll<Tag>(t => new Tag(t)).ToList());
            dummyPedido.aceitar();

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utilizadorRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utilizadorRepo);

            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd")}, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd")}, new EstadoEmocional("Zangado"));

            A.CallTo(() => pedidoLigacaoRepo.AddAsync(A.Dummy<PedidoLigacao>())).Returns(Task.FromResult(dummyPedido));
            A.CallTo(() => pedidoLigacaoRepo.GetByUtilizadores_E_EstadoAsync(u1, u2, EstadoPedido.PENDENTE)).Returns<PedidoLigacao>(null);
            A.CallTo(() => pedidoLigacaoRepo.GetByUtilizadores_E_EstadoAsync(u2, u1, EstadoPedido.PENDENTE)).Returns<PedidoLigacao>(null);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.AddSync(dto);

            //Assert
            Assert.Equal(resultado.DeUtilizador.Id, uti1.Id.AsString());
            Assert.Equal(resultado.ParaUtilizador.Id, uti2.Id.AsString());
        }

        [Fact]
        public async void UpdateAsync_Retorna_Pedido()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));

            PedidoLigacaoId pId = new PedidoLigacaoId("12345678-1234-1234-1234-111111111113");
            EditarPedidoLigacaoDTO dto = new EditarPedidoLigacaoDTO{Id = "12345678-1234-1234-1234-111111111113", ForcaLigacao = 4, Tags = new List<string> { "abc" }, Estado = "Pendente"};
            PedidoLigacao dummyPedido = new(u1, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), dto.Tags.ConvertAll<Tag>(t => new Tag(t)).ToList());

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo);


            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => pedidoLigacaoRepo.AddAsync(A.Dummy<PedidoLigacao>())).Returns(Task.FromResult(dummyPedido));
            A.CallTo(() => pedidoLigacaoRepo.GetByParaUtilizador_E_IdAsync(u1, pId)).Returns<PedidoLigacao>(dummyPedido);
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act
            var resultado = await servico.UpdateAsync(dto, u1);

            //Assert
            Assert.Equal(resultado.DeUtilizador.Id, uti1.Id.AsString());
            Assert.Equal(resultado.ParaUtilizador.Id, uti2.Id.AsString());
        }

        [Fact]
        public async void DeleteAsync_Remove_Pedido()
        {
            //Arrange
            UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
            UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
            Utilizador uti1 = new Utilizador(new Email("abcd@hotmail.com"), new Password("Password_1"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));
            Utilizador uti2 = new Utilizador(new Email("efgh@hotmail.com"), new Password("Password_2"), null, new DataNascimento("2000-01-02"), null, null, null, null, null, null, new List<Tag> { new Tag("abcd") }, new EstadoEmocional("Zangado"));

            PedidoLigacaoId pId = new PedidoLigacaoId("12345678-1234-1234-1234-111111111113");
            EditarPedidoLigacaoDTO dto = new EditarPedidoLigacaoDTO{Id = "12345678-1234-1234-1234-111111111113", ForcaLigacao = 4, Tags = new List<string> { "abc" }, Estado = "ENVIADO"};
            PedidoLigacao dummyPedido = new(u1, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), dto.Tags.ConvertAll<Tag>(t => new Tag(t)).ToList());

            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            LigacaoService ligacaoService = A.Fake<LigacaoService>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo);


            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult<Utilizador>(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult<Utilizador>(uti2));

            A.CallTo(() => pedidoLigacaoRepo.GetByIdAsync(pId)).Returns(dummyPedido);
            var servico = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, utilizadorService, ligacaoService);

            // Act


               
            var resultado = await servico.DeleteAsync(pId);

            //Assert
            Assert.Equal(resultado.DeUtilizador.Id, uti1.Id.AsString());
            Assert.Equal(resultado.ParaUtilizador.Id, uti2.Id.AsString());
        }

    }
}
