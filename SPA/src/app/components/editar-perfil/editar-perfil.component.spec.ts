import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IUtilizador } from '../../interfaces/IUtilizador';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';

import { EditarPerfilComponent } from './editar-perfil.component';

describe('EditarPerfilComponent', () => {
  let component: EditarPerfilComponent;
  let fixture: ComponentFixture<EditarPerfilComponent>;
  let html : any;

  let utilizador : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorAlterado : IUtilizador = {id: "", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"567", dataNascimento:"2020-01-02", dataEstadoEmocional:"", descricao:"Descrição Breve", email:"", estadoEmocional:"Angustiado", facebook:"facebook.com", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181112", pais:"Espanha", password:"aaaaaaaaa_12T", tags:["aaa", "cccc"] };

  let utilizadoresService : UtilizadorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ EditarPerfilComponent ],
      providers : [UtilizadorService]
    })
    .compileComponents();

    utilizadoresService = TestBed.inject(UtilizadorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;

    spyOn(utilizadoresService, 'getUtilizadorAutenticado').and.returnValue(of(utilizador));
    spyOn(utilizadoresService, 'alterarDadosUtilizador').withArgs(utilizadorAlterado).and.returnValue(of(utilizador));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar o utilizador autenticado.', () => {
    expect(component.utilizador).toEqual(utilizador);
  })

  it('O email e a password (atual) é carregada/o para o formulário.', () => {
    expect(component.formInformacaoPrincipal.controls['email'].value).toEqual(utilizador.email);
    expect(component.formInformacaoPrincipal.controls['password'].value).toEqual(utilizador.password);
    expect(component.formInformacaoPrincipal.controls['confirmarPassword'].value).toEqual(utilizador.password);
  })

  it('O nome, data de nascimento e descrição são carregados para o formulário.', () => {
    expect(component.formInformacaoBasica.controls['nome'].value).toEqual(utilizador.nome);
    expect(component.formInformacaoBasica.controls['dataNascimento'].value).toEqual(utilizador.dataNascimento);
    expect(component.formInformacaoBasica.controls['descricao'].value).toEqual(utilizador.descricao);
  })

  it('As tags do utilizador são carregadas para o formulário.', () => {
    expect(component.formTags.controls["listaTags"].value).toEqual(utilizador.tags);
  })

  
  it('A localização do utilizador é carregada para o formulário.', () => {
    expect(component.formLocalizacao.controls["pais"].value).toEqual(utilizador.pais);
    expect(component.formLocalizacao.controls["cidade"].value).toEqual(utilizador.cidade);
  })

  it('O contacto do utilizador é carregado para o formulário.', () => {
    expect(component.formContacto.controls["indicativo"].value).toEqual(utilizador.codigoPais);
    expect(component.formContacto.controls["numero"].value).toEqual(utilizador.numeroTelemovel);
  })

  it('As redes sociais do utilizador são carregado para o formulário.', () => {
    expect(component.formRedesSociais.controls["facebook"].value).toEqual(utilizador.facebook);
    expect(component.formRedesSociais.controls["linkedIn"].value).toEqual(utilizador.linkedIn);
  })

  it('O estado emocional do utilizado é carregado para o formulário.', () => {
    expect(component.formEstadoEmocional.controls["emocao"].value).toEqual(utilizador.estadoEmocional);
  })

  it('O avatar do utilizador é carregado para o formulário.', () => {
    expect(component.avatar).toEqual(utilizador.avatar);
  })

  it('É apresentado o email e a password do utilizador.', () => {
    expect(html.querySelectorAll('.form-seccao p')[0].textContent).toEqual(utilizador.email);
    expect(html.querySelectorAll('.form-seccao input')[0].value).toEqual(utilizador.password);
    expect(html.querySelectorAll('.form-seccao input')[1].value).toEqual(utilizador.password);
  })

  it('É apresentado o nome, a data de nascimento e a descrição do utilizador.', () => {
    expect(html.querySelectorAll('.form-seccao input')[2].value).toEqual(utilizador.nome);
    expect(html.querySelectorAll('.form-seccao input')[3].value).toEqual(utilizador.dataNascimento);
    expect(html.querySelectorAll('.form-seccao input')[4].value).toEqual(utilizador.descricao);
  })

  it('São apresentadas as tags do utilizador.', () => {
    expect(html.querySelectorAll('.form-seccao input')[5].value).toEqual(utilizador.tags.toString());
  })

  it("É apresentada a informação relativa á localizacao do utilizador.", () => {
    expect(html.querySelectorAll('.form-seccao input')[6].value).toEqual(utilizador.pais);
    expect(html.querySelectorAll('.form-seccao input')[7].value).toEqual(utilizador.cidade);
  })

  it("É apresentada a informação relativa ao contacto do utilizador.", () => {
    expect(html.querySelectorAll('.form-seccao input')[8].value).toEqual(utilizador.codigoPais);
    expect(html.querySelectorAll('.form-seccao input')[9].value).toEqual(utilizador.numeroTelemovel);
  })

  it("É apresentada a informação relativa ás redes sociais do utilizador.", () => {
    expect(html.querySelectorAll('.form-seccao input')[10].value).toEqual(utilizador.facebook);
    expect(html.querySelectorAll('.form-seccao input')[11].value).toEqual(utilizador.linkedIn);
  })










});
