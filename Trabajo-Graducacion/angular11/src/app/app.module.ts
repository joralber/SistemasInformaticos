import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule, ToastrService, ToastrConfig } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     HttpClientModule,
    AuthModule,
    PagesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    NgSelect2Module,
    NgSelectModule,
     BrowserAnimationsModule,
ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
            maxOpened: 2, // máximo de 5 notificaciones al mismo tiempo
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      tapToDismiss: false,
      timeOut: 30000,
      extendedTimeOut: 1000,
      easing: 'ease-in'
    }),

  ],
  providers: [ToastrService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
