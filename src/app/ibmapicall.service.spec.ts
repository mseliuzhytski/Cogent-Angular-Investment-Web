import { TestBed } from '@angular/core/testing';

import { IbmapicallService } from './ibmapicall.service';

describe('IbmapicallService', () => {
  let service: IbmapicallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbmapicallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
