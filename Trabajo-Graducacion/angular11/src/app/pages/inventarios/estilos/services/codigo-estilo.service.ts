import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { CodigoEstilo } from '../codigo-estilo';
import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class CodigoEstiloService {
    private apiURL = `${API_URL}/codigo_estilo/`;
//      private apiURL = 'http://127.0.0.1:8000/api/codigo_estilo/';
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

   constructor(private httpClient: HttpClient) { }


  getAll(): Observable<CodigoEstilo[]> {
   return this.httpClient.get<CodigoEstilo[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getAll2(): Observable<CodigoEstilo[]> {
   return this.httpClient.get<CodigoEstilo[]>(this.apiURL + 'uno')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  ultimo_id(): Observable<CodigoEstilo> {
   return this.httpClient.get<CodigoEstilo>(this.apiURL + 'ultimo')
   .pipe(
     catchError(this.errorHandler)
   )
 }

create(codigoestilo): Observable<CodigoEstilo> {
   return this.httpClient.post<CodigoEstilo>(this.apiURL, JSON.stringify(codigoestilo), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }



 delete(codigoestilo){
   return this.httpClient.put<CodigoEstilo>(this.apiURL +'estado/' + codigoestilo, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  find(codigoestilo): Observable<CodigoEstilo> {
   return this.httpClient.get<CodigoEstilo>(this.apiURL + codigoestilo)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(idcodigo_estilo, codigoestilo): Observable<CodigoEstilo> {
   return this.httpClient.put<CodigoEstilo>(this.apiURL + idcodigo_estilo, JSON.stringify(codigoestilo), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

repetido(estilo){
   return this.httpClient.get<CodigoEstilo>(this.apiURL +'repc/' + estilo)
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
