import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountModule } from 'src/app/account/account.module';
import { AccountService } from 'src/app/account/account.service';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
    @Input() checkoutForm?: FormGroup;

  constructor(private accountService : AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm?.get('addressForm')?.value)
      .subscribe({
        next: () => {
          this.toastr.success('Address saved');
          this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value);
        }
      });
  }

}
