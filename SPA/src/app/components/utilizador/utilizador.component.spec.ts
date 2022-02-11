import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { UtilizadorComponent } from './utilizador.component';

describe('UtilizadorComponent', () => {
  let component: UtilizadorComponent;
  let fixture: ComponentFixture<UtilizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ UtilizadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('A opção selecionada por defeito deve ser o feed.', () => {
    expect(component.opcao_feed).toBeTrue();
    expect(component.opcao_amigos_comum).toBeFalse();
    expect(component.opcao_informacao).toBeFalse();
    expect(component.opcao_caminhos).toBeFalse();
  })
});
