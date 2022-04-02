import { Injectable } from "@angular/core";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { AbstractModal } from "../abstract-modal.component";

@Injectable({
    providedIn: "root"
})
export class ModalManagerService{

    private _listActiveModal:Array<any>;

    constructor(private _modalService:NgbModal){
        this._listActiveModal = new Array<any>();
    }

    public openModal(modalClass:any, optionsModal:NgbModalOptions = {}, dataModal:any = {}):void{
        optionsModal.animation = true;
        optionsModal.centered = true;
        let modal:NgbModalRef = this._modalService.open(modalClass, optionsModal);
        (modal.componentInstance as AbstractModal).inputDataModal = dataModal;
        let sub:Subscription = modal.closed.subscribe(() => this.closeModal());
        this._listActiveModal.push({target: modal, listener: sub});
    }

    public closeModal():void{
        if(this._listActiveModal.length > 0){
            let lastModal:any = this._listActiveModal.splice(this._listActiveModal.length - 1, 1)[0];
            let modal:NgbModalRef = lastModal.target;
            lastModal.listener.unsubscribe();
            if(modal.componentInstance){
                modal.close();
            }
        }
    }

}
