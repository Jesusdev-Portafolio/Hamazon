import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CoreModule } from '../core/core.module';
import { BasketModule } from '../basket/basket.module';
import { AccountModule } from '../account/account.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutCardComponent } from './checkout-card/checkout-card.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutSuccessComponent,
    CheckoutReviewComponent,
    CheckoutCardComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CoreModule,
    BasketModule,
    AccountModule,
    SharedModule
  ]
})
export class CheckoutModule { }
