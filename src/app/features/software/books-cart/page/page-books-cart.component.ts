import { Component } from '@angular/core';
import { BookInterface } from 'src/app/models/book.interface';
import { OfferInterface } from 'src/app/models/offer.interface';
import { ModalManagerService } from 'src/app/shared/components/modal/service/modal-manager.service';
import { AbstractPage } from 'src/app/shared/components/page/abstract-page.component';
import { BooksService } from 'src/app/shared/services/books.service';
import { RequestErrorService } from 'src/app/shared/services/request-error.service';

@Component({
  selector: 'app-page-books-cart',
  templateUrl: './page-books-cart.component.html',
  styleUrls: ['./page-books-cart.component.scss']
})
export class PageBooksCartComponent extends AbstractPage {

  private _listBooksCarted!:Array<BookInterface>;
  private _bestOffer!:OfferInterface;

  public get listBooksCarted():Array<BookInterface>{
    return this._listBooksCarted;
  }

  public get bestOffer():OfferInterface{
    return this._bestOffer;
  }

  public get isWithBookCarted():boolean{
    return this._listBooksCarted.length > 0;
  }

  constructor(private _booksService:BooksService, modalManager:ModalManagerService, requestErrorService:RequestErrorService) {
    super(modalManager, requestErrorService);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._globalSubscription.add(this._booksService.offersBooks$.subscribe((offer:OfferInterface) => {this.getBooksOffers(offer)}));
    this._globalSubscription.add(this._booksService.booksCart$.subscribe((listBooks:Array<BookInterface>) => {this.getBooksCarted(listBooks)}));
  }

  private getBooksCarted(listBooks:Array<BookInterface>):void{
    this._listBooksCarted = listBooks;
    if(this.isWithBookCarted){
      this._booksService.getBooksOffers();
    }
  }

  private getBooksOffers(offer:OfferInterface):void{
    this._bestOffer = offer;
  }

}
