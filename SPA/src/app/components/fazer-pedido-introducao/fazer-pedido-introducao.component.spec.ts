import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ILigacao } from '../../interfaces/ILigacao';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';

import { FazerPedidoIntroducaoComponent } from './fazer-pedido-introducao.component';

describe('FazerPedidoIntroducaoComponent', () => {
  let component: FazerPedidoIntroducaoComponent;
  let fixture: ComponentFixture<FazerPedidoIntroducaoComponent>;
  let html : any;

  let utilizador : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };

  let utilizadorA : IUtilizador = {id: "2", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorC@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador C", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "3", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorD@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador D", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let amigosEmComum : IUtilizador[] = [utilizadorA, utilizadorB];

  let ligacoesService : LigacoesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ FazerPedidoIntroducaoComponent ],
      providers: [LigacoesService]
    }).compileComponents();

    ligacoesService = TestBed.inject(LigacoesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerPedidoIntroducaoComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    component.utilizador = utilizador;

    spyOn(ligacoesService, 'getAmigosEmComumCom').withArgs(utilizador.id).and.returnValue(of(amigosEmComum));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('Devem ser carregados os amigos em comum entre os dois utilizadores, para definir os possiveis intermediarios.', () => {
    expect(component.intermediarios).toEqual(amigosEmComum);
    expect(component.aPesquisarAmigosEmComum).toBeFalse();
  })

  it('Devem ser apresentados os possiveis intermediários ao utilizador.', () => {
    const opcoes = html.querySelectorAll('option');
    expect(opcoes.length).toEqual(amigosEmComum.length);
    expect(opcoes[0].textContent).toEqual(utilizadorA.nome +" ("+utilizadorA.email+")");
    expect(opcoes[1].textContent).toEqual(utilizadorB.nome +" ("+utilizadorB.email+")");
  })

  it('Deve ser apresentado o nome do utilizador no topo da janela.', () => {
    expect(html.querySelector('.topo h2').textContent).toEqual("Enviar pedido de introdução para " +utilizador.nome);
  })
});
