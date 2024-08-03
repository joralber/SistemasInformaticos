import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { DetalleEstilo } from '../detalle-estilo';

import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class DetalleEstiloService {
    private apiURL = `${API_URL}/detallepedido/`;
//   private apiURL = 'http://127.0.0.1:8000/api/detallepedido/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }



create(detalleestilo): Observable<DetalleEstilo> {
   return this.httpClient.post<DetalleEstilo>(this.apiURL, JSON.stringify(detalleestilo), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getAllDetalle(idpedido): Observable<DetalleEstilo[]> {
   return this.httpClient.get<DetalleEstilo[]>(this.apiURL + idpedido)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getAllupdate(idpedido): Observable<DetalleEstilo[]> {
   return this.httpClient.get<DetalleEstilo[]>(this.apiURL +'get/'+ idpedido)
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
