using FakeItEasy;
using MDR.Domain.Shared;
using MDR.Domain.PedidosLigacao;
using MDR.Domain.PedidosIntroducao;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Extensions.Configuration;
using MDR.Domain.Planeamento;

namespace Tests.PedidosIntroducao
{
    public class PedidoIntroducaoServiceTest
    {

        private static UtilizadorId u1 = new UtilizadorId("12345678-1234-1234-1234-111111111111");
        private static UtilizadorId u2 = new UtilizadorId("12345678-1234-1234-1234-111111111112");
        private static UtilizadorId u3 = new UtilizadorId("12345678-1234-1234-1234-111111111113");
        private static List<string> tags = new List<string> { "abc" };
        private static PedidoIntroducao dummyPedido = new PedidoIntroducao(u1, u2, u3, new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList(), new MensagemIntroducao("teste"), new MensagemLigacao("teste"));
        private static PedidoIntroducaoId pId = new PedidoIntroducaoId("12345678-1234-1234-1234-111111111114");

        private static IPedidoIntroducaoRepository pedidoIntroducaoRepo = A.Fake<IPedidoIntroducaoRepository>();
        private static IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
        
        private static LigacaoService ligacaoService = A.Fake<LigacaoService>();
        private static PedidoLigacaoService pedidoLigacaoService = A.Fake<PedidoLigacaoService>();
        private static IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();
        private static IConfiguration conf = A.Fake<IConfiguration>();
        private static UtilizadorService utilizadorService = new UtilizadorService(conf,unitOfWork, utiRepo);
        private static PedidoIntroducaoService servico = new PedidoIntroducaoService(unitOfWork, pedidoIntroducaoRepo, utilizadorService, pedidoLigacaoService, ligacaoService);


        [Fact]
        public void GetPedidosIntroducao_Retorna_O_Numero_Certo_De_Pedidos()
        {
            //Arrange
            int numeroPedidos = 5;
            var fakePedidos = A.CollectionOfDummy<PedidoIntroducao>(numeroPedidos).ToList();
    
            A.CallTo(() => pedidoIntroducaoRepo.GetAllAsync()).Returns(Task.FromResult(fakePedidos));

            // Act
            var result = servico.GetAllAsync();

            //Assert
            Assert.Equal(fakePedidos.Count, numeroPedidos);
        }

        [Fact]
        public void GetPedidosIntroducao_Pelo_User_Retorna_O_Numero_Certo_De_Pedidos()
        {
            //Arrange
            int numeroPedidos = 5;
            var fakePedidos = A.CollectionOfDummy<PedidoIntroducao>(numeroPedidos).ToList();
    
            A.CallTo(() => pedidoIntroducaoRepo.GetByParaUtilizadorAsync(u1)).Returns(Task.FromResult(fakePedidos));

            // Act
            var result = servico.GetByParaUtilizadorAsync(u1);

            //Assert
            Assert.Equal(fakePedidos.Count, numeroPedidos);
        }

