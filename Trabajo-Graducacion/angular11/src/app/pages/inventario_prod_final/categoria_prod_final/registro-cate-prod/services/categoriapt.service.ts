import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../../../config/config';

import { Categoriapt } from '../categoriapt';

@Injectable({
  providedIn: 'root'
})
export class CategoriaptService {

private apiURL = `${API_URL}/categoria_pt/`;
//  private apiURL = 'http://127.0.0.1:8000/api/categoria_pt/';

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


  getAll(): Observable<Categoriapt[]> {
   return this.httpClient.get<Categoriapt[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(categoriapt): Observable<Categoriapt> {
   return this.httpClient.post<Categoriapt>(this.apiURL, JSON.stringify(categoriapt), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_cat_pt){
   return this.httpClient.put<Categoriapt>(this.apiURL +'estado/' + id_cat_pt, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(nombre_cat){
   return this.httpClient.get<Categoriapt>(this.apiURL +'rep/' + nombre_cat)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_cat_pt): Observable<Categoriapt> {
   return this.httpClient.get<Categoriapt>(this.apiURL + id_cat_pt)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_cat_pt, categoriapt): Observable<Categoriapt> {
   return this.httpClient.put<Categoriapt>(this.apiURL + id_cat_pt, JSON.stringify(categoriapt), this.httpOptions)
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
