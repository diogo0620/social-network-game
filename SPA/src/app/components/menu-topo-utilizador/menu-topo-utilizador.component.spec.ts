import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { MenuTopoUtilizadorComponent } from './menu-topo-utilizador.component';

describe('MenuTopoUtilizadorComponent', () => {
  let component: MenuTopoUtilizadorComponent;
  let fixture: ComponentFixture<MenuTopoUtilizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MenuTopoUtilizadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTopoUtilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
