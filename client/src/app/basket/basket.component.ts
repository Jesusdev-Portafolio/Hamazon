import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;  
  basket: IBasket;

  constructor(private basketService:BasketService, private toastr:ToastrService) { }

  ngOnInit(): void {
  this.basket$ = this.basketService.basket$;
  this.basket = this.basketService.getCurrentBasketValue();
  }

  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
    const timer$ = timer(1100);
    timer$.subscribe((n) =>{
      this.toastr.success("Eliminado Correctamente", "", {
        timeOut:1500,
        positionClass: 'toast-center-center' , 
        closeButton: true,
     });
    })

  }

  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

  deleteBasket(basket:IBasket){
    this.basketService.deleteBasket(basket);
    const timer$ = timer(1100);
    timer$.subscribe((n)=>{
      this.toastr.success("Productos Eliminados", "", {
        timeOut:1500,
        positionClass: 'toast-center-center' , 
        closeButton: true
     });
    })
  }
}
