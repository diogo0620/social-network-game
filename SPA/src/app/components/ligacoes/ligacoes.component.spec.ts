import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LigacoesComponent } from './ligacoes.component';

describe('LigacoesComponent', () => {
  let component: LigacoesComponent;
  let fixture: ComponentFixture<LigacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ LigacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar componente.', () => {
    expect(component).toBeTruthy();
  });

  it('A opção selecionada por defeito é a lista de amigos.', ()=>{
    expect(component.listaAmigos).toBeTrue();
    expect(component.opcaoStyle[1]).toEqual('opcao-selecionada');
    expect(component.consultarRede).toBeFalse();
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');
  })

  it('Garantir que as opções podem ser alteradas.', ()=>{
    expect(component.listaAmigos).toBeTrue();
    expect(component.opcaoStyle[1]).toEqual('opcao-selecionada');
    expect(component.consultarRede).toBeFalse();
    expect(component.opcaoStyle[2]).toEqual('opcao-nao-selecionada');

    component.opcao(2);

    expect(component.listaAmigos).toBeFalse();
    expect(component.opcaoStyle[1]).toEqual('opcao-nao-selecionada');
    expect(component.consultarRede).toBeTrue();
    expect(component.opcaoStyle[2]).toEqual('opcao-selecionada');
  })

  



});
