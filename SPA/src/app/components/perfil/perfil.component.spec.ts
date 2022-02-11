import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { UtilizadorService } from 'src/app/services/utilizadores/utilizador.service';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let html : any;

  let utilizador : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };

  let utilizadoresService : UtilizadorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PerfilComponent ],
      providers: [UtilizadorService]
    })
    .compileComponents();

    utilizadoresService = TestBed.inject(UtilizadorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(utilizadoresService, 'getUtilizadorAutenticado').and.returnValue(of(utilizador));
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('A opção por defeito deve ser a opção do feed.', () => {
    expect(component.opcao_feed).toBeTrue();
    expect(component.opcao_informacao).toBeFalse();
    expect(component.opcao_editar_perfil).toBeFalse();

    expect(component.opcaoStyle[1]).toEqual('opcao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');
  })

  it('É possivel alterar a opção selecionada.', () => {
    component.opcao(2);
    expect(component.opcao_feed).toBeFalse();
    expect(component.opcao_informacao).toBeTrue();
    expect(component.opcao_editar_perfil).toBeFalse();

    expect(component.opcaoStyle[1]).toEqual('opcao-nao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-selecionada');

    component.opcao(3);
    expect(component.opcao_feed).toBeFalse();
    expect(component.opcao_informacao).toBeFalse();
    expect(component.opcao_editar_perfil).toBeTrue();

    expect(component.opcaoStyle[1]).toEqual('opcao-nao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');

    component.opcao(1);
    expect(component.opcao_feed).toBeTrue();
    expect(component.opcao_informacao).toBeFalse();
    expect(component.opcao_editar_perfil).toBeFalse();

    expect(component.opcaoStyle[1]).toEqual('opcao-selecionada');
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');
  })

  it('O utilizador autenticado é carregado.', () => {
    expect(component.utilizador).toEqual(utilizador);
    expect(component.carregouUtilizador).toBeTrue();
  });

  it('O nome do utilizador é corretamente apresentado.' , () => {
    expect(html.querySelector('.nome-e-email h2').textContent).toEqual(utilizador.nome);
  })

  it('O email do utilizador é corretamente apresentado.' , () => {
    expect(html.querySelector('.nome-e-email h3').textContent).toEqual(utilizador.email);
  })

  it('As tags do utilizador são corretamente apresentadas.' , () => {
    const tags = html.querySelectorAll('.t p');
    expect(tags.length).toEqual(utilizador.tags.length);
    expect(tags[0].textContent).toEqual(utilizador.tags[0]);
    expect(tags[1].textContent).toEqual(utilizador.tags[1]);
  })

  it('O estado emocional do utilizador é corretamente apresentado.' , () => {
    expect(html.querySelector('.estado-emocional p').textContent).toEqual(utilizador.estadoEmocional);
  })

  


});
