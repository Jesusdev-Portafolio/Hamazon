import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/'; 

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString())
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString())
    }
      //dont know how to different between price lowest and highest so i put a diferent value into option an if i choose
      //highest i think, then ill do the else part, otherwise ill just add the sort parmeter
      if(shopParams.sort != "PriceDesc"){
        params = params.append('orderBy', shopParams.sort);//this mean Name or Price
      }else{
        params = params.append('orderBy', "Price");
        params = params.append('AscDesc', 'Desc');
      }
      if(shopParams.search){
        params = params.append('search', shopParams.search)
      }

      params = params.append('pageIndex' , shopParams.pageNumber.toString());
      params = params.append('pageSize' , this.itemsPerPage().toString())

     

    

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      )

  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

   itemsPerPage(){
       return screen.width > 1300 ? 8 : 6 ;
    }
}


