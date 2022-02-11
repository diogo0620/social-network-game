import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PedidosLigacaoService } from 'src/app/services/pedidosLigacao/pedidos-ligacao.service';
import { IPedido } from '../../interfaces/IPedido';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { PedidosIntroducaoService } from '../../services/pedidosIntroducao/pedidos-introducao.service';

import { MiniPedidosComponent } from './mini-pedidos.component';

describe('MiniPedidosComponent', () => {
  let component: MiniPedidosComponent;
  let fixture: ComponentFixture<MiniPedidosComponent>;
  let html : any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let utilizadorC : IUtilizador = {id: "3", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorC@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador C", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };

  let pedidoA : IPedido = {id: "1", data:"2020-01-01 19:40", deUtilizador: utilizadorA, paraUtilizador: utilizadorB, estado: "PENDENTE", forcaLigacao: 5, mensagem: "Mensagem do Pedido A", tags: ["aaa", "bb"], tipo:"Ligação", utilizadorObjetivo: utilizadorC};
  let pedidoB : IPedido = {id: "2", data:"2020-01-01 19:44", deUtilizador: utilizadorB, paraUtilizador: utilizadorC, estado: "ACEITE", forcaLigacao: 10, mensagem: "Mensagem do Pedido B", tags: ["bbb", "cc"], tipo:"Ligação", utilizadorObjetivo: utilizadorA};
  let pedidoC : IPedido = {id: "3", data:"2020-01-01 19:41", deUtilizador: utilizadorC, paraUtilizador: utilizadorA, estado: "RECUSADO", forcaLigacao: 25, mensagem: "Mensagem do Pedido C", tags: ["ccc", "dd"], tipo:"Ligação", utilizadorObjetivo: utilizadorB};
  let pedidosLigacao : IPedido[] = [pedidoA, pedidoB, pedidoC];

  let pedidoD : IPedido = {id: "4", data:"2020-01-01 19:43", deUtilizador: utilizadorA, paraUtilizador: utilizadorB, estado: "PENDENTE", forcaLigacao: 5, mensagem: "Mensagem do Pedido A", tags: ["aaa", "bb"], tipo:"Introdução", utilizadorObjetivo: utilizadorC};
  let pedidoE : IPedido = {id: "5", data:"2020-01-01 19:49", deUtilizador: utilizadorB, paraUtilizador: utilizadorC, estado: "PENDENTE", forcaLigacao: 10, mensagem: "Mensagem do Pedido B", tags: ["bbb", "cc"], tipo:"Introdução", utilizadorObjetivo: utilizadorA};
  let pedidoF : IPedido = {id: "6", data:"2020-01-01 19:42", deUtilizador: utilizadorC, paraUtilizador: utilizadorA, estado: "PENDENTE", forcaLigacao: 25, mensagem: "Mensagem do Pedido C", tags: ["ccc", "dd"], tipo:"Introdução", utilizadorObjetivo: utilizadorB};
  let pedidosIntroducao : IPedido[] = [pedidoD, pedidoE, pedidoF];

  let pedidosLigacaoService : PedidosLigacaoService;
  let pedidosIntroducaoService : PedidosIntroducaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ MiniPedidosComponent],
      providers: [PedidosLigacaoService, PedidosIntroducaoService]
    })
    .compileComponents();

    pedidosLigacaoService = TestBed.inject(PedidosLigacaoService);
    pedidosIntroducaoService = TestBed.inject(PedidosIntroducaoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPedidosComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(pedidosLigacaoService,'getPedidosPendentesDoUtilizadorAutenticado' ).and.returnValue(of(pedidosLigacao));
    spyOn(pedidosIntroducaoService, 'getTodosPedidosDoUtilizadorAutenticado').and.returnValue(of(pedidosIntroducao));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('A opçao por defeito deve ser a de pedidos de ligação.', () => {
    expect(component.tipoPedidoSelecionado).toEqual('Ligação');
  });

  it('Os tipos de pedidos possiveis devem ser ligação e introdução.', () => {
    expect(component.tiposPedido).toEqual(["Ligação", "Introdução"]);
  });

  it('No inicio, devem ser carregados os pedidos de ligação.', () => {
    expect(component.pedidos).toEqual(pedidosLigacao);
  })

  it('No momento em que a opção é alterada, os pedidos devem ser carregados novamente.', () => {
    expect(component.pedidos).toEqual(pedidosLigacao);
    component.alterarTipoPedido("Introdução");
    expect(component.pedidos).toEqual(pedidosIntroducao);
    component.alterarTipoPedido("Ligação");
    expect(component.pedidos).toEqual(pedidosLigacao);
  })

  it('Devem ser apresentados para cada pedido, o nome de quem enviou e a respetiva mensagem.', () => {
    const nomes = html.querySelectorAll('.info-pedido h2');
    const mensagens = html.querySelectorAll('.info-pedido p');
    expect(nomes[0].textContent).toEqual(pedidoA.deUtilizador.nome);
    expect(nomes[1].textContent).toEqual(pedidoB.deUtilizador.nome);
    expect(nomes[2].textContent).toEqual(pedidoC.deUtilizador.nome);

    expect(mensagens[0].textContent).toEqual(pedidoA.mensagem);
    expect(mensagens[1].textContent).toEqual(pedidoB.mensagem);
    expect(mensagens[2].textContent).toEqual(pedidoC.mensagem);
  })

  it('Quando uma opção é alterada, os pedidos apresentados devem ser atualizados.', () => {
    var nomes = html.querySelectorAll('.info-pedido h2');
    var mensagens = html.querySelectorAll('.info-pedido p');
    expect(nomes[0].textContent).toEqual(pedidoA.deUtilizador.nome);
    expect(nomes[1].textContent).toEqual(pedidoB.deUtilizador.nome);
    expect(nomes[2].textContent).toEqual(pedidoC.deUtilizador.nome);

    expect(mensagens[0].textContent).toEqual(pedidoA.mensagem);
    expect(mensagens[1].textContent).toEqual(pedidoB.mensagem);
    expect(mensagens[2].textContent).toEqual(pedidoC.mensagem);

    component.alterarTipoPedido('Introdução');
    fixture.detectChanges();

    nomes = html.querySelectorAll('.info-pedido h2');
    mensagens = html.querySelectorAll('.info-pedido p');

    expect(nomes[0].textContent).toEqual(pedidoD.deUtilizador.nome);
    expect(nomes[1].textContent).toEqual(pedidoE.deUtilizador.nome);
    expect(nomes[2].textContent).toEqual(pedidoF.deUtilizador.nome);

    expect(mensagens[0].textContent).toEqual(pedidoD.mensagem);
    expect(mensagens[1].textContent).toEqual(pedidoE.mensagem);
    expect(mensagens[2].textContent).toEqual(pedidoF.mensagem);
  })


});
