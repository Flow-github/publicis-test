import { Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { RequestService } from "./requests.service";

@Injectable({
    providedIn: 'root'
})
export class BooksService{

    public booksList$: Observable<any>;

    private _subjectBooksList:BehaviorSubject<any>;

    constructor(private _requestService: RequestService) {
        this._subjectBooksList = new BehaviorSubject<any>(null);
        this.booksList$ = this._subjectBooksList.asObservable();
    }

    public getAllBooksList():void{
        this._requestService.getRequest("books").subscribe((result:any) => {this.onBooksListResult(result)});
    }

    private onBooksListResult(result:any):void{
        if(result.body){
            console.log("onBooksListResult");
            console.log(result);
        }
    }

    private createHttpParams(objectToTransform:any):HttpParams{
        return new HttpParams({fromObject: objectToTransform});
    }

}