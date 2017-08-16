/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StrengthService } from './strength.service';

xdescribe('Service: Strength', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrengthService]
    });
  });

  it('should ...', inject([StrengthService], (service: StrengthService) => {
    expect(service).toBeTruthy();
  }));
});
