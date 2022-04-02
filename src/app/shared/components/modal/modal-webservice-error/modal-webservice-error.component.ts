import { Component, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterface } from 'src/app/models/error.interface';
import { AbstractModal } from '../abstract-modal.component';

@Component({
  selector: 'app-modal-webservice-error',
  templateUrl: './modal-webservice-error.component.html',
  styleUrls: ['./modal-webservice-error.component.scss']
})
export class ModalWebserviceErrorComponent extends AbstractModal {

  public override inputDataModal!:ErrorInterface;

  public get titleError():string{
    return this.inputDataModal.title;
  }

  public get messageError():string{
    return this.inputDataModal.message;
  }

  constructor(activeModal: NgbActiveModal, renderer:Renderer2) {
    super(activeModal, renderer);
  }

}
