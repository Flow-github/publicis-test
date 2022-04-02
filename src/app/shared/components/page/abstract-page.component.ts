import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ErrorInterface } from "src/app/models/error.interface";
import { RequestErrorService } from "../../services/request-error.service";
import { ModalWebserviceErrorComponent } from "../modal/modal-webservice-error/modal-webservice-error.component";
import { ModalManagerService } from "../modal/service/modal-manager.service";

@Component({
    template:''
})
export class AbstractPage implements OnInit, OnDestroy{

    protected _globalSubscription:Subscription;

    constructor(protected _modalManager:ModalManagerService, protected _requestErrorService:RequestErrorService){
        this._globalSubscription = new Subscription();
    }

    public ngOnInit(): void {
        this._globalSubscription.add(this._requestErrorService.throwError$.subscribe((error:ErrorInterface) => {this.onWebserviceError(error)}));
    }

    public ngOnDestroy():void{
        this._globalSubscription.unsubscribe();
    }

    protected onWebserviceError(error:ErrorInterface):void{
        if(error){
          this._modalManager.openModal(ModalWebserviceErrorComponent, {windowClass: "", size:"lg"}, error);
        }
      }

}