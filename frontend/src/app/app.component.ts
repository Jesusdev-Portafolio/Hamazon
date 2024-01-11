import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { JwtService } from './shared/jwt.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Informatic';


  //TODO: Cuando tenga mi portafolio poner el link en este proyecto

  constructor(private basketService: BasketService, private accountService:AccountService, private jwtService: JwtService) { }

  ngOnInit(): void {
   this.loadBasket();
   this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');

//si tengo token y no es nulo pero ya ha expirado me da error 401 con todo el sentido del mundo
//entonces primero reviso si el token no esta expirado y hago la peticion 
    this.jwtService.isTokenExpired(token)
    .pipe(
      switchMap( (token) => this.accountService.loadCurrentUser(token))
     )
     .subscribe({
        next: ( result ) => {
            if(result !== null){
              console.log('loaded user');
            }
        },
        error: (error) => console.log(error)
     });
    
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');

    if (basketId) {
        this.basketService.getBasket(basketId)
        .subscribe({
          next:() => console.log('initialised basket'),
          error: (error ) => console.log(error)
        });
    }
  }
}
