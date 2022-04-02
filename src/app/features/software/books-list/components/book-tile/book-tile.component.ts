import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BookInterface } from 'src/app/models/book.interface';
import { EventsMouse } from '../../services-events/events-mouse.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.scss']
})
export class BookTileComponent implements OnInit, OnDestroy {

  @Input() bookData!:BookInterface;

  private _unlistenMouseClick!:Function;

  public get title():string{
    return this.bookData ? this.bookData.title : "";
  }

  public get imgUrl():string{
    return this.bookData ? this.bookData.cover : "";
  }

  public constructor(private _eventsMouseService:EventsMouse, private _renderer:Renderer2, private _elRef:ElementRef) { }

  public ngOnInit(): void {
    this._unlistenMouseClick = this._renderer.listen(this._elRef.nativeElement, "click", (e:MouseEvent) => { this.onClickTile(e)});
  }

  public ngOnDestroy(): void {
    this._unlistenMouseClick();
  }

  private onClickTile(e:MouseEvent):void{
    this._eventsMouseService.selectTile.emit(this.bookData);
  }

}
