import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route:Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          if(error.status === 400){
            if(error.error.errors){
              throw error.error;
            }
            else{
              this.toastr.error(error.error.message, error.error.statusCode);
            }
          }
          if(error.status === 401){
            this.toastr.error("Correo o Contraseña Incorrecto", error.error.statusCode);
          }
          if(error.status === 404){
            this.route.navigateByUrl('/not-found');
          }
          if(error.status === 500){
            const navigationExtras: NavigationExtras = {state: {error: error.error}}
            this.route.navigateByUrl('/server-error', navigationExtras);
          }
        }

       // return throwError(() => new Error (error));
       return throwError(error);
      })
    );
  }
}
