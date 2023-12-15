import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';

const routes :Routes = [
  {path:'Ingresar', component:LoginComponent },
  {path:'Registrarse', component:RegisterComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CoreModule
  ],exports:[RouterModule]
})
export class AccountRoutingModule { }
