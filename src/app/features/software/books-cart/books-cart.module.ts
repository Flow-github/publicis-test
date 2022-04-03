import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksCartRoutingModule } from './books-cart-routing.module';
import { PageBooksCartComponent } from './page/page-books-cart.component';
import { RecapBookComponent } from './components/recap-book/recap-book.component';
import { BestOfferComponent } from './components/best-offer/best-offer.component';


@NgModule({
  declarations: [
    PageBooksCartComponent,
    RecapBookComponent,
    BestOfferComponent
  ],
  imports: [
    CommonModule,
    BooksCartRoutingModule
  ]
})
export class BooksCartModule { }
