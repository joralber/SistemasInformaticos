import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../../config/config';

import { Pfkardex } from '../pfkardex';
@Injectable({
  providedIn: 'root'
})
export class PfkardexService {
private apiURL = `${API_URL}/prodKar/`;
 // private apiURL = 'http://127.0.0.1:8000/api/prodKar/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

   create(pfkardex): Observable<Pfkardex> {
   return this.httpClient.post<Pfkardex>(this.apiURL, JSON.stringify(pfkardex), this.httpOptions)
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
