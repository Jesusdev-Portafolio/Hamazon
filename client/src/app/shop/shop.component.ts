import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;//antes estaba a true pero se cargaba antes del loading por eso lo cambio a false y ya se carga despues
  @ViewChild('searchMobile', {static: false}) searchTermMobile: ElementRef
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams()
  totalItems: number;
  sortOptions = [
    {name: 'Nombre', value: 'Name'},
    {name: 'Precio: Mas Baratos Primero', value: 'Price'}, // because in my API the default option is for Price ASC so no needed to explicit describe here
    {name: 'Precio: Mas Caros Primero', value: 'PriceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

   this.getProducts();
   this.getTypes();
   this.getBrands();
  }

  getProducts () {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalItems = response.totalItems;
    }, error => {
      console.log(error);
    });
  }

  getBrands () {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'Todo'}, ...response];
    },error =>{
      console.log(error);
    });
  }

  getTypes () {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'Todo'}, ...response];
    },error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId  = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChange(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
   onSearch(){
     this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.shopParams.typeId = 0; // no lo se rick creo que esta bien si no lo borro y queda como esta por defecto en 1
     this.getProducts();
   }

   onReset(){

      $('.sort-reset').prop('selectedIndex', 0);
     this.searchTerm.nativeElement.value = '';
     this.searchTermMobile.nativeElement.value = '';
     this.shopParams = new ShopParams();
     this.getProducts();
   }
}
