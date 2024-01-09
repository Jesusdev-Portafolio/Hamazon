import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  
  order: Order;

  constructor(private orderService: OrderService, private bcService: BreadcrumbService, private activateRoute: ActivatedRoute) {
      this.bcService.set('@pedidoId', ' pedidoId');
     }

  ngOnInit(): void {

    this.loadOrder();

  }

  loadOrder( ){
    let orderId = +this.activateRoute.snapshot.paramMap.get('id')
    this.orderService.getOrderById(orderId).subscribe({
      next: ( order ) => {
        this.order = order;
        this.bcService.set('@pedidoId', orderId.toString());
        console.log(order);
      }
    })
  }

}
