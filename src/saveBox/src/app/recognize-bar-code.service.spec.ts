import { TestBed } from '@angular/core/testing';

import { RecognizeBarCodeService } from './recognize-bar-code.service';

describe('RecognizeBarCodeService', () => {
  let service: RecognizeBarCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognizeBarCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
