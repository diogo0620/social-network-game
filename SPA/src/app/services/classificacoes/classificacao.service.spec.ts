import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClassificacaoService } from './classificacao.service';

describe('ClassificacaoService', () => {
  let service: ClassificacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClassificacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
