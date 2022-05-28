import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CoreModule } from '../core/core.module';
import { BasketModule } from '../basket/basket.module';
import { AccountModule } from '../account/account.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CheckoutComponent
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
