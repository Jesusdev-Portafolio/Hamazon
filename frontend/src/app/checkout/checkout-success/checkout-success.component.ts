import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

  order?: Order;
  
  constructor( private router: Router ) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras?.state as Order

    console.log(this.order);
   }

  ngOnInit(): void {}

}
