import { TestBed } from '@angular/core/testing';

import { KoboInputServiceService } from './kobo-input-service.service';

describe('InputComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KoboInputServiceService = TestBed.get(KoboInputServiceService);
    expect(service).toBeTruthy();
  });
});
