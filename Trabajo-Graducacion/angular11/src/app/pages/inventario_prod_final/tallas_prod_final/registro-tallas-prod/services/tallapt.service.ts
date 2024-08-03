import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';


import { Tallapt } from '../tallapt';
import { API_URL } from '../../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class TallaptService {

private apiURL = `${API_URL}/talla_pt/`;
//  private apiURL = 'http://127.0.0.1:8000/api/talla_pt/';

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


  getAll(): Observable<Tallapt[]> {
   return this.httpClient.get<Tallapt[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(tallapt): Observable<Tallapt> {
   return this.httpClient.post<Tallapt>(this.apiURL, JSON.stringify(tallapt), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_talla_pt){
   return this.httpClient.put<Tallapt>(this.apiURL +'estado/' + id_talla_pt, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(nombre_talla){
   return this.httpClient.get<Tallapt>(this.apiURL +'rep/' + nombre_talla)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_talla_pt): Observable<Tallapt> {
   return this.httpClient.get<Tallapt>(this.apiURL + id_talla_pt)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_talla_pt, tallapt): Observable<Tallapt> {
   return this.httpClient.put<Tallapt>(this.apiURL + id_talla_pt, JSON.stringify(tallapt), this.httpOptions)
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
