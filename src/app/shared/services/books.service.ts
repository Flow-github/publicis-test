import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { RequestService } from "./requests.service";
import { BookInterface } from "src/app/models/book.interface";

@Injectable({
    providedIn: 'root'
})
export class BooksService{

    public booksList$: Observable<Array<BookInterface>>;
    public booksCart$: Observable<Array<BookInterface>>;

    private _subjectBooksList:BehaviorSubject<Array<BookInterface>>;
    private _subjectBooksCart:BehaviorSubject<Array<BookInterface>>;

    constructor(private _requestService: RequestService) {
        this._subjectBooksList = new BehaviorSubject<Array<BookInterface>>([]);
        this.booksList$ = this._subjectBooksList.asObservable();

        this._subjectBooksCart = new BehaviorSubject<Array<BookInterface>>([]);
        this.booksCart$ = this._subjectBooksCart.asObservable();
    }

    public addBookToCart(book:BookInterface):void{
        if(!this.isBookInCart(book)){
            this._subjectBooksCart.value.push(book);
            this._subjectBooksCart.next(this._subjectBooksCart.value);
        }
    }

    public removeBookToCart(book:BookInterface):void{
        const posBookInCard:number = this.findBookInCard(book);
        if(posBookInCard > -1){
            this._subjectBooksCart.value.splice(posBookInCard, 1);
            this._subjectBooksCart.next(this._subjectBooksCart.value);
        }
    }

    public isBookInCart(book:BookInterface):boolean{
        return this.findBookInCard(book) > -1;
    }

    /**
     * Load all books in bdd
     */
     public getAllBooksList():void{
        this._requestService.getRequest("books").subscribe((result:any) => {this.onBooksListResult(result)});
    }

    /**
     * Change the result in a list of BooksInterface And send it to the listener
     * @param result 
     */
    private onBooksListResult(result:any):void{
        if(result.body){
            const listBooks:Array<BookInterface> = result.body.map((element:any):BookInterface => {return this.changeInBookInterface(element)});
            this._subjectBooksList.next(listBooks);
        }
    }

    private changeInBookInterface(value:any):BookInterface{
        return {cover: value.cover, isbn: value.isbn, price: value.price, synopsis: value.synopsis, title: value.title}
    }

    private findBookInCard(book:BookInterface):number{
        const listCart:Array<BookInterface> = this._subjectBooksCart.value;
        for(let i:number = 0; i < listCart.length; i++){
            if(listCart[i].isbn === book.isbn){
                return i;
            }
        }

        return -1;
    }

    private createHttpParams(objectToTransform:any):HttpParams{
        return new HttpParams({fromObject: objectToTransform});
    }

}