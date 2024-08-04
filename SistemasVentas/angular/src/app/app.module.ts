import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {DataTablesModule} from 'angular-datatables';
import { AuthModule } from './auth/auth.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    HttpClientModule,
     FormsModule,
    ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        DataTablesModule,
        NgSelectModule,
        NoopAnimationsModule,

  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
