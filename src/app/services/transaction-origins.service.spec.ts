import { TestBed } from '@angular/core/testing';

import { TransactionOriginsService } from './transaction-origins.service';

describe('TransactionOriginsService', () => {
  let service: TransactionOriginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionOriginsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
