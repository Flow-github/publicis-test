import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapBookComponent } from './recap-book.component';

describe('RecapBookComponent', () => {
  let component: RecapBookComponent;
  let fixture: ComponentFixture<RecapBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
