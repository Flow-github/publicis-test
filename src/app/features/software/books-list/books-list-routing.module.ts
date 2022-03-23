import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageBooksListComponent } from './page/page-books-list.component';

const routes: Routes = [
  { path: "", component: PageBooksListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksListRoutingModule { }
