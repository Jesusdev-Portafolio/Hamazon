import { Component, Input, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
@Input () checkoutForm?: FormGroup;
deliveryMethods: DeliveryMethod[] = [];

//TODO: si no selecciono el shipping da error pero cuando lo ponga linear habra que seleccionarlo si o si

  constructor(private checkoutService: CheckoutService, private basketService : BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm => this.deliveryMethods = dm
    })
  }

  setShippingPrice(deliveryMethod: DeliveryMethod){
    this.basketService.setShipingPrice(deliveryMethod);
  }

}
