import { TestBed } from '@angular/core/testing';

import { EstadosEmocionaisService } from './estados-emocionais.service';

describe('EstadosEmocionaisService', () => {
  let service: EstadosEmocionaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosEmocionaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
