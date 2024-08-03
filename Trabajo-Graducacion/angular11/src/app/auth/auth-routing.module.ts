import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RespaldosComponent } from './respaldos/respaldos.component';

const routes: Routes = [  {path:'login', component: LoginComponent},
                          {path:'recuperar-password', component: RecuperarPasswordComponent},
                            {path:'respaldos', component: RespaldosComponent},


                       ];

@NgModule({
  imports: [RouterModule.forChild(routes),
            CommonModule,

            ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
