import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../config/config';

import { Kardexmp } from '../kardexmp';
@Injectable({
  providedIn: 'root'
})
export class KardexmpService {

      private apiURL = `${API_URL}/kardex_mp/`;
  //private apiURL = 'http://127.0.0.1:8000/api/kardex_mp/';
      private apiURL2 = `${API_URL}/kardex2/`;
  //private apiURL2 = 'http://127.0.0.1:8000/api/kardex2/';


  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }



  constructor(private httpClient: HttpClient) { }

  getAll2(id_mp): Observable<Kardexmp[]> {
   return this.httpClient.get<Kardexmp[]>(this.apiURL + id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }

    create(kardexmp): Observable<Kardexmp> {
   return this.httpClient.post<Kardexmp>(this.apiURL, JSON.stringify(kardexmp), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }




   ultimo_id(): Observable<Kardexmp> {
   return this.httpClient.get<Kardexmp>(this.apiURL + 'ultimo')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  obtenerUltimoId(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL2 + 'obtener') .pipe(
     catchError(this.errorHandler)
   )
  }

  update(id_mp, kardexmp): Observable<Kardexmp> {
   return this.httpClient.put<Kardexmp>(this.apiURL + id_mp, JSON.stringify(kardexmp), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id_kardex): Observable<Kardexmp> {
   return this.httpClient.get<Kardexmp>(this.apiURL + 'hola/' +id_kardex)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getAllUpdateP(): Observable<Kardexmp[]> {
   return this.httpClient.get<Kardexmp[]>(this.apiURL2)
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
