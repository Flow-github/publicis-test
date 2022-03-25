import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMainMenu } from 'src/app/models/main-menu.interface';
import { ListLink } from '../../utils/link/list.link';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  private _listMenuInterface:Array<IMainMenu>;
  private _subRouteChange:Subscription;

  public get listMenuInterface():Array<IMainMenu>{
    return this._listMenuInterface;
  }

  constructor(private _router: Router) {
    this._listMenuInterface = new Array<IMainMenu>();
    this._listMenuInterface.push({label:"Liste des livres", link:ListLink.BOOKS_LIST});
    this._listMenuInterface.push({label:"voir votre panier", link:ListLink.BOOKS_CART});

    this._subRouteChange = this._router.events.subscribe((event) => {this.onRouteChange(event)});
  }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy():void{
    this._subRouteChange.unsubscribe();
  }

  private onRouteChange(event:object):void{
    if(event instanceof NavigationEnd){
      this.setCurrentSelectedLink(event.urlAfterRedirects);
    }
  }

  private setCurrentSelectedLink(currentURL:string):void{
    for(let i:number = 0; i < this._listMenuInterface.length; i++){
      const testURL:string = this._listMenuInterface[i].link != "./" ? this._listMenuInterface[i].link : "";
      const aSplitURL:Array<string> = currentURL.split(testURL);
      if(aSplitURL.length > 1){
        this._listMenuInterface[i].class = "current-link";
      }else{
        this._listMenuInterface[i].class = "";
      }
    }
  }

}
