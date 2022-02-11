using FakeItEasy;
using MDR.Domain.Shared;
using MDR.Domain.Utilizadores;
using MDR.Domain.Ligacoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using MDR.Mappers;
using MDR.Domain.Planeamento;
using Microsoft.Extensions.Configuration;

namespace Tests.Ligacoes
{
    public class LigacoesServiceTest
    {

        private static Utilizador utilizador1 = new(new Email("test@gmail.com"), new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag> { new Tag("Tag test") }, new EstadoEmocional("ALEGRE"));
        private static Utilizador utilizador2 = new(new Email("teste@gmail.com"), new Password("Test123_"), null, new DataNascimento("2000-01-01"), null, null, null, null, null, null, new List<Tag> { new Tag("Tag test") }, new EstadoEmocional("ALEGRE"));
        private static UtilizadorId uti1 = new UtilizadorId(Guid.NewGuid());
        private static UtilizadorId uti2 = new UtilizadorId(Guid.NewGuid());
        private static UtilizadorId uti3 = new UtilizadorId(Guid.NewGuid());
        private static UtilizadorId uti4 = new UtilizadorId(Guid.NewGuid());
        private static UtilizadorId uti5 = new UtilizadorId(Guid.NewGuid());
        private static Ligacao ligacao1 = new(uti1, uti3, new ForcaLigacao(1), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(1).ToList());
        private static Ligacao ligacao2 = new(uti2, uti4, new ForcaLigacao(2), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(2).ToList());
        private static Ligacao ligacao3 = new(utilizador1.Id, uti5, new ForcaLigacao(3), new ForcaRelacao(0, 0), A.CollectionOfDummy<Tag>(3).ToList());


        [Fact]
        public async void GetByID_Retorna_O_Pedido_Com_ID_Pedido()
        {
            //Arrange


            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository repo2 = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            var utiService = new UtilizadorService(conf, unitOfWork, repo2);


            A.CallTo(() => repo2.GetByIdAsync(uti1)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti3)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo.GetByIdAsync(ligacao1.Id)).Returns(Task.FromResult(ligacao1));
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);




            // Act
            var resultado = await servico.GetByIdAsync(ligacao1.Id);

