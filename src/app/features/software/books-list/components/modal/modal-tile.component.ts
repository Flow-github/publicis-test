import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookInterface } from 'src/app/models/book.interface';
import { AbstractModal } from 'src/app/shared/components/modal/abstract-modal.component';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-modal-tile',
  templateUrl: './modal-tile.component.html',
  styleUrls: ['./modal-tile.component.scss']
})
export class ModalTileComponent extends AbstractModal {

  @ViewChild("cartButton", {static: true}) cartButton!:ElementRef;

  public override inputDataModal!:BookInterface;

  private _unsubscribeCartButton!:Function;

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

  public get buttonLabel():string{
    return this._booksService.isBookInCart(this.inputDataModal) ? "Retirer du panier" : "Mettre dans le panier";
  }

  constructor(activeModal: NgbActiveModal, renderer:Renderer2, private _booksService:BooksService) {
    super(activeModal, renderer);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._unsubscribeCartButton = this._renderer.listen(this.cartButton.nativeElement, "click", (event:MouseEvent) => {this.onManageToCart(event)});
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeCartButton();
  }

  private onManageToCart(event:MouseEvent):void{
    this._booksService.isBookInCart(this.inputDataModal) ? this._booksService.removeBookToCart(this.inputDataModal) : this._booksService.addBookToCart(this.inputDataModal);
    this.closeModal();
  }

}
