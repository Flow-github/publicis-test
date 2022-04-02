import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { RequestService } from './requests.service';

describe('FlightsService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        RequestService,
    ],
    teardown: { destroyAfterEach: false }
});
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
