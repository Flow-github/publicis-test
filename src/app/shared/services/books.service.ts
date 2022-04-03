import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { RequestService } from "./requests.service";
import { BookInterface } from "src/app/models/book.interface";
import { OfferInterface } from "src/app/models/offer.interface";

@Injectable({
    providedIn: 'root'
})
export class BooksService{

    public booksList$: Observable<Array<BookInterface>>;
    public booksListFiltred$: Observable<Array<BookInterface>>;
    public booksCart$: Observable<Array<BookInterface>>;
    public paramSearchBooks$: Observable<string>;
    public offersBooks$: Observable<OfferInterface>;

    private _subjectBooksList:BehaviorSubject<Array<BookInterface>>;
    private _subjectBooksListFiltred:BehaviorSubject<Array<BookInterface>>;
    private _subjectBooksCart:BehaviorSubject<Array<BookInterface>>;
    private _subjectSearchBooks:BehaviorSubject<string>;
    private _subjectOffersBooks:Subject<OfferInterface>;

    public get currentParamSearch():string{
        return this._subjectSearchBooks.value;
    }

    public get isbnBooksCarted():string{
        const listIsbn:Array<string> = this._subjectBooksCart.value.map((book:BookInterface):string => {return book.isbn});
        return listIsbn.join(",");
    }

    public get totalPriceBooksCarted():number{
        let totalPrice:number = 0;
        const listBooksCarted:Array<BookInterface> = this._subjectBooksCart.value;
        for(let i:number = 0; i < listBooksCarted.length; i++){
            totalPrice += listBooksCarted[i].price;
        }

        return totalPrice;
    }

    constructor(private _requestService: RequestService) {
        this._subjectBooksList = new BehaviorSubject<Array<BookInterface>>([]);
        this.booksList$ = this._subjectBooksList.asObservable();

        this._subjectBooksListFiltred = new BehaviorSubject<Array<BookInterface>>([]);
        this.booksListFiltred$ = this._subjectBooksListFiltred.asObservable();

        this._subjectBooksCart = new BehaviorSubject<Array<BookInterface>>([]);
        this.booksCart$ = this._subjectBooksCart.asObservable();

        this._subjectSearchBooks = new BehaviorSubject<string>("");
        this.paramSearchBooks$ = this._subjectSearchBooks.asObservable();

        this._subjectOffersBooks = new Subject<OfferInterface>();
        this.offersBooks$ = this._subjectOffersBooks.asObservable();
    }

    public sendParamToSearchBooks(paramSearch:string):void{
        this._subjectSearchBooks.next(paramSearch);
    }

    public filterListBooks(paramSearch:string):void{
        const listBooksFiltred: Array<BookInterface> = this._subjectBooksList.value.filter((book:BookInterface):boolean => { return this.searchParamInBook(book, paramSearch)});
        this._subjectBooksListFiltred.next(listBooksFiltred);
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
     * Load books offers
     */
     public getBooksOffers():void{
        this._requestService.getRequest("books/" + this.isbnBooksCarted + "/commercialOffers").subscribe((result:any) => {this.onBooksOffersResult(result)});
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

    private onBooksOffersResult(result:any):void{
        if(result.body){
            const listOffers:Array<any> = result.body.offers;
            const priceTotal:number = this.totalPriceBooksCarted;
            const bestOffer:OfferInterface = {totalPrice: priceTotal, type: "", value: 0};
            for(let i:number = 0; i < listOffers.length; i++){
                let newValue:number = 0;
                switch(listOffers[i].type){
                    case "percentage" :
                        newValue = (priceTotal * listOffers[i].value) / 100;
                    break;
                    case "minus" :
                        newValue = listOffers[i].value;
                    break;
                    case "slice" :
                        newValue = (Math.ceil(priceTotal / listOffers[i].sliceValue)) * listOffers[i].value;
                    break;
                    default :
                    break;
                }

                if(newValue > bestOffer.value){
                    bestOffer.value = newValue;
                    bestOffer.type = listOffers[i].type;
                }
            }

            this._subjectOffersBooks.next(bestOffer);
        }
    }

    private searchParamInBook(book:BookInterface, paramSearch:string):boolean{
        const lowerSearch:string = paramSearch.toLocaleLowerCase();
        return book.title.toLocaleLowerCase().indexOf(lowerSearch) > -1 || book.isbn.toLocaleLowerCase().indexOf(lowerSearch) > -1 || book.synopsis.join().toLocaleLowerCase().indexOf(lowerSearch) > -1;
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

}