import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IBasketItem } from '../../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-sumary',
  templateUrl: './basket-sumary.component.html',
  styleUrls: ['./basket-sumary.component.scss']
})
export class BasketSumaryComponent implements OnInit {
@Output() incrementItem = new EventEmitter<IBasketItem>();
@Output() decrementItem = new EventEmitter<IBasketItem>();
@Output() removeItem = new EventEmitter<IBasketItem>();
@Input() isBasket = true;

  constructor(public bs: BasketService){}

  incrementItemQuantity(item: IBasketItem){
    this.incrementItem.emit(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.decrementItem.emit(item);
  }

  removeBasketItem(item: IBasketItem){
    this.removeItem.emit(item);
  }

  ngOnInit(): void {
  }

}
