import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import { API_URL } from '../../../../../config/config';

import {catchError } from 'rxjs/operators';


import { Medidamp } from '../medidamp';

@Injectable({
  providedIn: 'root'
})
export class MedidampService {

  private apiURL = `${API_URL}/medida_mp/`;
//  private apiURL = 'http://127.0.0.1:8000/api/medida_mp/';

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


  getAll(): Observable<Medidamp[]> {
   return this.httpClient.get<Medidamp[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(medidamp): Observable<Medidamp> {
   return this.httpClient.post<Medidamp>(this.apiURL, JSON.stringify(medidamp), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_medida){
   return this.httpClient.put<Medidamp>(this.apiURL +'estado/' + id_medida, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 repetido(medida){
   return this.httpClient.get<Medidamp>(this.apiURL +'rep/' + medida)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_medida): Observable<Medidamp> {
   return this.httpClient.get<Medidamp>(this.apiURL + id_medida)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_medida, medidamp): Observable<Medidamp> {
   return this.httpClient.put<Medidamp>(this.apiURL + id_medida, JSON.stringify(medidamp), this.httpOptions)
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
