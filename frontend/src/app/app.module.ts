import { NgModule , LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//seteando euros porque por defecto viene en dolares
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);
//---------------------------------------------------

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   BrowserAnimationsModule,
   HttpClientModule,
   CoreModule,
   HomeModule,
   NgxSpinnerModule
  ],
  //esto es lo de los euros y para ponerlo a la derecha porque por defecto viene a la izquierda
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-DE' 
  },
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}

],
  bootstrap: [AppComponent]
})
export class AppModule { }
