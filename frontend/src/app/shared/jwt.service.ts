import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  baseUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

  isTokenExpired(token: string){
    if (token === null) return of(null);
    let tokenInfo = this.decodeToken( token );
       
    return this.http.get<string>(this.baseUrl+'server').pipe( //obtengo la fecha en formato no se que lo paso a segundos y comparo
      map((currentServerDate) => ( Date.parse(currentServerDate) / 1000 ) ),
      map((currentServerDate: number) => ( tokenInfo.exp > currentServerDate) ? token : null 
      ) 
    );

    
  }

  private decodeToken(token: string) {
    return jwt_decode.jwtDecode(token);
  }


}
