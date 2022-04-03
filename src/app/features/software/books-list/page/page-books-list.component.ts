import { Component } from '@angular/core';
import { BookInterface } from 'src/app/models/book.interface';
import { ModalManagerService } from 'src/app/shared/components/modal/service/modal-manager.service';
import { AbstractPage } from 'src/app/shared/components/page/abstract-page.component';
import { BooksService } from 'src/app/shared/services/books.service';
import { RequestErrorService } from 'src/app/shared/services/request-error.service';
import { ModalTileComponent } from '../components/modal/modal-tile.component';
import { EventsMouse } from '../services-events/events-mouse.service';

@Component({
  selector: 'app-page-books-list',
  templateUrl: './page-books-list.component.html',
  styleUrls: ['./page-books-list.component.scss']
})
export class PageBooksListComponent extends AbstractPage {

  private _listBooks:Array<BookInterface>;

  public get listBooks():Array<BookInterface>{
    return this._listBooks;
  }

  public constructor(private _booksService:BooksService, private _eventsMouseService:EventsMouse, modalManager:ModalManagerService, requestErrorService:RequestErrorService) {
    super(modalManager, requestErrorService);
    this._listBooks = [];
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._globalSubscription.add(this._booksService.booksList$.subscribe((listBooks:Array<BookInterface>) => {this.onListBooksLoaded(listBooks)}));
    this._globalSubscription.add(this._eventsMouseService.selectTile.subscribe((book:BookInterface) => {this.onOpenTile(book)}));
  }

  private onListBooksLoaded(listBooks:Array<BookInterface>):void{
    if(listBooks.length > 0){
      this._listBooks = listBooks;
    }else{
      this._booksService.getAllBooksList();
    }
  }

  private onOpenTile(book:BookInterface):void{
    this._modalManager.openModal(ModalTileComponent, {windowClass: "", size:"lg"}, book);
  }

}