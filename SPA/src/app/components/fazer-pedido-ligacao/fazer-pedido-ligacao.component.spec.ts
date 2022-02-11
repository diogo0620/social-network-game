import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';

import { FazerPedidoLigacaoComponent } from './fazer-pedido-ligacao.component';

describe('FazerPedidoLigacaoComponent', () => {
  let component: FazerPedidoLigacaoComponent;
  let fixture: ComponentFixture<FazerPedidoLigacaoComponent>;
  let html : any;

  let utilizadorA : IUtilizador = {id: "1", avatar: "avatar-1",cidade: "Porto", codigoPais:"351", dataNascimento:"2020-01-01", dataEstadoEmocional:"2020-01-01", descricao:"", email:"utilizadorA@hotmail.com", estadoEmocional:"Alegre", facebook:"", linkedIn:"", nome:"Utilizador A", numeroTelemovel:"915181111", pais:"Portugal", password:"aaaaaaaaa_12R", tags:["aaa", "bb"] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ FazerPedidoLigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FazerPedidoLigacaoComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement.nativeElement;
    component.utilizador = utilizadorA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve aparecer o nome do utilizador no topo da janela.', () => {
    expect(html.querySelector('.topo h2').textContent).toEqual("Enviar pedido de ligação a " +utilizadorA.nome);
  })
});
