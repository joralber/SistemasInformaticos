import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../../config/config';

import { Proveedor } from '../proveedor';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

      private apiURL = `${API_URL}/proveedor/`;
  //private apiURL = 'http://127.0.0.1:8000/api/proveedor/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  
 /*
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for book consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

*/
  constructor(private httpClient: HttpClient) { }

/* 
  getlist (): Observable<Proveedor[]> {
  return this.httpClient.get<Proveedor[]>(this.apiURL).pipe(
    tap(_ => console.log('fetched proveedor')),

    catchError(this.handleError<Proveedor[]>('getList', []))
  );
}
*/


  getAll(): Observable<Proveedor[]> {
   return this.httpClient.get<Proveedor[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(proveedor): Observable<Proveedor> {
   return this.httpClient.post<Proveedor>(this.apiURL, JSON.stringify(proveedor), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_proveedor){
   return this.httpClient.put<Proveedor>(this.apiURL +'estado/' + id_proveedor, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }



  find(id_proveedor): Observable<Proveedor> {
   return this.httpClient.get<Proveedor>(this.apiURL + id_proveedor)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_proveedor, proveedor): Observable<Proveedor> {
   return this.httpClient.put<Proveedor>(this.apiURL + id_proveedor, JSON.stringify(proveedor), this.httpOptions)
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
