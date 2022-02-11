import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { LigacoesService } from 'src/app/services/ligacoes/ligacoes.service';

import { EditarLigacaoComponent } from './editar-ligacao.component';

describe('EditarLigacaoComponent', () => {
  let component: EditarLigacaoComponent;
  let fixture: ComponentFixture<EditarLigacaoComponent>;
  let html : any;

  
  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };
  let utilizadorB : IUtilizador = {id: "2", avatar: "avatar-2",cidade: "Lisboa", codigoPais:"351", dataNascimento:"2020-02-02", dataEstadoEmocional:"2020-02-02", descricao:"", email:"utilizadorB@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador B", numeroTelemovel:"915181211", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["ccc", "dd"] };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ EditarLigacaoComponent ],
      providers: [LigacoesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLigacaoComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    component.ligacao = {id: "123", forcaLigacao: 45, tags: ["ccc", "dddd"], forcaRelacao: 23, utilizadorA: utilizadorA, utilizadorB: utilizadorB, numeroLikes:0, numeroDislikes: 0};
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('Deve aparecer o nome do utilizador B da ligação.' ,() => {
    expect(html.querySelector('.topo h2').textContent).toEqual('Editar ligação com '+utilizadorB.nome);
  });

  it('Deve aparecer a força de ligação atual da ligação.', () => {
    expect(html.querySelector('.forca output').textContent).toEqual('45');
    expect(component.formEditarLigacao.controls['forcaLigacao'].value).toEqual(45);
    expect(component.forcaLigacao).toEqual(45);
  })

  it('Deve aparecer as tags atuais da ligação.', () => {
    expect(component.formEditarLigacao.controls['tags'].value).toEqual(['ccc', 'dddd']);
  })
});
