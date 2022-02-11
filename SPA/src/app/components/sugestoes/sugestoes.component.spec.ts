import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestoesComponent } from './sugestoes.component';

describe('SugestoesComponent', () => {
  let component: SugestoesComponent;
  let fixture: ComponentFixture<SugestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugestoesComponent, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
