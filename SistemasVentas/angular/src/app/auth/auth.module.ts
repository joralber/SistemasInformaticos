import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RespaldosComponent } from './respaldos/respaldos.component';


@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPasswordComponent,
    RespaldosComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
     ReactiveFormsModule,
     HttpClientModule
  ]
})
export class AuthModule { }
