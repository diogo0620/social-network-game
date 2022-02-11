import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IRede } from 'src/app/interfaces/IRede';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { ClassificacaoService } from 'src/app/services/classificacoes/classificacao.service';

import { ClassificacaoComponent } from './classificacao.component';

describe('ClassificacaoComponent', () => {
  let component: ClassificacaoComponent;
  let fixture: ComponentFixture<ClassificacaoComponent>;
  let html : any;
  let classificacaoService : ClassificacaoService;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let utilizadorC : IUtilizador = {id: "3", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorC@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador C", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };

  let classificao1 : IRede = {utilizador: utilizadorA, dimensao: 1, fortaleza: 3};
  let classificao2 : IRede = {utilizador: utilizadorB, dimensao: 2, fortaleza: 4};
  let classificao3 : IRede = {utilizador: utilizadorC, dimensao: 3, fortaleza: 1};

  let classificacoes : IRede[] = [classificao1,classificao2,classificao3 ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ClassificacaoComponent ],
      providers: [ClassificacaoService]
    })
    .compileComponents();

    classificacaoService = TestBed.inject(ClassificacaoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    spyOn(classificacaoService, 'getClassificacao').and.returnValue(of(classificacoes));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('A opção selecionada por defeito deve ser a Dimensão.', () => {
    expect(component.opcaoDimensao).toBeTrue();
    expect(component.opcaoFortaleza).toBeFalse();
  })

  it('Deve pedir as classificações e guarda-las (ordenadas pela opção selecionada).', () => {
    expect(component.classificacoes.length).toEqual(classificacoes.length);
    expect(component.classificacoes[0]).toEqual(classificao3);
    expect(component.classificacoes[1]).toEqual(classificao2);
    expect(component.classificacoes[2]).toEqual(classificao1);
    expect(component.aCarregar).toBeFalse();
  });

  it('Uma ordenação é feita sempre que é alterada a opção de classificação e os resultados são atualizados.', () => {

    // Ordenado por dimensão (opcao por defeito).
    expect(component.classificacoes.length).toEqual(classificacoes.length);
    expect(component.classificacoes[0]).toEqual(classificao3);
    expect(component.classificacoes[1]).toEqual(classificao2);
    expect(component.classificacoes[2]).toEqual(classificao1);
    component.opcao(2);

    // Ordenado por fortaleza (opção escolhida)
    expect(component.classificacoes.length).toEqual(classificacoes.length);
    expect(component.classificacoes[0]).toEqual(classificao2);
    expect(component.classificacoes[1]).toEqual(classificao1);
    expect(component.classificacoes[2]).toEqual(classificao3);
  })

  it('Garantir que são apresentados os dados em conformidade com as classificações recebidas.', () =>{
    expect(component.classificacoes[0]).toEqual(classificao3);
    expect(component.classificacoes[1]).toEqual(classificao2);
    expect(component.classificacoes[2]).toEqual(classificao1);

    var nomes = html.querySelectorAll('.info-pessoal h2');
    var emails = html.querySelectorAll('.info-pessoal p');
    var pontos = html.querySelectorAll('.pontos p');

    expect(nomes[0].textContent).toEqual(classificao3.utilizador.nome);
    expect(nomes[1].textContent).toEqual(classificao2.utilizador.nome);
    expect(nomes[2].textContent).toEqual(classificao1.utilizador.nome);

    expect(emails[0].textContent).toEqual(classificao3.utilizador.email);
    expect(emails[1].textContent).toEqual(classificao2.utilizador.email);
    expect(emails[2].textContent).toEqual(classificao1.utilizador.email);

    expect(pontos[0].textContent).toEqual(classificao3.dimensao.toString());
    expect(pontos[1].textContent).toEqual(classificao3.fortaleza.toString());
    expect(pontos[2].textContent).toEqual(classificao2.dimensao.toString());
    expect(pontos[3].textContent).toEqual(classificao2.fortaleza.toString());
    expect(pontos[4].textContent).toEqual(classificao1.dimensao.toString());
    expect(pontos[5].textContent).toEqual(classificao1.fortaleza.toString());
  })


  it('Garantir que as opções podem ser alteradas.',()=> {
    expect(component.opcaoDimensao).toBeTrue();
    expect(component.opcaoFortaleza).toBeFalse();
    expect(component.opcaoStyle[1]).toEqual('opcao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');
    component.opcao(2);
    expect(component.opcaoDimensao).toBeFalse();
    expect(component.opcaoFortaleza).toBeTrue();
    expect(component.opcaoStyle[1]).toEqual('opcao-nao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-selecionada');
    component.opcao(1);
    expect(component.opcaoDimensao).toBeTrue();
    expect(component.opcaoFortaleza).toBeFalse();
    expect(component.opcaoStyle[1]).toEqual('opcao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');
  })



});
