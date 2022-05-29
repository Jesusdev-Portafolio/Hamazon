import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasket, IBasketTotals } from '../shared/models/basket';
import { IUser } from '../shared/models/user';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  basket: IBasket;
  currentUser$ : Observable<IUser>
  basketTotals$: Observable<IBasketTotals>
  basket$: Observable<IBasket>; 
  

  constructor(private bsktService: BasketService, private accountService: AccountService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket = this.bsktService.getCurrentBasketValue();
    this.currentUser$ = this.accountService.currentUser$;
    this.basketTotals$ = this.bsktService.basketTotal$;
    this.basket$ = this.bsktService.basket$;
  }

  pagar(basket:IBasket){
    this.bsktService.deleteBasket(basket);

    const timer$ = timer(1100);
    timer$.subscribe((n)=>{
      this.toastr.success("¡Compra Exitosa!", "", {
        timeOut:1500,
        positionClass: 'toast-center-center' , 
        closeButton: true
     });
    })
  }

}