        [Fact]
        public async void GetById_Retorna_Pedido()
        {
            //Arrange 
            A.CallTo(() => pedidoIntroducaoRepo.GetByIdAsync(pId)).Returns(Task.FromResult(dummyPedido));

            // Act
            var result = await servico.GetByIdAsync(pId);

            //Assert
            Assert.Equal(result.Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void GetByID_Retorna_Null_Se_O_ID_For_Null()
        {
            //Arrange 
            A.CallTo(() => pedidoIntroducaoRepo.GetByIdAsync(null)).Returns<PedidoIntroducao>(null);

            // Act
            var result = await servico.GetByIdAsync(null);

            //Assert
            Assert.Null(result);
        }

        [Fact]
        public async void GetById_E_Utilizador_Retorna_Pedido()
        {

            Utilizador uti1 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti2 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti3 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            //Arrange 
            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => utiRepo.GetByIdAsync(u3)).Returns(Task.FromResult(uti3));
            //Arrange 
            A.CallTo(() => pedidoIntroducaoRepo.GetByIdAsync(pId)).Returns(Task.FromResult(dummyPedido));

            // Act
            var result = await servico.GetByParaUtilizador_E_IdAsync(u2, pId);

            //Assert
            Assert.Equal(result.Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void AddAsync_Adiciona_Pedido()
        {
            //Arrange 
            CriarPedidoIntroducaoDTO dto = new CriarPedidoIntroducaoDTO {DeUtilizadorId = u1.AsString(), ParaUtilizadorId = u2.AsString(), UtilizadorObjetivoId = u3.AsString(), ForcaLigacao = 5, Tags = new List<string> { "abc" }, MensagemIntroducao = "Mensagem intro", MensagemLigacao = "Mensagem ligação"};
            
            IUtilizadorRepository utilizadorRepo = A.Fake<IUtilizadorRepository>();
            ILigacaoRepository ligacaoRepo = A.Fake<ILigacaoRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService _utilizadorService = new UtilizadorService(conf,unitOfWork, utilizadorRepo);

           
       
            LigacaoService _ligacaoService = new LigacaoService(conf, unitOfWork, ligacaoRepo, _utilizadorService);

            Utilizador uti1 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti2 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti3 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Ligacao ligacao1 = new(u1, u2, new ForcaLigacao(1), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(1).ToList());
            Ligacao ligacao2 = new(u2, u1, new ForcaLigacao(2), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(2).ToList());
            Ligacao ligacao3 = new(u3, u1, new ForcaLigacao(3), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(3).ToList());


            var _servico = new PedidoIntroducaoService(unitOfWork, pedidoIntroducaoRepo, _utilizadorService, pedidoLigacaoService, _ligacaoService);

            A.CallTo(() => utilizadorRepo.GetByIdAsync(u1)).Returns(uti1);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u2)).Returns(uti2);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u3)).Returns(uti3);
            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u1,u2)).Returns(ligacao1);
            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u2,u3)).Returns(ligacao2);
            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u1,u3)).Returns<Ligacao>(null);

            // Act
            var result = await _servico.AddAsync(dto);

            //Assert
            Assert.Equal(result.DeUtilizador.Id, uti1.Id.AsString());
            Assert.Equal(result.ParaUtilizador.Id, uti2.Id.AsString());
            Assert.Equal(result.UtilizadorObjetivo.Id, uti3.Id.AsString());
        }

        [Fact]
        public async void UpdateAsync_Atualiza_Pedido()
        {
            //Arrange 
            EditarPedidoIntroducaoDTO dto = new EditarPedidoIntroducaoDTO {Id = pId.AsString(), Estado = "ACEITE"};
            PedidoLigacao dummyPedidoLigacao = new(u1, u2, new MensagemLigacao("teste"), new ForcaLigacao(4), tags.ConvertAll<Tag>(t => new Tag(t)).ToList());
            
            IUtilizadorRepository utilizadorRepo = A.Fake<IUtilizadorRepository>();
            ILigacaoRepository ligacaoRepo = A.Fake<ILigacaoRepository>();
            IPedidoLigacaoRepository pedidoLigacaoRepo = A.Fake<IPedidoLigacaoRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService _utilizadorService = new UtilizadorService(conf,unitOfWork, utilizadorRepo);

  
            LigacaoService _ligacaoService = new LigacaoService(conf, unitOfWork, ligacaoRepo, _utilizadorService);
            PedidoLigacaoService _pedidoLigacaoService = new PedidoLigacaoService(unitOfWork, pedidoLigacaoRepo, _utilizadorService, _ligacaoService);


            Utilizador uti1 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti2 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti3 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Ligacao ligacao1 = new(u1, new UtilizadorId(Guid.NewGuid()), new ForcaLigacao(1), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(1).ToList());
            Ligacao ligacao2 = new(u2, new UtilizadorId(Guid.NewGuid()), new ForcaLigacao(2), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(2).ToList());
            Ligacao ligacao3 = new(u3, new UtilizadorId(Guid.NewGuid()), new ForcaLigacao(3), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(3).ToList());

            var _servico = new PedidoIntroducaoService(unitOfWork, pedidoIntroducaoRepo, _utilizadorService, _pedidoLigacaoService, _ligacaoService);

            /*
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u1)).Returns(uti1);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u2)).Returns(uti2);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u3)).Returns(uti3);
            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u1,u2)).Returns(ligacao1);
            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u2,u3)).Returns(ligacao2);
            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u1,u3)).Returns<Ligacao>(null);
            */

            A.CallTo(() => ligacaoRepo.GetByUtilizadoresAsync(u1,u2)).Returns<Ligacao>(null);
            A.CallTo(() => pedidoLigacaoRepo.AddAsync(A.Dummy<PedidoLigacao>())).Returns(Task.FromResult(dummyPedidoLigacao));
            A.CallTo(() => pedidoLigacaoRepo.GetByUtilizadores_E_EstadoAsync(u1, u3, EstadoPedido.PENDENTE)).Returns<PedidoLigacao>(null);
            A.CallTo(() => pedidoLigacaoRepo.GetByUtilizadores_E_EstadoAsync(u3, u1, EstadoPedido.PENDENTE)).Returns<PedidoLigacao>(null);
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => utilizadorRepo.GetByIdAsync(u3)).Returns(Task.FromResult(uti3));
            A.CallTo(() => pedidoIntroducaoRepo.GetByIdAsync(pId)).Returns(Task.FromResult(dummyPedido));

            // Act
            var result = await _servico.UpdateAsync(dto, u2);

            //Assert
            Assert.Equal(result.Id, dummyPedido.Id.AsString());
        }

        [Fact]
        public async void DeleteAsync_Apaga_Pedido()
        {

            Utilizador uti1 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti2 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            Utilizador uti3 = new(A.Fake<Email>(), A.Fake<Password>(), new Nome("Diogo"), new DataNascimento("2000-01-01"), null, null, null, null, new Localizacao("Portugal", "Porto"), null, A.CollectionOfDummy<Tag>(1).ToList(), A.Fake<EstadoEmocional>());
            //Arrange 
            A.CallTo(() => utiRepo.GetByIdAsync(u1)).Returns(Task.FromResult(uti1));
            A.CallTo(() => utiRepo.GetByIdAsync(u2)).Returns(Task.FromResult(uti2));
            A.CallTo(() => utiRepo.GetByIdAsync(u3)).Returns(Task.FromResult(uti3));
            A.CallTo(() => pedidoIntroducaoRepo.GetByIdAsync(pId)).Returns(Task.FromResult(dummyPedido));

            // Act
            var result = await servico.DeleteAsync(pId);

            //Assert
            Assert.Equal(result.Id, dummyPedido.Id.AsString());
        }

    }
}