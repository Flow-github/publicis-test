import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListRoutingModule } from './books-list-routing.module';
import { PageBooksListComponent } from './page/page-books-list.component';
import { BookTileComponent } from './components/book-tile/book-tile.component';
import { EventsMouse } from './services-events/events-mouse.service';


@NgModule({
  declarations: [
    PageBooksListComponent,
    BookTileComponent
  ],
  imports: [
    CommonModule,
    BooksListRoutingModule
  ],
  providers:[
    EventsMouse
  ]
})
export class BooksListModule { }
