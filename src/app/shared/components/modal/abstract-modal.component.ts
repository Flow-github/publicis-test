import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    template:''
})
export class AbstractModal implements OnInit, OnDestroy{

    @ViewChild("closeButton", {static: true}) closeButton!:ElementRef;

    public inputDataModal:any;
    public emitCloseEvent:EventEmitter<unknown>;

    private _unsubscribeCloseModal!:Function;

    constructor(protected _activeModal: NgbActiveModal, protected _renderer:Renderer2){
        this.emitCloseEvent = new EventEmitter<unknown>();
    }

    public ngOnInit(): void {
        this._unsubscribeCloseModal = this._renderer.listen(this.closeButton.nativeElement, "click", (event:MouseEvent) => {this.onCloseModal(event)});
    }

    public ngOnDestroy():void{
        this._unsubscribeCloseModal();
    }

    public closeModal():void{
        this._activeModal.close();
        this.emitCloseEvent.emit();
    }
    
    private onCloseModal(e:MouseEvent):void{
        this.closeModal();
    }

}