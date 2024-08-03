import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Factor } from '../factor';
import { API_URL } from '../../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class FactorService {
private apiURL = `${API_URL}/factor/`;
//    private apiURL = 'http://127.0.0.1:8000/api/factor/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

   constructor(private httpClient: HttpClient) { }




  getAll(): Observable<Factor[]> {
   return this.httpClient.get<Factor[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(factor): Observable<Factor> {
   return this.httpClient.post<Factor>(this.apiURL, JSON.stringify(factor), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }




  find(id_factor): Observable<Factor> {
   return this.httpClient.get<Factor>(this.apiURL + id_factor)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  update(id_factor, factor): Observable<Factor> {
   return this.httpClient.put<Factor>(this.apiURL + id_factor, JSON.stringify(factor), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 existe(id_mp){
   return this.httpClient.get<Factor[]>(this.apiURL +'existe/' + id_mp)
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
