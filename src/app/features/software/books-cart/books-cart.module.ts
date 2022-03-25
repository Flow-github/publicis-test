import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksCartRoutingModule } from './books-cart-routing.module';
import { PageBooksCartComponent } from './page/page-books-cart.component';


@NgModule({
  declarations: [
    PageBooksCartComponent
  ],
  imports: [
    CommonModule,
    BooksCartRoutingModule
  ]
})
export class BooksCartModule { }
