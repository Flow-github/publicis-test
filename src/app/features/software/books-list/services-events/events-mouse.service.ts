import { EventEmitter } from '@angular/core';
import { BookInterface } from 'src/app/models/book.interface';


export class EventsMouse{

    public selectTile:EventEmitter<BookInterface>;

    constructor(){
        this.selectTile = new EventEmitter<BookInterface>();
    }

}