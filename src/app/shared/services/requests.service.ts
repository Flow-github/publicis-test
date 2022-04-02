import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorInterface } from 'src/app/models/error.interface';
import { environment } from 'src/environments/environment';
import { RequestErrorService } from './request-error.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private _headers: HttpHeaders;

    public get rootAPI(): string {
        return environment.rootApi;
    }

    constructor(private _httpClient: HttpClient, private _requestError:RequestErrorService) {
        this._headers = new HttpHeaders();
        this._headers = this._headers.append('Content-Type', 'application/json');
    }

    public getRequest(requestPath: string, requestParam: HttpParams = new HttpParams()): Observable<any> {
        const observer: Observable<any> = this._httpClient.get(this.rootAPI + requestPath, {headers: this._headers, params: requestParam, observe: 'response', withCredentials: false});
        return observer.pipe(catchError((err: HttpErrorResponse): Observable<any> => {return this.onRequestError(err)}));
    }

    public postRequest(requestPath: string, requestParam: Object = {}): Observable<any> {
        const observer: Observable<any> = this._httpClient.post(this.rootAPI + requestPath, requestParam, {headers: this._headers, observe: 'response', withCredentials: false});
        return observer.pipe(catchError((err: HttpErrorResponse): Observable<any> => {return this.onRequestError(err)}));
    }

    public putRequest(requestPath: string, requestParam: any = {}): Observable<any> {
        const observer: Observable<any> = this._httpClient.put(this.rootAPI + requestPath, requestParam, {headers: this._headers, observe: 'response', withCredentials: false});
        return observer.pipe(catchError((err: HttpErrorResponse): Observable<any> => {return this.onRequestError(err)}));
    }

    public deleteRequest(requestPath: string, requestParam: HttpParams = new HttpParams()): Observable<any> {
        const observer: Observable<any> = this._httpClient.delete(this.rootAPI + requestPath, {headers: this._headers, params: requestParam, observe: 'response', withCredentials: false});
        return observer.pipe(catchError((err: HttpErrorResponse): Observable<any> => {return this.onRequestError(err)}));
    }

    private onRequestError(error: HttpErrorResponse): Observable<any> {
        const errorInterface: ErrorInterface = {status: error.status, statusText: error.statusText, title: error.statusText, message: error.message, ok: error.ok};
        return this.createErrorObservable(errorInterface);
    }

    private createErrorObservable(errorInterface:ErrorInterface):Observable<any>{
        this._requestError.throwNewError(errorInterface);
        return of({error: errorInterface});
    }

}