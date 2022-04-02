import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-page-books-list',
  templateUrl: './page-books-list.component.html',
  styleUrls: ['./page-books-list.component.scss']
})
export class PageBooksListComponent implements OnInit, OnDestroy {

  private _globalSubscription:Subscription;

  public constructor(private _booksService:BooksService) {
    this._globalSubscription = new Subscription();
  }

  public ngOnInit(): void {
    this._globalSubscription.add(this._booksService.booksList$.subscribe((listBooks:any) => {this.onListBooksLoaded(listBooks)}));
  }

  public ngOnDestroy(): void {
    this._globalSubscription.unsubscribe();
  }

  private onListBooksLoaded(listBooks:any):void{
    console.log("onListBooksLoaded");
    console.log(listBooks);
    if(listBooks){

    }else{
      this._booksService.getAllBooksList();
    }
  }

}
