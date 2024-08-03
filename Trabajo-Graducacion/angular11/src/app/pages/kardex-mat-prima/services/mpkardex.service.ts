import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { Mpkardexmp } from '../mpkardexmp';
import { Compra } from '../../compras/compras/compra';
import { API_URL } from '../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class MpkardexService {


      private apiURL = `${API_URL}/mp_kardexmp/`;
  //private apiURL = 'http://127.0.0.1:8000/api/mp_kardexmp/';
            private apiURL2 = `${API_URL}/nuevo/`;
  //private apiURL2 = 'http://127.0.0.1:8000/api/nuevo/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

   create(mpkardexmp): Observable<Mpkardexmp> {
   return this.httpClient.post<Mpkardexmp>(this.apiURL, JSON.stringify(mpkardexmp), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  ultimo_id(id_mp): Observable<Mpkardexmp> {
   return this.httpClient.get<Mpkardexmp>(this.apiURL + 'ultimok/' +id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getCompras(id_compra): Observable<Compra> {
   return this.httpClient.get<Compra>(this.apiURL2+'getcomp/' + id_compra)
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


