import { TestBed } from '@angular/core/testing';

import { ConnectionRequestService } from './connection.request.service';

describe('ConnectionService', () => {
  let service: ConnectionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
