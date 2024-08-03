import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';


import { Colorpt } from '../colorpt';
import { API_URL } from '../../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ColorptService {


private apiURL = `${API_URL}/color_pt/`;
  //private apiURL = 'http://127.0.0.1:8000/api/color_pt/';

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


  getAll(): Observable<Colorpt[]> {
   return this.httpClient.get<Colorpt[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(colorpt): Observable<Colorpt> {
   return this.httpClient.post<Colorpt>(this.apiURL, JSON.stringify(colorpt), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_cat_pt){
   return this.httpClient.put<Colorpt>(this.apiURL +'estado/' + id_cat_pt, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(nombre_color){
   return this.httpClient.get<Colorpt>(this.apiURL +'rep/' + nombre_color)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_cat_pt): Observable<Colorpt> {
   return this.httpClient.get<Colorpt>(this.apiURL + id_cat_pt)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_cat_pt, colorpt): Observable<Colorpt> {
   return this.httpClient.put<Colorpt>(this.apiURL + id_cat_pt, JSON.stringify(colorpt), this.httpOptions)
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
