import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopComponent } from '../shop.component';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit { 
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bcService: BreadcrumbService, private basketService:BasketService, private toastr: ToastrService ) {
    this.bcService.set('@productDetails', ' ');
   }

  ngOnInit(): void {
    this.loadProduct(); 
  }

    addItemToBasket(){
      this.basketService.addItemToBasket(this.product, this.quantity);
      this.toastr.success("Añadido Correctamente", "", {
        timeOut:1500,
        positionClass: 'toast-center-center' , 
        closeButton: true
     
     });

    }

    incrementQuantity(){
      this.quantity++;
    }
    decrementQuantity(){
      if(this.quantity>1){
        this.quantity--;
      }
      
    }

  loadProduct(){
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name)
    },error => {
      console.log(error);
    });  
  }


}
