import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PlaneamentoService } from './planeamento.service';

describe('PlaneamentoService', () => {
  let service: PlaneamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlaneamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
