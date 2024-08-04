import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../../config/config';
import { Kardexpf } from '../kardexpf';

@Injectable({
  providedIn: 'root'
})
export class KardexpfService {

private apiURL = `${API_URL}/kardexprod/`;
//  private apiURL = 'http://127.0.0.1:8000/api/kardexprod/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }



  constructor(private httpClient: HttpClient) { }

  getAll2(id_producto): Observable<Kardexpf[]> {
   return this.httpClient.get<Kardexpf[]>(this.apiURL +'list/'+ id_producto)
   .pipe(
     catchError(this.errorHandler)
   )
 }
 

    create(kardexpf): Observable<Kardexpf> {
   return this.httpClient.post<Kardexpf>(this.apiURL, JSON.stringify(kardexpf), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }





   ultimo_id(): Observable<Kardexpf> {
   return this.httpClient.get<Kardexpf>(this.apiURL + 'ultimok')
   .pipe(
     catchError(this.errorHandler)
   )
 }
/*
   obtenerUltimoId(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL + 'ultimok') .pipe(
     catchError(this.errorHandler)
   )
  }
*/

   update(id_kardex_productos, kardexpf): Observable<Kardexpf> {
   return this.httpClient.put<Kardexpf>(this.apiURL + id_kardex_productos, JSON.stringify(kardexpf), this.httpOptions)
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
