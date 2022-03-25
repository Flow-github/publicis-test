import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageBooksCartComponent } from './page/page-books-cart.component';

const routes: Routes = [
  { path: "", component: PageBooksCartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksCartRoutingModule { }
