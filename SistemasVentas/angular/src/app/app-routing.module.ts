import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
const routes: Routes = [
// {path:'', redirectTo:'/dashboard', pathMatch:'full'},
{path:'', redirectTo:'/login', pathMatch:'full'},
  ];

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
