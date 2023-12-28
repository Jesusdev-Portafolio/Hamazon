import { Component, OnInit } from '@angular/core';
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
 
  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAddresFromValues();
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
      nameOnCard: ['', Validators.required]
    })
  })


  getAddresFromValues(){
    this.accountService.getUserAddress().subscribe({
      next: address => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    })
  }
 


}
