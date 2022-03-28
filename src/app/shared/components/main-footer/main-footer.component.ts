import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent {

  private _stringYear:string

  public get stringYear():string{
    return this._stringYear;
  }

  constructor() {
    this._stringYear = new Date().getFullYear().toString();
  }

}
