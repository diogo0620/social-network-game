import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PedidosIntroducaoService } from './pedidos-introducao.service';

describe('PedidosIntroducaoService', () => {
  let service: PedidosIntroducaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PedidosIntroducaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
