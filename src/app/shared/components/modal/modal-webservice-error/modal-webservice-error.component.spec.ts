import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterface } from 'src/app/models/error.interface';

import { ModalWebserviceErrorComponent } from './modal-webservice-error.component';

describe('ModalWebserviceErrorComponent', () => {
  let component: ModalWebserviceErrorComponent;
  let fixture: ComponentFixture<ModalWebserviceErrorComponent>;
  let serviceActiveModal:NgbActiveModal = new NgbActiveModal();
  serviceActiveModal.close = jest.fn();
  let inputData:ErrorInterface = {message: "message", ok: false, status: 400, statusText: "status text", title: "title"};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        ModalWebserviceErrorComponent
    ],
    providers: [
        { provide: NgbActiveModal, useValue: serviceActiveModal },
    ],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWebserviceErrorComponent);
    component = fixture.componentInstance;
    component.inputDataModal = inputData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.closeButton.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(serviceActiveModal.close).toHaveBeenCalled();
  });
});
