import { AfterContentChecked, AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.scss']
})
export class CheckoutCardComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

 

  @Input('flip') flip = false;

  @Input('brand') cardLogo = "mastercard-logo"


  
}
   


