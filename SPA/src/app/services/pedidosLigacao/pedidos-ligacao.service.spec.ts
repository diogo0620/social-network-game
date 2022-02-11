import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PedidosLigacaoService } from './pedidos-ligacao.service';

describe('PedidosLigacaoService', () => {
  let service: PedidosLigacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PedidosLigacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
