import { Component, OnInit } from '@angular/core';
import { Order, OrderAscDesc, OrderOrderBy } from 'src/app/shared/models/order';
import { OrderService } from '../order.service';
import { OrderParams } from 'src/app/shared/models/orderParams';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
 
  orders : Order[] = [];
  orderParams = new OrderParams();
  orderByDate = OrderOrderBy.Date;
  orderByPrice = OrderOrderBy.Price;

  showIconPrice = false;
  showIconDate = true;
  arrowUpOrDownPrice = false; //false down true up
  arrowUpOrDownDate = false; //false down true up

  totalItems: number;
  currentPage : number;
 

  constructor( private orderService: OrderService ) { }

  ngOnInit(): void {
    this.loadOrders();
  }


  
  loadOrders(){
    this.orderService.getOrders(this.orderParams).subscribe({
      next: ( response ) => {
        this.orders = response.data;
        this.orderParams.pageNumber = response.pageIndex;
        this.orderParams.pageSize = response.pageSize;
        this.totalItems = response.totalItems;
      }
      });
  }

  onPageChange(event: any){
    if(this.orderParams.pageNumber !== event){
      this.currentPage = event;
      this.orderParams.pageNumber = event;
      this.loadOrders();
    }
  }

  orderBy(orderBy : OrderOrderBy){
    this.orderParams.ascDesc = this.setOpositeAscDescValue();
    this.orderParams.orderBy = orderBy;
    this.higlightSelectedIcon();
    this.loadOrders();
      
  }

  private setOpositeAscDescValue(): OrderAscDesc{
   return (this.orderParams.ascDesc == OrderAscDesc.Default)
    ? OrderAscDesc.Ascending
    : (this.orderParams.ascDesc == OrderAscDesc.Ascending)
    ? OrderAscDesc.Descending 
    : (this.orderParams.ascDesc == OrderAscDesc.Descending)
    ? OrderAscDesc.Ascending : OrderAscDesc.Default
   
  }

  private higlightSelectedIcon(){
    switch(this.orderParams.orderBy){
      case OrderOrderBy.Date :{
        this.showIconDate = true;
        this.showIconPrice = false;
        this.arrowUpOrDownDate = this.turnArrowUporDown();
        this.arrowUpOrDownPrice = false;
      }
      break;
      case OrderOrderBy.Price : {
        this.showIconDate = false;
        this.showIconPrice = true;
        this.arrowUpOrDownPrice = this.turnArrowUporDown();
        this.arrowUpOrDownDate = false;
      }
      break;
    }

  }

   turnArrowUporDown(){
    return (this.orderParams.ascDesc === OrderAscDesc.Descending || this.orderParams.ascDesc === OrderAscDesc.Default) ? false : true;
  }

}
