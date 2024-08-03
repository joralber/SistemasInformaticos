import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthGuard } from './guard/auth.guard';
//import { LoginComponent } from './auth/login/login.component';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
const routes:Routes=[

 // {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path:'', redirectTo:'/login', pathMatch:'full'},


  {path:'**', component:NopageFoundComponent}

]
@NgModule({
  imports: [
      CommonModule,
      RouterModule.forRoot(routes, { useHash: false }),
 PagesRoutingModule,
    AuthRoutingModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
