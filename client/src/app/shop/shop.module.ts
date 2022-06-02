import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { CoreModule } from '../core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
//import { FormsModule } from '@angular/forms'; 



@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule,
    ShopRoutingModule,
    CoreModule,
    ToastrModule.forRoot({
    positionClass: 'toast-top-right',
    preventDuplicates: true
    }),
  ]
})

export class ShopModule { }
