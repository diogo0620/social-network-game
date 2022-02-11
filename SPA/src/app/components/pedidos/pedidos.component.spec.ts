import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IPedido } from '../../interfaces/IPedido';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { PedidosIntroducaoService } from '../../services/pedidosIntroducao/pedidos-introducao.service';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';

import { PedidosComponent } from './pedidos.component';

describe('PedidosComponent', () => {
  let component: PedidosComponent;
  let fixture: ComponentFixture<PedidosComponent>;
  let html : any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let utilizadorC : IUtilizador = {id: "3", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorC@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador C", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };

  let pedidoA : IPedido = {id: "1", data:"2020-01-01 19:40", deUtilizador: utilizadorA, paraUtilizador: utilizadorB, estado: "PENDENTE", forcaLigacao: 5, mensagem: "Mensagem do Pedido A", tags: ["aaa", "bb"], tipo:"Ligação", utilizadorObjetivo: utilizadorC};
  let pedidoB : IPedido = {id: "2", data:"2020-01-01 19:44", deUtilizador: utilizadorB, paraUtilizador: utilizadorC, estado: "ACEITE", forcaLigacao: 10, mensagem: "Mensagem do Pedido B", tags: ["bbb", "cc"], tipo:"Ligação", utilizadorObjetivo: utilizadorA};
  let pedidoC : IPedido = {id: "3", data:"2020-01-01 19:41", deUtilizador: utilizadorC, paraUtilizador: utilizadorA, estado: "RECUSADO", forcaLigacao: 25, mensagem: "Mensagem do Pedido C", tags: ["ccc", "dd"], tipo:"Ligação", utilizadorObjetivo: utilizadorB};
  let pedidosLigacao : IPedido[] = [pedidoA, pedidoB, pedidoC];

  let pedidoD : IPedido = {id: "4", data:"2020-01-01 19:43", deUtilizador: utilizadorA, paraUtilizador: utilizadorB, estado: "PENDENTE", forcaLigacao: 5, mensagem: "Mensagem do Pedido A", tags: ["aaa", "bb"], tipo:"Introdução", utilizadorObjetivo: utilizadorC};
  let pedidoE : IPedido = {id: "5", data:"2020-01-01 19:49", deUtilizador: utilizadorB, paraUtilizador: utilizadorC, estado: "ACEITE", forcaLigacao: 10, mensagem: "Mensagem do Pedido B", tags: ["bbb", "cc"], tipo:"Introdução", utilizadorObjetivo: utilizadorA};
  let pedidoF : IPedido = {id: "6", data:"2020-01-01 19:42", deUtilizador: utilizadorC, paraUtilizador: utilizadorA, estado: "RECUSADO", forcaLigacao: 25, mensagem: "Mensagem do Pedido C", tags: ["ccc", "dd"], tipo:"Introdução", utilizadorObjetivo: utilizadorB};
  let pedidosIntroducao : IPedido[] = [pedidoD, pedidoE, pedidoF];

  let pedidosLigacaoService : PedidosLigacaoService;
  let pedidosIntroducaoService : PedidosIntroducaoService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ PedidosComponent ],
      providers: [PedidosLigacaoService, PedidosIntroducaoService]
    })
    .compileComponents();

    pedidosLigacaoService = TestBed.inject(PedidosLigacaoService);
    pedidosIntroducaoService = TestBed.inject(PedidosIntroducaoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(pedidosLigacaoService, 'getTodosPedidosDoUtilizadorAutenticado').and.returnValue(of(pedidosLigacao));
    spyOn(pedidosIntroducaoService, 'getTodosPedidosDoUtilizadorAutenticado').and.returnValue(of(pedidosIntroducao));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('Por defeito devem estar selecionadas as opções dos pedidos (ligação e introdução) pendentes.', () => {
    expect(component.ligacaoPendentes).toBeTrue();
    expect(component.introducaoPendentes).toBeTrue();
    expect(component.ligacaoAceites).toBeFalse();
    expect(component.ligacaoRecusados).toBeFalse();
    expect(component.introducaoAceites).toBeFalse();
    expect(component.introducaoRecusados).toBeFalse();
  })

  it('No inicio devem ser carregados apenas os pedidos (ligação e introdução) pendentes.', () => {
    expect(component.pedidos.length).toEqual(2);
    expect(component.pedidos).toContain(pedidoA);
    expect(component.pedidos).toContain(pedidoD);
  })

  it("Os pedidos devem estar ordenados por data descendente, independetemente do tipo de pedido.", () => {
    component.introducaoPendentes = true;
    component.introducaoRecusados = true;
    component.introducaoAceites = true;
    component.ligacaoPendentes = true;
    component.ligacaoRecusados = true;
    component.ligacaoAceites = true;
    component.carregarPedidos();

    expect(component.pedidos[0]).toEqual(pedidoE);
    expect(component.pedidos[1]).toEqual(pedidoB);
    expect(component.pedidos[2]).toEqual(pedidoD);
    expect(component.pedidos[3]).toEqual(pedidoF);
    expect(component.pedidos[4]).toEqual(pedidoC);
    expect(component.pedidos[5]).toEqual(pedidoA);
  })

  it('Se todas as opções dos pedidos de introdução estiverem selecionadas devem aparecer todos os pedidos de introdução.', () => {
    component.introducaoPendentes = true;
    component.introducaoRecusados = true;
    component.introducaoAceites = true;
    component.carregarPedidos();

    expect(component.pedidos).toContain(pedidosIntroducao[0]);
    expect(component.pedidos).toContain(pedidosIntroducao[1]);
    expect(component.pedidos).toContain(pedidosIntroducao[2]);
  })

  it('Se todas as opções dos pedidos de ligação estiverem selecionadas devem aparecer todos os pedidos de ligação.', () => {
    component.ligacaoPendentes = true;
    component.ligacaoRecusados = true;
    component.ligacaoAceites = true;
    component.carregarPedidos();

    expect(component.pedidos).toContain(pedidosLigacao[0]);
    expect(component.pedidos).toContain(pedidosLigacao[1]);
    expect(component.pedidos).toContain(pedidosLigacao[2]);
  })

  it('Se todas as opçoes estiverem selecionadas, devem ser carregados todos os pedidos.', () => {
    component.introducaoPendentes = true;
    component.introducaoRecusados = true;
    component.introducaoAceites = true;
    component.ligacaoPendentes = true;
    component.ligacaoRecusados = true;
    component.ligacaoAceites = true;
    component.carregarPedidos();

    expect(component.pedidos.length).toEqual(pedidosLigacao.length + pedidosIntroducao.length);
    expect(component.pedidos).toContain(pedidosLigacao[0]);
    expect(component.pedidos).toContain(pedidosLigacao[1]);
    expect(component.pedidos).toContain(pedidosLigacao[2]);
    expect(component.pedidos).toContain(pedidosIntroducao[0]);
    expect(component.pedidos).toContain(pedidosIntroducao[1]);
    expect(component.pedidos).toContain(pedidosIntroducao[2]);
  })

  it('Se apenas a opção de pedidos aceites dos pedidos de introdução estiver selecionada, só devem aparecer pedidos de introdução aceites.', () => {
    component.introducaoPendentes = false;
    component.introducaoRecusados = false;
    component.introducaoAceites = true;
    component.ligacaoPendentes = false;
    component.ligacaoRecusados = false;
    component.ligacaoAceites = false;
    component.carregarPedidos();

    expect(component.pedidos.length).toEqual(1);
    expect(component.pedidos).toContain(pedidoE);
  })

  it('Se apenas a opção de pedidos aceites dos pedidos de ligação estiver selecionada, só devem aparecer pedidos de ligação aceites.', () => {
    component.introducaoPendentes = false;
    component.introducaoRecusados = false;
    component.introducaoAceites = false;
    component.ligacaoPendentes = false;
    component.ligacaoRecusados = false;
    component.ligacaoAceites = true;
    component.carregarPedidos();

    expect(component.pedidos.length).toEqual(1);
    expect(component.pedidos).toContain(pedidoB);
  })

  it('Se apenas a opção de pedidos recusados dos pedidos de introdução estiver selecionada, só devem aparecer pedidos de introdução recusados.', () => {
    component.introducaoPendentes = false;
    component.introducaoRecusados = true;
    component.introducaoAceites = false;
    component.ligacaoPendentes = false;
    component.ligacaoRecusados = false;
    component.ligacaoAceites = false;
    component.carregarPedidos();

    expect(component.pedidos.length).toEqual(1);
    expect(component.pedidos).toContain(pedidoF);
  })

  it('Se apenas a opção de pedidos recusados dos pedidos de ligação estiver selecionada, só devem aparecer pedidos de ligação recusados.', () => {
    component.introducaoPendentes = false;
    component.introducaoRecusados = false;
    component.introducaoAceites = false;
    component.ligacaoPendentes = false;
    component.ligacaoRecusados = true;
    component.ligacaoAceites = false;
    component.carregarPedidos();

    expect(component.pedidos.length).toEqual(1);
    expect(component.pedidos).toContain(pedidoC);
  })

  it('Se nos dois tipos de pedido, estiverem selecionadas as opçãos aceites, devem ser apresentados todos os pedidos aceites.', () => {
    component.introducaoPendentes = false;
    component.introducaoRecusados = false;
    component.introducaoAceites = true;
    component.ligacaoPendentes = false;
    component.ligacaoRecusados = false;
    component.ligacaoAceites = true;
    component.carregarPedidos();
    
    expect(component.pedidos.length).toEqual(2);
    expect(component.pedidos).toContain(pedidoB);
    expect(component.pedidos).toContain(pedidoE);
  }) 

  it('Se nos dois tipos de pedido, estiverem selecionadas as opçãos recusados, devem ser apresentados todos os pedidos recusados.', () => {
    component.introducaoPendentes = false;
    component.introducaoRecusados = true;
    component.introducaoAceites = false;
    component.ligacaoPendentes = false;
    component.ligacaoRecusados = true;
    component.ligacaoAceites = false;
    component.carregarPedidos();
    
    expect(component.pedidos.length).toEqual(2);
    expect(component.pedidos).toContain(pedidoC);
    expect(component.pedidos).toContain(pedidoF);
  }) 

  it('Deve ser apresentado o nome do utilizador que fez o pedido.', () => {
    expect(html.querySelector('.pedido-esquerda h3').textContent).toEqual(component.pedidos[0].deUtilizador.nome);
  })

  it('Deve ser apresentada a data em que foi feito o pedido.', () => {
    expect(html.querySelector('.pedido-esquerda p').textContent).toEqual(component.pedidos[0].data);
  })

  it('Deve ser apresentada a mensagem do pedido.', () => {
    expect(html.querySelector('.mensagem p').textContent).toEqual(component.pedidos[0].mensagem);
  })

  it('Para os pedidos de ligção devem ser apresentadas as tags que o utilizador definiu no momento em que fez o pedido.', () => {
    expect(html.querySelectorAll('.tf p')[0].textContent).toEqual(component.pedidos[1].tags[0]);
    expect(html.querySelectorAll('.tf p')[1].textContent).toEqual(component.pedidos[1].tags[1]);
  })

  it('Para os pedidos de ligção deve ser apresentada a força de ligação que o utilizador definiu no momento em que fez o pedido.', () => {
    expect(html.querySelectorAll('.tf p')[2].textContent).toEqual(component.pedidos[1].forcaLigacao.toString());
  })




  
});
