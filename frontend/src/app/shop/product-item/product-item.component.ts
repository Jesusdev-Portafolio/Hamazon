import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  
  constructor(private basketService: BasketService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);  
    const timer$ = timer(150);
    timer$.subscribe((n) =>{
      this.toastr.success("Añadido Correctamente", "", {
        timeOut:1200,
        positionClass: 'toast-center-center' , 
        closeButton: true
    })
   });
  }

}
