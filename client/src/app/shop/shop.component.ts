import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IBrand } from '../shared/models/productBrand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';
import * as $ from 'jquery';
//import { PageChangedEvent } from 'ngx-bootstrap/pagination';


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
  shopParams = new ShopParams();
  totalItems: number;
  sortOptions = [
    {name: 'Nombre', value: 'Name'},
    {name: 'Precio: Mas Baratos Primero', value: 'Price'}, // because in my API the default option is for Price ASC so no needed to explicit describe here
    {name: 'Precio: Mas Caros Primero', value: 'PriceDesc'}
  ];

 comprobarVieneDeFuncion: boolean;

   

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
   this.getProducts("kk");
   this.getTypes();
   this.getBrands();
  }

     getProducts (origen:string) {
          this.shopService.getProducts(this.shopParams).subscribe(response => {
          this.products = response.data;
          this.shopParams.pageNumber = response.pageIndex
          this.shopParams.pageSize = response.pageSize;
          this.shopParams.totalPages = response.totalPAges;
          this.totalItems = response.totalItems;

           this.comprobarVieneDeFuncion = origen === "main";
           console.log(this.comprobarVieneDeFuncion)
        
      
      
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
    this.getProducts("main");
  }

  onTypeSelected(typeId: number) { 
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts("main");
    
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts("main");
  }

  onPageChange(event: any){

    console.log(this.shopParams.pageNumber)
    console.log(event);
    console.log(this.comprobarVieneDeFuncion + "1") 

    if(!this.comprobarVieneDeFuncion){
        this.shopParams.pageNumber = event;
        this.getProducts("kk");
      }
    this.comprobarVieneDeFuncion = false;
    console.log(this.comprobarVieneDeFuncion + " 2")
  }
  
   onSearch(){
     //si es nulo uno tendra algo el otro y si son nulos los dos pues retorno todo
      this.shopParams.search = this.searchTerm.nativeElement.value !== "" ? this.searchTerm.nativeElement.value : this.searchTermMobile.nativeElement.value; 
      this.shopParams.pageNumber = 1;
      this.shopParams.typeId = 0; // no lo se rick creo que esta bien si no lo borro y queda como esta por defecto en 1
      this.getProducts("main");
   }

   onReset(){
      $('.sort-reset').prop('selectedIndex', 0);
     this.searchTerm.nativeElement.value = '';
     this.searchTermMobile.nativeElement.value = '';
     this.shopParams = new ShopParams();
     this.getProducts("main");
   }
}
