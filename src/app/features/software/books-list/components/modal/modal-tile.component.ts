import { Component, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookInterface } from 'src/app/models/book.interface';
import { AbstractModal } from 'src/app/shared/components/modal/abstract-modal.component';

@Component({
  selector: 'app-modal-tile',
  templateUrl: './modal-tile.component.html',
  styleUrls: ['./modal-tile.component.scss']
})
export class ModalTileComponent extends AbstractModal {

  public override inputDataModal!:BookInterface;

  public get title():string{
    return this.inputDataModal.title;
  }

  public get cover():string{
    return this.inputDataModal.cover;
  }

  public get synopsis():string{
    return this.inputDataModal.synopsis.join();
  }

  public get price():string{
    return this.inputDataModal.price.toString();
  }

  constructor(activeModal: NgbActiveModal, renderer:Renderer2) {
    super(activeModal, renderer);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

}
