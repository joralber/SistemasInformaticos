import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

      private apiURL = `${API_URL}/reportes`;
  //private apiURL = 'http://127.0.0.1:8000/api/Cliente/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  
 
  constructor(private httpClient: HttpClient) { }





  geVentaFecha(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/ingresosF')
   .pipe(
     catchError(this.errorHandler)
   )
 }




  getProductoMV(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/productoM/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  getClienteN(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/cliente/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }
  getVentaC(id_cat): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/vendidoC/'+id_cat)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   getVentaEm(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/ventaE/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }

     getClienteZona(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/cliZona/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }

      getClienteFrec(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'/cliMF/'+fechaI+'/'+fechaF)
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
