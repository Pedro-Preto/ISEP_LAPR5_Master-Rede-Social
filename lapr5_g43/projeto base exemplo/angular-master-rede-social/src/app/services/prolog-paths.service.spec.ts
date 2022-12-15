import { TestBed } from '@angular/core/testing';

import { PrologPathsService } from './prolog-paths.service';

describe('PrologPathsService', () => {
  let service: PrologPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrologPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
