import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AceitarPedidoLigacaoComponent } from './aceitar-pedido-ligacao.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IUniform } from 'three';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { IPedido } from '../../interfaces/IPedido';
import { PedidosLigacaoService } from '../../services/pedidosLigacao/pedidos-ligacao.service';
import { of } from 'rxjs';

describe('AceitarPedidoLigacaoComponent', () => {
  let component: AceitarPedidoLigacaoComponent;
  let fixture: ComponentFixture<AceitarPedidoLigacaoComponent>;
  let html : any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };

  let pedido : IPedido = {id: "123", tipo:"Ligação",tags: ["aaa", "bbb"], deUtilizador: utilizadorA,paraUtilizador: utilizadorB, utilizadorObjetivo: utilizadorA, data:"2020-01-01", estado: "Pendente", forcaLigacao:45, mensagem:"Quero ser teu amigo."  };
  let pedidoAceite : IPedido = {id: "123", tipo:"Ligação",tags: ["aaa", "bbb"], deUtilizador: utilizadorA,paraUtilizador: utilizadorB, utilizadorObjetivo: utilizadorA, data:"2020-01-01", estado: "Aceite", forcaLigacao:45, mensagem:"Quero ser teu amigo."  };

  let pedidosLigacaoService : PedidosLigacaoService;

  let id = "123";
  let tags = ["Netflix", "Cinema"];
  let forca = 88;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ AceitarPedidoLigacaoComponent ],
      providers : [PedidosLigacaoService]
    })
    .compileComponents();

    pedidosLigacaoService = TestBed.inject(PedidosLigacaoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceitarPedidoLigacaoComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;


    spyOn(pedidosLigacaoService, 'aceitarPedido').withArgs(id, tags, forca).and.returnValue(of(pedidoAceite));
    component.pedido = pedido;
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('No titulo deve aparecer o nome do utilizador que enviou o pedido.', ()=> {
    expect(html.querySelector('.topo h2').textContent).toContain('Aceitar pedido de ligação de '+utilizadorA.nome);
  })

  it('A força de ligação deve começar a 50.', () => {
    expect(html.querySelector('.forca output').textContent).toContain('50');
  })

  /*
  it('As tags e a força de ligação são enviadas para o servidor.', () => {
    component.formAceitarLigacao.patchValue({'tags':"Netflix, Cinema", 'forcaLigacao':forca});
    component.aceitar();
  })

*/



});
