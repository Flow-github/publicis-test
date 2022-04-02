import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RequestErrorService } from './request-error.service';

import { RequestService } from './requests.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        RequestErrorService
    ],
    teardown: { destroyAfterEach: false }
});
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
