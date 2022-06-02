import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, timer } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router:Router, private toastr: ToastrService){}

//si esta logueado lo activamos si no no 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if(auth){
          return true;
        }
        this.router.navigate(['cuenta/Ingresar'], {queryParams:{returnUrl: state.url}});
        const timer$ = timer(150);
        timer$.subscribe((n)=>{
          this.toastr.error("Ingresa para completar tu compra", "", {
          timeOut:1200,
          positionClass: 'toast-center-center' , 
          closeButton: true
     });
    });
        
      })
    )
  }
  
}
