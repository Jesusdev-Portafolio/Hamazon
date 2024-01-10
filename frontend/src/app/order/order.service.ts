import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order, OrderOrderBy } from '../shared/models/order';
import { OrderParams } from '../shared/models/orderParams';
import { map } from 'rxjs';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

  getOrders(orderParams: OrderParams) {
    let params = new HttpParams();
 
    params = params.append('orderBy', orderParams.orderBy);
    params = params.append('ascDesc', orderParams.ascDesc);

    params = params.append('pageIndex' , orderParams.pageNumber.toString());
    params = params.append('pageSize' , orderParams.pageSize.toString())

    return this.http.get<IPagination>(this.baseUrl + 'orders', {observe: 'response', params})
      .pipe(
        map(response => response.body)
      );
  }

  getOrderById(id : number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id );
  }

}
