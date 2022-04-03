import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {

  @ViewChild("submitFormButton", {static: true}) submitFormButton!:ElementRef;

  public searchForm!:FormGroup;

  private _unsubscribeSubmitButton!:Function;

  public get formControlName():string{
    return "inputSearch";
  }

  constructor(private _formBuilder:FormBuilder, private _renderer:Renderer2, private _booksService:BooksService) { }

  public ngOnInit(): void {
    this.initForm();

    this._unsubscribeSubmitButton = this._renderer.listen(this.submitFormButton.nativeElement, "click", (event:MouseEvent) => {this.sendForm(event)});
  }

  public ngOnDestroy(): void {
    this._unsubscribeSubmitButton();
  }

  private initForm():void{
    const oInitForm:any = {
      [this.formControlName]: [this._booksService.currentParamSearch]
    }
    
    this.searchForm = this._formBuilder.group(oInitForm);
  }

  private sendForm(event:MouseEvent):void{
    if(this.searchForm.valid){
      this._booksService.sendParamToSearchBooks(this.searchForm.value[this.formControlName]);
    }
  }

}
