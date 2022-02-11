import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgdComponent } from './rpgd.component';

describe('RpgdComponent', () => {
  let component: RpgdComponent;
  let fixture: ComponentFixture<RpgdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpgdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
