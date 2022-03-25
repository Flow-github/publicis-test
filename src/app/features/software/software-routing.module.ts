import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLink } from 'src/app/shared/utils/link/list.link';

const routes: Routes = [
  {path: ListLink.BOOKS_LIST, loadChildren: () => import('./books-list/books-list.module').then(m => m.BooksListModule)},
  {path: ListLink.BOOKS_CART, loadChildren: () => import('./books-cart/books-cart.module').then(m => m.BooksCartModule)},
  {path: "", redirectTo: ListLink.BOOKS_LIST, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
