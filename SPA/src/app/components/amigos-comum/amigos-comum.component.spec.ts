import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';

import { AmigosComumComponent } from './amigos-comum.component';

describe('AmigosComumComponent', () => {
  let component: AmigosComumComponent;
  let fixture: ComponentFixture<AmigosComumComponent>;
  let html: any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };
  let amigosEmComum : IUtilizador[] = [utilizadorA, utilizadorB];

  let ligacoesService : LigacoesService;
  let utilizadorID : string = "123";
  let utilizadorIDsemAmigos : string = "564";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AmigosComumComponent ],
      providers : [LigacoesService]
    })
    .compileComponents();

    ligacoesService = TestBed.inject(LigacoesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmigosComumComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    component.paraUtilizadorID = utilizadorID;

    spyOn(ligacoesService, 'getAmigosEmComumCom').withArgs(utilizadorID).and.returnValue(of(amigosEmComum));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('Os amigos em comum devem ser carregados.', () => {
    expect(component.amigosEmComum).toEqual(amigosEmComum);
  })

  it('No caso dos utilizadores possuirem amigos em comum, os mesmos devem ser apresentados.', () => {
    const amigosApresentados = html.querySelectorAll('.ligacao');
    expect(amigosApresentados.length).toEqual(amigosEmComum.length);
    expect(html.querySelector('.sem-amigos p')).toBeNull();
  })

});
