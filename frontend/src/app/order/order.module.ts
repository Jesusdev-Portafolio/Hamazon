import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";



@NgModule({
    declarations: [
        OrdersComponent,
        OrderDetailedComponent
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        SharedModule,
        CoreModule
    ]
})
export class OrderModule { }
