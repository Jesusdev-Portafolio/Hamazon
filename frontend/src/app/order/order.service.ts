import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + 'orders' );
  }

  getOrderById(id : number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id );
  }

}
