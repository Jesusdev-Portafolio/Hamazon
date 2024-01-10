import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, timer } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasket, IBasketTotals } from '../shared/models/basket';
import { IUser } from '../shared/models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { validate } from 'uuid';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
 
  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService) {}
  basket$: Observable<IBasket> = null;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.getAddresFromValues();
    setTimeout(() => this.getDeliveryMethodValue(), 200); //esto es por si refresca dentro del modulo de checkout, mientras se hace el suscribe
                                                          // el metodo de getDeliveryMethod llama al source pero como aun no ha completado el suscribe llega nulo
                                                          //asi que toca esperar cochinamente 2 decimas de segundo para darle tiempo, seguro hay otra forma mejor.


   }

  checkoutForm = this.fb.group({

    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      street:    ['', Validators.required],
      city:      ['', Validators.required],
      state:     ['', Validators.required],
      zipcode:   ['', Validators.required]
      }),

    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required]
    }),
    
    paymentForm: this.fb.group({
      nameOnCard   :  ["Jhon Doe"],
      numberOnCard :  ["000 - TEST - 000"],
      expiresCard  :  ["MM/YYYY"],
      cvv          :  [123] 
      
    })
  })


  getAddresFromValues(){
    this.accountService.getUserAddress().subscribe({
      next: address => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    })
  }

   getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket && basket.deliveryMethodId) {
      this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')
        ?.patchValue(basket.deliveryMethodId.toString());
    }
  }
 


}
