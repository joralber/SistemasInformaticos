import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../../config/config';

import { DetalleCodigoEstilo } from '../detalle-codigo-estilo';

@Injectable({
  providedIn: 'root'
})
export class DetalleCodigoEstiloService {
      private apiURL = `${API_URL}/detalle_codigo_estilo/`;
//    private apiURL = 'http://127.0.0.1:8000/api/detalle_codigo_estilo/';
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }



create(detallecodigoestilo): Observable<DetalleCodigoEstilo[]> {
   return this.httpClient.post<DetalleCodigoEstilo[]>(this.apiURL, JSON.stringify(detallecodigoestilo), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 getAllDetalle(idcodigo_estilo): Observable<DetalleCodigoEstilo[]> {
   return this.httpClient.get<DetalleCodigoEstilo[]>(this.apiURL + idcodigo_estilo)
   .pipe(
     catchError(this.errorHandler)
   )
 }


delete(iddetalle_codigo_estilo){
   return this.httpClient.delete<DetalleCodigoEstilo>(this.apiURL + iddetalle_codigo_estilo, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 getAllCosto(idcodigo_estilo): Observable<DetalleCodigoEstilo[]> {
   return this.httpClient.get<DetalleCodigoEstilo[]>(this.apiURL +'costo/'+ idcodigo_estilo)
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
