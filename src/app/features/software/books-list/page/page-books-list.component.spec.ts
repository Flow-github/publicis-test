import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBooksListComponent } from './page-books-list.component';

describe('PageBooksListComponent', () => {
  let component: PageBooksListComponent;
  let fixture: ComponentFixture<PageBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
