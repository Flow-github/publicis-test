import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListRoutingModule } from './books-list-routing.module';
import { PageBooksListComponent } from './page/page-books-list.component';


@NgModule({
  declarations: [
    PageBooksListComponent
  ],
  imports: [
    CommonModule,
    BooksListRoutingModule
  ]
})
export class BooksListModule { }
