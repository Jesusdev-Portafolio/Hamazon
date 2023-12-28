import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

const routes: Routes = [
  {path: '', component:OrdersComponent},
  {path: ':id', component:OrderDetailedComponent, data: {breadcrumb : {alias: 'pedidoId'}}},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class OrderRoutingModule { }
