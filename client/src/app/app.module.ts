import { NgModule , LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

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
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';

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
   HomeModule
  ],
  //esto es lo de los euros y para ponerlo a la derecha porque por defecto viene a la izquierda
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-DE' 
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
