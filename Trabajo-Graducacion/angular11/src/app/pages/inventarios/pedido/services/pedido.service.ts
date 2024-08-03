import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Pedido } from '../pedido';
import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
      private apiURL = `${API_URL}/pedido/`;
  // private apiURL = 'http://127.0.0.1:8000/api/pedido/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

   constructor(private httpClient: HttpClient) { }

create(pedido): Observable<Pedido> {
   return this.httpClient.post<Pedido>(this.apiURL, JSON.stringify(pedido), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

ultimo_id(): Observable<Pedido> {
   return this.httpClient.get<Pedido>(this.apiURL + 'ultimop')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  getAll(): Observable<Pedido[]> {
   return this.httpClient.get<Pedido[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   find(idpedido): Observable<Pedido> {
   return this.httpClient.get<Pedido>(this.apiURL + idpedido)
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
