import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBooksCartComponent } from './page-books-cart.component';

describe('PageBooksCartComponent', () => {
  let component: PageBooksCartComponent;
  let fixture: ComponentFixture<PageBooksCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBooksCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBooksCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
