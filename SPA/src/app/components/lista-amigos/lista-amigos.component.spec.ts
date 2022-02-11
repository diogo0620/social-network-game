import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ILigacao } from 'src/app/interfaces/ILigacao';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { LigacoesService } from 'src/app/services/ligacoes/ligacoes.service';

import { ListaAmigosComponent } from './lista-amigos.component';


describe('ListaAmigosComponent', () => {
  let component: ListaAmigosComponent;
  let fixture: ComponentFixture<ListaAmigosComponent>;
  let html : any;


  let autenticado : IUtilizador = {id: "4", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"autenticado@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador D", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  
  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador C", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador D", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let utilizadorC : IUtilizador = {id: "3", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorC@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };

  let ligacaoA : ILigacao = {id: "123", forcaLigacao: 45, tags: ["ccc", "dddd"], forcaRelacao: 23, utilizadorA: autenticado, utilizadorB: utilizadorA, numeroLikes:0, numeroDislikes: 0};
  let ligacaoB : ILigacao = {id: "124", forcaLigacao: 20, tags: ["xxx"], forcaRelacao: 20, utilizadorA: autenticado, utilizadorB: utilizadorB, numeroLikes:0, numeroDislikes: 0};
  let ligacaoC : ILigacao = {id: "125", forcaLigacao: 85, tags: ["err", "yyy", "iii"], forcaRelacao: 40, utilizadorA: autenticado, utilizadorB: utilizadorC,  numeroLikes:0, numeroDislikes: 0};

  let amigos : ILigacao[] = [ligacaoA, ligacaoB, ligacaoC];

  let ligacoesService : LigacoesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ListaAmigosComponent ],
      providers: [LigacoesService]
    })
    .compileComponents();

    ligacoesService = TestBed.inject(LigacoesService);
  });

  beforeEach(inject([LigacoesService] , (s: LigacoesService) => {
    fixture = TestBed.createComponent(ListaAmigosComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(ligacoesService, 'getLigacoesDoUtilizadorAutenticado').and.returnValue(of(amigos));
    ligacoesService = s;
    fixture.detectChanges();
  }));

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });


  it('As amizades do utilizador autenticado devem ser carregadas.', () =>{
    expect(component.amigos.length).toEqual(amigos.length);
    expect(component.amigos).toContain(ligacaoA);
    expect(component.amigos).toContain(ligacaoB);
    expect(component.amigos).toContain(ligacaoC);
  })

  it('As amizades do utilizador autenticado devem estar ordenadas por ordem alfabética.', () => {
    expect(component.amigos[0]).toEqual(ligacaoC);
    expect(component.amigos[1]).toEqual(ligacaoA);
    expect(component.amigos[2]).toEqual(ligacaoB);
  })

  it('O nome e email de cada amigo é apresentado.', () => {
    const nomes = html.querySelectorAll('.ligacao .nomes h2');
    const emails = html.querySelectorAll('.ligacao .nomes h3');

    expect(nomes[0].textContent).toEqual(ligacaoC.utilizadorB.nome);
    expect(emails[0].textContent).toEqual(ligacaoC.utilizadorB.email);
    
    expect(nomes[1].textContent).toEqual(ligacaoA.utilizadorB.nome);
    expect(emails[1].textContent).toEqual(ligacaoA.utilizadorB.email);
    
    expect(nomes[2].textContent).toEqual(ligacaoB.utilizadorB.nome);
    expect(emails[2].textContent).toEqual(ligacaoB.utilizadorB.email);
  })

  it('As tags definidas para cada ligação são apresentadas.', () => {
    const tags = html.querySelectorAll('.tags p');

    expect(tags[0].textContent).toEqual(ligacaoC.tags[0]);
    expect(tags[1].textContent).toEqual(ligacaoC.tags[1]);
    expect(tags[2].textContent).toEqual(ligacaoC.tags[2]);

    expect(tags[3].textContent).toEqual(ligacaoA.tags[0]);
    expect(tags[4].textContent).toEqual(ligacaoA.tags[1]);

    expect(tags[5].textContent).toEqual(ligacaoB.tags[0]);
  })

  it('A força de ligação de cada ligação é apresentada.', () => {
    const forcasLigacao = html.querySelectorAll('.info p');

    expect(forcasLigacao[3].textContent).toEqual(ligacaoC.forcaLigacao.toString());
    expect(forcasLigacao[7].textContent).toEqual(ligacaoA.forcaLigacao.toString());
    expect(forcasLigacao[10].textContent).toEqual(ligacaoB.forcaLigacao.toString());
  })

  it('A força de relação de cada ligação é apresentada.', () => {
    const forcasLigacao = html.querySelectorAll('.info p');

    expect(forcasLigacao[4].textContent).toEqual(ligacaoC.forcaRelacao.toString());
    expect(forcasLigacao[8].textContent).toEqual(ligacaoA.forcaRelacao.toString());
    expect(forcasLigacao[11].textContent).toEqual(ligacaoB.forcaRelacao.toString());
  })



  
});
