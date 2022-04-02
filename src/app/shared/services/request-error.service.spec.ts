import { TestBed } from '@angular/core/testing';
import { RequestErrorService } from './request-error.service';

describe('RequestErrorService', () => {
  let service: RequestErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    teardown: { destroyAfterEach: false }
});
    service = TestBed.inject(RequestErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
