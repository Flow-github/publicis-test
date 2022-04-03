import { Component, Input } from '@angular/core';
import { BookInterface } from 'src/app/models/book.interface';

@Component({
  selector: 'app-recap-book',
  templateUrl: './recap-book.component.html',
  styleUrls: ['./recap-book.component.scss']
})
export class RecapBookComponent {

  @Input() bookData!:BookInterface;

  public get title():string{
    return this.bookData.title;
  }

  public get cover():string{
    return this.bookData.cover;
  }

  public get price():string{
    return this.bookData.price.toString();
  }

  constructor() { }

}
