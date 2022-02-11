import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ILigacao } from 'src/app/interfaces/ILigacao';
import { IRede } from 'src/app/interfaces/IRede';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { LigacoesService } from 'src/app/services/ligacoes/ligacoes.service';
import { UtilizadorService } from 'src/app/services/utilizadores/utilizador.service';

import { MiniPerfilComponent } from './mini-perfil.component';

describe('MiniPerfilComponent', () => {
  let component: MiniPerfilComponent;
  let fixture: ComponentFixture<MiniPerfilComponent>;
  let html : any;

  let utilizador : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let rede : IRede = {utilizador: utilizador, dimensao: 45, fortaleza: 234};
  let amigos : ILigacao[] = [];


  let utilizadoresService : UtilizadorService;
  let ligacoesService : LigacoesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ MiniPerfilComponent ],
      providers: [UtilizadorService, LigacoesService]
    })
    .compileComponents();

    utilizadoresService = TestBed.inject(UtilizadorService);
    ligacoesService = TestBed.inject(LigacoesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPerfilComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(utilizadoresService, 'getUtilizadorAutenticado').and.returnValue(of(utilizador));
    spyOn(ligacoesService, 'getInformacoesRedeDoUtilizadorAutenticado').and.returnValue(of(rede));
    spyOn(ligacoesService, 'getLigacoesDoUtilizadorAutenticado').and.returnValue(of(amigos));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('O utilizador autenticado é carregado.', () => {
    expect(component.utilizador).toEqual(utilizador);
  })

  it('A dimensão da rede do utilizador é carregada.', () => {
    expect(component.dimensao).toEqual(rede.dimensao);
  });

  it('A fortaleza da rede do utilizador é carregada.', () => {
    expect(component.fortaleza).toEqual(rede.fortaleza);
  });

  it('O número de amigos do utilizador é carregado.', () => {
    expect(component.nrAmigos).toEqual(amigos.length);
  });

  it('O nome do utilizador autenticado é apresentado.', ()=>{
    expect(html.querySelector('.seccao h1').textContent).toEqual(utilizador.nome);
  })

  it('O email do utilizador autenticado é apresentado.', ()=>{
    expect(html.querySelector('.seccao h3').textContent).toEqual(utilizador.email);
  })

  it('O numero de amigos do utilizador autenticado é apresentado.', ()=>{
    expect(html.querySelectorAll('.seccao p')[0].textContent).toEqual(amigos.length.toString());
  })

  it('A dimensão da rede do utilizador autenticado é apresentada.', ()=>{
    expect(html.querySelectorAll('.seccao p')[1].textContent).toEqual(rede.dimensao.toString());
  })

  it('A fortaleza da rede do utilizador autenticado é apresentada.', ()=>{
    expect(html.querySelectorAll('.seccao p')[2].textContent).toEqual(rede.fortaleza.toString());
  })




});
