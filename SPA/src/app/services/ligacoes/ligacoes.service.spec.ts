import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LigacoesService } from './ligacoes.service';

describe('LigacoesService', () => {
  let service: LigacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LigacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
