import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';

import { InformacaoPerfilComponent } from './informacao-perfil.component';

describe('InformacaoPerfilComponent', () => {
  let component: InformacaoPerfilComponent;
  let fixture: ComponentFixture<InformacaoPerfilComponent>;
  let html : any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacaoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacaoPerfilComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    component.uti = utilizadorA;
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('O email do utilizador é apresentado.', () => {
    expect(html.querySelectorAll('.form-seccao p')[0].textContent).toEqual(utilizadorA.email);
  })

  it('O nome do utilizador é apresentado.', () => {
    expect(html.querySelectorAll('.form-seccao p')[1].textContent).toEqual(utilizadorA.nome);
  })

  it('A data de nascimento do utilizador é apresentada.', () => {
    expect(html.querySelectorAll('.form-seccao p')[2].textContent).toEqual(utilizadorA.dataNascimento);
  })

  it('A descrição do utilizador é apresentada.', () => {
    expect(html.querySelectorAll('.form-seccao p')[3].textContent).toEqual(utilizadorA.descricao);
  })

  it('Todas as tags do utilizador são apresentadas.', () => {
    const tags = html.querySelectorAll('.tags p');
    expect(tags.length).toEqual(utilizadorA.tags.length);
    expect(tags[0].textContent).toEqual(utilizadorA.tags[0]);
    expect(tags[1].textContent).toEqual(utilizadorA.tags[1]);
  })

  it('O estado emocional e a respetiva data de atualização do utilizador são apresentados.', () => {
    expect(html.querySelectorAll('.form-seccao p')[4].textContent).toEqual(utilizadorA.estadoEmocional +' (Atualizado em '+utilizadorA.dataEstadoEmocional+')');
  })

  it('O país do utilizador é apresentado.', () => {
    expect(html.querySelectorAll('.form-seccao p')[5].textContent).toEqual(utilizadorA.pais);
  })

  it('A cidade do utilizador é apresentada.', () => {
    expect(html.querySelectorAll('.form-seccao p')[6].textContent).toEqual(utilizadorA.cidade);
  })

  it('O número de telemovel do utilizador é apresentado.', () => {
    expect(html.querySelectorAll('.form-seccao p')[7].textContent).toEqual(utilizadorA.codigoPais);
    expect(html.querySelectorAll('.form-seccao p')[8].textContent).toEqual(utilizadorA.numeroTelemovel);
  })




  








});
