import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IRede } from 'src/app/interfaces/IRede';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { ClassificacaoService } from 'src/app/services/classificacoes/classificacao.service';

import { MiniClassificacaoComponent } from './mini-classificacao.component';

describe('MiniClassificacaoComponent', () => {
  let component: MiniClassificacaoComponent;
  let fixture: ComponentFixture<MiniClassificacaoComponent>;
  let html : any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let utilizadorC : IUtilizador = {id: "3", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorC@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador C", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };

  let classificao1 : IRede = {utilizador: utilizadorA, dimensao: 1, fortaleza: 3};
  let classificao2 : IRede = {utilizador: utilizadorB, dimensao: 2, fortaleza: 4};
  let classificao3 : IRede = {utilizador: utilizadorC, dimensao: 3, fortaleza: 1};

  let classificacoes : IRede[] = [classificao1,classificao2,classificao3 ];


  let classificacaoService : ClassificacaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ MiniClassificacaoComponent ],
      providers: [ClassificacaoService]
    })
    .compileComponents();

    classificacaoService = TestBed.inject(ClassificacaoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniClassificacaoComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(classificacaoService, 'getClassificacao').and.returnValue(of(classificacoes));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar as classificacoes no inicio.', () => {
    expect(component.classificacao.length).toEqual(classificacoes.length);
    expect(component.classificacao).toContain(classificao1);
    expect(component.classificacao).toContain(classificao2);
    expect(component.classificacao).toContain(classificao3);
  })

  it('O tipo de classificação selecionada por defeito é a por dimensão.', () => {
    expect(component.tipoClassificacaoSelecionada).toEqual('Dimensão');
  })

  it('Só existem dois tipos de classificação, por dimensão ou por fortaleza.', () => {
    expect(component.tipoClassificacao.length).toEqual(2);
    expect(component.tipoClassificacao).toContain("Dimensão");
    expect(component.tipoClassificacao).toContain("Fortaleza");
  })

  it('Se a opção for dimensão, as classificações devem estar ordenadas por dimensão.', () =>{
    expect(component.tipoClassificacaoSelecionada).toEqual('Dimensão');
    expect(component.classificacao[0]).toEqual(classificao3);
    expect(component.classificacao[1]).toEqual(classificao2);
    expect(component.classificacao[2]).toEqual(classificao1);
  })

  it('Se a opção for fortaleza, as classificações devem estar ordenadas por fortaleza.', () =>{
    component.alterarTipoClassificacao('Fortaleza');
    expect(component.tipoClassificacaoSelecionada).toEqual('Fortaleza');
    expect(component.classificacao[0]).toEqual(classificao2);
    expect(component.classificacao[1]).toEqual(classificao1);
    expect(component.classificacao[2]).toEqual(classificao3);
  })

  it('É possivel alterar o tipo de classificação.' ,() => {
    expect(component.tipoClassificacaoSelecionada).toEqual('Dimensão');
    component.alterarTipoClassificacao('Fortaleza');
    expect(component.tipoClassificacaoSelecionada).toEqual('Fortaleza');
    component.alterarTipoClassificacao('Dimensão');
    expect(component.tipoClassificacaoSelecionada).toEqual('Dimensão');
  })

  it('Sempre que o tipo de classificação é alterado, os dados são atualizados.', () => {
    component.alterarTipoClassificacao('Dimensão')
    expect(component.classificacao[0]).toEqual(classificao3);
    expect(component.classificacao[1]).toEqual(classificao2);
    expect(component.classificacao[2]).toEqual(classificao1);

    component.alterarTipoClassificacao('Fortaleza');
    expect(component.classificacao[0]).toEqual(classificao2);
    expect(component.classificacao[1]).toEqual(classificao1);
    expect(component.classificacao[2]).toEqual(classificao3);

    component.alterarTipoClassificacao('Dimensão')
    expect(component.classificacao[0]).toEqual(classificao3);
    expect(component.classificacao[1]).toEqual(classificao2);
    expect(component.classificacao[2]).toEqual(classificao1);
  })

  it('O nome e o email de cada utilizador são apresentados (de acordo com a posição).', () => {
    var nomes = html.querySelectorAll('.info-pessoal h2');
    var emails = html.querySelectorAll('.info-pessoal p');

    component.alterarTipoClassificacao('Dimensão')
    expect(nomes[0].textContent).toEqual(classificao3.utilizador.nome);
    expect(emails[0].textContent).toEqual(classificao3.utilizador.email);
    expect(nomes[1].textContent).toEqual(classificao2.utilizador.nome);
    expect(emails[1].textContent).toEqual(classificao2.utilizador.email);
    expect(nomes[2].textContent).toEqual(classificao1.utilizador.nome);
    expect(emails[2].textContent).toEqual(classificao1.utilizador.email);

    component.alterarTipoClassificacao('Fortaleza');
    
    fixture.detectChanges();
    nomes = html.querySelectorAll('.info-pessoal h2');
    emails = html.querySelectorAll('.info-pessoal p');
    expect(nomes[0].textContent).toEqual(classificao2.utilizador.nome);
    expect(emails[0].textContent).toEqual(classificao2.utilizador.email);
    expect(nomes[1].textContent).toEqual(classificao1.utilizador.nome);
    expect(emails[1].textContent).toEqual(classificao1.utilizador.email);
    expect(nomes[2].textContent).toEqual(classificao3.utilizador.nome);
    expect(emails[2].textContent).toEqual(classificao3.utilizador.email);
  })

  it('Se o tipo de classificação for dimensão, devem ser apresentados os valores de dimensão de rede de cada utilizador.', () => {
    component.alterarTipoClassificacao('Dimensão');
    const pontos = html.querySelectorAll('.pontos p');

    expect(pontos[0].textContent).toEqual(classificao3.dimensao.toString());
    expect(pontos[1].textContent).toEqual(classificao2.dimensao.toString());
    expect(pontos[2].textContent).toEqual(classificao1.dimensao.toString());
  })

  it('Se o tipo de classificação for fortaleza, devem ser apresentados os valores de fortaleza de rede de cada utilizador.', () => {
    component.alterarTipoClassificacao('Fortaleza');
    fixture.detectChanges();
    const pontos = html.querySelectorAll('.pontos p');

    expect(pontos[0].textContent).toEqual(classificao2.fortaleza.toString());
    expect(pontos[1].textContent).toEqual(classificao1.fortaleza.toString());
    expect(pontos[2].textContent).toEqual(classificao3.fortaleza.toString());
  })


});
