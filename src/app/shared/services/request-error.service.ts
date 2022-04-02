import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ErrorInterface } from "src/app/models/error.interface";

@Injectable({
    providedIn: 'root'
})
export class RequestErrorService{

    public throwError$:Observable<ErrorInterface>;

    private _throwErrorSubject:Subject<ErrorInterface>;

    constructor(){
        this._throwErrorSubject = new Subject<ErrorInterface>();
        this.throwError$ = this._throwErrorSubject.asObservable();
    }

    public throwNewError(value:ErrorInterface):void{
        this._throwErrorSubject.next(value);
    }
}