import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigacaoComponent } from './ligacao.component';

describe('LigacaoComponent', () => {
  let component: LigacaoComponent;
  let fixture: ComponentFixture<LigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
