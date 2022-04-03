import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListRoutingModule } from './books-list-routing.module';
import { PageBooksListComponent } from './page/page-books-list.component';
import { BookTileComponent } from './components/book-tile/book-tile.component';
import { EventsMouse } from './services-events/events-mouse.service';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageBooksListComponent,
    BookTileComponent,
    BookSearchComponent
  ],
  imports: [
    CommonModule,
    BooksListRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[
    EventsMouse
  ]
})
export class BooksListModule { }
