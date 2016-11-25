/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProvideService } from './provide.service';

describe('Service: Provide', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvideService]
    });
  });

  it('should ...', inject([ProvideService], (service: ProvideService) => {
    expect(service).toBeTruthy();
  }));
});
