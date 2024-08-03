import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

        private apiURL = `${API_URL}/dashboard/`;
 

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }


  getnVenta(): Observable<number> {
   return this.httpClient.get<number>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   getnCliente(): Observable<number> {
   return this.httpClient.get<number>(this.apiURL+'cli')
   .pipe(
     catchError(this.errorHandler)
   )
 }
    getnCompra(): Observable<number> {
   return this.httpClient.get<number>(this.apiURL+'comp')
   .pipe(
     catchError(this.errorHandler)
   )
 }

    getnProducto(): Observable<number> {
   return this.httpClient.get<number>(this.apiURL+'pro')
   .pipe(
     catchError(this.errorHandler)
   )
 }

     graficaVCC(): Observable<any> {
   return this.httpClient.get<any>(this.apiURL+'cred')
   .pipe(
     catchError(this.errorHandler)
   )
 }
      graficaCCC(): Observable<any> {
   return this.httpClient.get<any>(this.apiURL+'compCC')
   .pipe(
     catchError(this.errorHandler)
   )
 }

      productoMas(): Observable<any> {
   return this.httpClient.get<any>(this.apiURL+'prodMas')
   .pipe(
     catchError(this.errorHandler)
   )
 } 
 

      clienteMas(): Observable<any> {
   return this.httpClient.get<any>(this.apiURL+'cliMas')
   .pipe(
     catchError(this.errorHandler)
   )
 } 
   errorHandler(error) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     errorMessage = error.error.message;
   } else {
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   return throwError(errorMessage);
 }

}