            //Assert
            Assert.Equal(resultado.Id, ligacao1.Id.AsString());
        }


        [Fact]
        public async void GetByID_Retorna_Null_Se_O_ID_For_Null()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository repo2 = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            var utiService = new UtilizadorService(conf, unitOfWork, repo2);

            
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);

            // Act
            var resultado = await servico.GetByIdAsync(null);

            //Assert
            Assert.Null(resultado);
        }

        [Fact]
        public async void GetAll_Retorna_Todas_As_Ligacoes_Existentes()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository repo2 = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            var utiService = new UtilizadorService(conf, unitOfWork, repo2);

           

            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);



            List<Ligacao> ligacoes = new List<Ligacao> { ligacao1, ligacao2, ligacao3 };
            int numeroLigacoes = ligacoes.Count;
            // Act

            A.CallTo(() => repo2.GetByIdAsync(uti1)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti2)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti3)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti4)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti5)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(utilizador1.Id)).Returns(Task.FromResult(utilizador1));


            A.CallTo(() => repo.GetAllAsync()).Returns(Task.FromResult(ligacoes));

            var resultados = await servico.GetAllAsync();
            var primeiroResultado = resultados.ElementAt(0);
            var segundoResultado = resultados.ElementAt(1);
            var terceiroResultado = resultados.ElementAt(2);
            int numeroResultados = resultados.Count;

            //Assert

            // 1. Verificar o número de resultados
            // 2. Verificar que o primeiro resultado coincide com o primeiro elemento da lista.
            // 3. Verificar que o segundo resultado coincide com o segundo elemento da lista.
            // 4. Verificar que o terceiro resultado coincide com o terceiro elemento da lista.
            Assert.Equal(numeroLigacoes, numeroResultados);
            Assert.Equal(primeiroResultado.Id, ligacao1.Id.AsString());
            Assert.Equal(segundoResultado.Id, ligacao2.Id.AsString());
            Assert.Equal(terceiroResultado.Id, ligacao3.Id.AsString());
        }

        [Fact]
        public async void GetByUtilizadorA_Retorna_Todas_As_Ligacoes_Com_O_UtilizadorA()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository repo2 = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            var utiService = new UtilizadorService(conf,unitOfWork, repo2);

          
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);




            List<Ligacao> ligacoes = new List<Ligacao> { ligacao1, ligacao3 };
            int numeroLigacoes = ligacoes.Count;

            UtilizadorId utilizadorA = A.Fake<UtilizadorId>();
            // Act

            A.CallTo(() => repo2.GetByIdAsync(uti1)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti2)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti3)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti4)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti5)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(utilizador1.Id)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo.GetByUtilizadorAAsync(utilizadorA)).Returns(Task.FromResult(ligacoes));
            var resultados = await servico.GetByUtilizadorAAsync(utilizadorA);
            var primeiroResultado = resultados.ElementAt(0);
            var segundoResultado = resultados.ElementAt(1);
            int numeroResultados = resultados.Count;

            //Assert

            // 1. Verificar o número de resultados
            // 2. Verificar que o primeiro resultado coincide com o primeiro elemento da lista.
            // 3. Verificar que o segundo resultado coincide com o terceiro elemento da lista.
            Assert.Equal(numeroLigacoes, numeroResultados);
            Assert.Equal(primeiroResultado.Id, ligacao1.Id.AsString());
            Assert.Equal(segundoResultado.Id, ligacao3.Id.AsString());

        }


        [Fact]
        public async void GetByUtilizadorA_e_ID_Retorna_Apenas_Se_A_Ligacao_Com_Id_Fizer_Referencia_Ao_UtilizadorA()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository repo2 = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            var utiService = new UtilizadorService(conf,unitOfWork, repo2);

            
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);



            // Act
            A.CallTo(() => repo2.GetByIdAsync(uti2)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti4)).Returns(Task.FromResult(utilizador1));


            A.CallTo(() => repo.GetByIdAsync(ligacao2.Id)).Returns(Task.FromResult(ligacao2));
            var resultado = await servico.GetByUtilizadorA_E_IdAsync(uti1, ligacao2.Id);

            //Assert

            Assert.Null(resultado);

        }

        [Fact]
        public async void GetByUtilizadores_Retorna_Todos_Os_Resultados()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository repo2 = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();
            var utiService = new UtilizadorService(conf,unitOfWork, repo2);

         
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);


            // Act


            A.CallTo(() => repo2.GetByIdAsync(uti2)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => repo2.GetByIdAsync(uti4)).Returns(Task.FromResult(utilizador1));

            A.CallTo(() => repo.GetByUtilizadoresAsync(uti1, uti2)).Returns(Task.FromResult(ligacao2));
            var resultado = await servico.GetByUtilizadoresAsync(uti1, uti2);

            //Assert

            Assert.Equal(ligacao2.Id.AsString(), resultado.Id);
        }

        [Fact]
        public async Task Add_Falha_Se_O_Utilizador1_Nao_For_Especificado_Ou_Nao_Existir()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();

            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utiService = new UtilizadorService(conf,unitOfWork, utiRepo);

       
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);


            CriarLigacaoDTO dto = new CriarLigacaoDTO { UtilizadorAId = uti1.AsString(), UtilizadorBId = uti2.AsString(), ForcaLigacao = 4, Tags = A.CollectionOfDummy<string>(2).ToList() };
            A.CallTo(() => utiRepo.GetByIdAsync(uti1)).Returns<Utilizador>(null);

            // Act

            //Assert

            await Assert.ThrowsAsync<BusinessRuleValidationException>(() => servico.AddSync(dto));
        }


        [Fact]
        public async void Add_Falha_Se_O_Utilizador2_Nao_For_Especificado_Ou_Nao_Existir()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();

            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utiService = new UtilizadorService(conf,unitOfWork, utiRepo);

 
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);



            CriarLigacaoDTO dto = new CriarLigacaoDTO { UtilizadorAId = uti1.AsString(), UtilizadorBId = uti2.AsString(), ForcaLigacao = 4, Tags = A.CollectionOfDummy<string>(2).ToList() };
            A.CallTo(() => utiRepo.GetByIdAsync(uti1)).Returns(utilizador1);
            A.CallTo(() => utiRepo.GetByIdAsync(uti2)).Returns<Utilizador>(null);

            // Act

            //Assert

            await Assert.ThrowsAsync<BusinessRuleValidationException>(() => servico.AddSync(dto));
        }

        /*
        [Fact]
        public async void Add_Retorna_A_Ligacao_Criada()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();

            UtilizadorService utiService = new UtilizadorService(unitOfWork, utiRepo);

            IConfiguration conf = A.Fake<IConfiguration>();
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf,servico, utiService);


            CriarLigacaoDTO dto = new CriarLigacaoDTO { UtilizadorAId = utilizador1.Id.AsString(), UtilizadorBId = utilizador2.Id.AsString(), ForcaLigacao = 4, Tags = new List<string> {"ABCD", "sdda" } };
 
            A.CallTo(() => utiRepo.GetByIdAsync(utilizador1.Id)).Returns(utilizador1);
            A.CallTo(() => utiRepo.GetByIdAsync(utilizador2.Id)).Returns(utilizador2);
     

            // Act

            var resultado = await servico.AddSync(dto);

            //Assert
            Assert.NotNull(resultado.Id);
            Assert.Equal(dto.UtilizadorAId, resultado.UtilizadorA.Id);
            Assert.Equal(dto.UtilizadorBId, resultado.UtilizadorB.Id);
            Assert.Equal(dto.ForcaLigacao, resultado.ForcaLigacao);
            Assert.Equal(dto.Tags, resultado.Tags);


        }
        */

        [Fact]
        public async void Update_Retorna_Null_Se_O_Utilizador_Que_Esta_A_Tentar_Editar_Nao_For_O_UtilizadorA()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();


            IConfiguration conf = A.Fake<IConfiguration>();
            UtilizadorService utiService = new UtilizadorService(conf,unitOfWork, utiRepo);
            EditarLigacaoDTO dto = new EditarLigacaoDTO { Id = ligacao1.Id.AsString(), ForcaLigacao = 5, Tags = new List<string> { "abc", "def" } };
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);




            A.CallTo(() => repo.GetByIdAsync(ligacao1.Id)).Returns(ligacao1);


            // Act
            var resultado = await servico.UpdateAsync(dto, utilizador2.Id);

            //Assert
            Assert.Null(resultado);


        }



        [Fact]
        public async void Update_Atualiza_Ligacao_E_Retorna_DTO_Atualizado()
        {
            //Arrange

            ILigacaoRepository repo = A.Fake<ILigacaoRepository>();
            IUnitOfWork unitOfWork = A.Fake<IUnitOfWork>();

            IUtilizadorRepository utiRepo = A.Fake<IUtilizadorRepository>();
            IConfiguration conf = A.Fake<IConfiguration>();

            UtilizadorService utiService = new UtilizadorService(conf,unitOfWork, utiRepo);
            
            var servico = new LigacaoService(conf, unitOfWork, repo, utiService);
            PlaneamentoService plaService = new PlaneamentoService(conf, servico, utiService);
            EditarLigacaoDTO dto = new EditarLigacaoDTO { Id = ligacao3.Id.AsString(), ForcaLigacao = 5, Tags = new List<string> { "atualizada", "tag" } };


            A.CallTo(() => utiRepo.GetByIdAsync(utilizador1.Id)).Returns(Task.FromResult(utilizador1));
            A.CallTo(() => utiRepo.GetByIdAsync(uti5)).Returns(Task.FromResult(utilizador1));

            A.CallTo(() => repo.GetByIdAsync(ligacao3.Id)).Returns(ligacao3);


            // Act
            var resultado = await servico.UpdateAsync(dto, utilizador1.Id);


            //Assert
            Assert.Equal(dto.Id, resultado.Id);
            Assert.Equal(dto.ForcaLigacao, resultado.ForcaLigacao);
            Assert.Equal(dto.Tags, resultado.Tags);



        }










    }
}