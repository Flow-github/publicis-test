import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookInterface } from 'src/app/models/book.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { EventsMouse } from '../services-events/events-mouse.service';

@Component({
  selector: 'app-page-books-list',
  templateUrl: './page-books-list.component.html',
  styleUrls: ['./page-books-list.component.scss']
})
export class PageBooksListComponent implements OnInit, OnDestroy {

  private _globalSubscription:Subscription;
  private _listBooks:Array<BookInterface>;

  public get listBooks():Array<BookInterface>{
    return this._listBooks;
  }

  public constructor(private _booksService:BooksService, private _eventsMouseService:EventsMouse) {
    this._globalSubscription = new Subscription();
    this._listBooks = [];
  }

  public ngOnInit(): void {
    this._globalSubscription.add(this._booksService.booksList$.subscribe((listBooks:Array<BookInterface>) => {this.onListBooksLoaded(listBooks)}));
    this._globalSubscription.add(this._eventsMouseService.selectTile.subscribe((book:BookInterface) => {this.onOpenTile(book)}));
  }

  public ngOnDestroy(): void {
    this._globalSubscription.unsubscribe();
  }

  private onListBooksLoaded(listBooks:Array<BookInterface>):void{
    if(listBooks.length > 0){
      this._listBooks = listBooks;
    }else{
      this._booksService.getAllBooksList();
    }
  }

  private onOpenTile(book:BookInterface):void{
    console.log("onOpenTile");
    console.log(book);
  }

}