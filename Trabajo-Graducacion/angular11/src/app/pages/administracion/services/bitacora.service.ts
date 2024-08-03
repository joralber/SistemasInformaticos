import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../config/config';
import { Bitacora } from '../bitacora';
import { DetalleBitacora } from '../detalleBitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

private apiURL = `${API_URL}/bitacora/`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

 getAll(): Observable<Bitacora[]> {
   return this.httpClient.get<Bitacora[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 getAllDetalle(id_bitacora): Observable<DetalleBitacora[]> {
   return this.httpClient.get<DetalleBitacora[]>(this.apiURL + id_bitacora)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(detalleBitacora): Observable<any> {
   return this.httpClient.post<any>(this.apiURL, JSON.stringify(detalleBitacora), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


   update(id_bitacora){
   return this.httpClient.put<any>(this.apiURL + id_bitacora, this.httpOptions)
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
