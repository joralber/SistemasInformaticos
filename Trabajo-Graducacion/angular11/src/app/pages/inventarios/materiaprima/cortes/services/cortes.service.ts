import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';

import {catchError } from 'rxjs/operators';
import { Cortes } from '../cortes';
import { API_URL } from '../../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class CortesService {
private apiURL = `${API_URL}/corte/`;
 //private apiURL = 'http://127.0.0.1:8000/api/corte/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  

  constructor(private httpClient: HttpClient) { }

/* 
  getlist (): Observable<Proveedor[]> {
  return this.httpClient.get<Proveedor[]>(this.apiURL).pipe(
    tap(_ => console.log('fetched proveedor')),

    catchError(this.handleError<Proveedor[]>('getList', []))
  );
}
*/


  getAll(id_mp): Observable<Cortes[]> {
   return this.httpClient.get<Cortes[]>(this.apiURL+'listado/'+id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(cortes): Observable<Cortes> {
   return this.httpClient.post<Cortes>(this.apiURL, JSON.stringify(cortes), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

/*
 delete(id_color){
   return this.httpClient.put<Colormp>(this.apiURL +'estado/' + id_color, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

*/
 
 repetido(id_mp, corte){
      const corteCodificado = encodeURIComponent(corte);
 
   return this.httpClient.get<Cortes[]>(`${this.apiURL +'repc'}?id_mp=${id_mp}&cortes=${corteCodificado}`)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 

repetido2(id_mp){
   return this.httpClient.get<Cortes>(this.apiURL +'repcmp/' +id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_cortes): Observable<Cortes> {
   return this.httpClient.get<Cortes>(this.apiURL + id_cortes)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_cortes, cortes): Observable<Cortes> {
   return this.httpClient.put<Cortes>(this.apiURL + id_cortes, JSON.stringify(cortes), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  obtenerUltimoId(id_mp): Observable<number> {
    return this.httpClient.get<number>(this.apiURL + 'obtenec/'+ id_mp) .pipe(
     catchError(this.errorHandler)
   )
  }
    obtenerUltimoall(): Observable<number> {
    return this.httpClient.get<number>(this.apiURL) .pipe(
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
