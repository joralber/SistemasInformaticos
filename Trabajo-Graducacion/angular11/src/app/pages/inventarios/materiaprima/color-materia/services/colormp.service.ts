
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../../../config/config';

import { Colormp } from '../colormp';

@Injectable({
  providedIn: 'root'
})
export class ColormpService {

  private apiURL = `${API_URL}/color_mp/`;
 // private apiURL = 'http://127.0.0.1:8000/api/color_mp/';

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


  getAll(): Observable<Colormp[]> {
   return this.httpClient.get<Colormp[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(colormp): Observable<Colormp> {
   return this.httpClient.post<Colormp>(this.apiURL, JSON.stringify(colormp), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_color){
   return this.httpClient.put<Colormp>(this.apiURL +'estado/' + id_color, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(color){
   return this.httpClient.get<Colormp>(this.apiURL +'rep/' + color)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_color): Observable<Colormp> {
   return this.httpClient.get<Colormp>(this.apiURL + id_color)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_color, colormp): Observable<Colormp> {
   return this.httpClient.put<Colormp>(this.apiURL + id_color, JSON.stringify(colormp), this.httpOptions)
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
