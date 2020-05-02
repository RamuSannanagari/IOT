import { TestBed } from '@angular/core/testing';

import { LoaderIntercepterService } from './loader-intercepter.service';

describe('LoaderIntercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderIntercepterService = TestBed.get(LoaderIntercepterService);
    expect(service).toBeTruthy();
  });
});
