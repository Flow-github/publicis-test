import { Component, Input } from '@angular/core';
import { OfferInterface } from 'src/app/models/offer.interface';

@Component({
  selector: 'app-best-offer',
  templateUrl: './best-offer.component.html',
  styleUrls: ['./best-offer.component.scss']
})
export class BestOfferComponent {

  @Input() offer!:OfferInterface;

  public get type():string{
    return this.offer.type;
  }

  public get totalPrice():string{
    return this.offer.totalPrice.toString();
  }

  public get offerValue():string{
    return this.offer.value.toString();
  }

  public get priceAfterOffer():string{
    return (this.offer.totalPrice - this.offer.value).toString();
  }

  constructor() { }

}
