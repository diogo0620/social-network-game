import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UtilizadorService } from './utilizador.service';

describe('UtilizadorService', () => {
  let service: UtilizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UtilizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
