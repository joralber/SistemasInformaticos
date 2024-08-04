import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../../config/config';

import { Color } from '../color';
@Injectable({
  providedIn: 'root'
})
export class ColorService {



private apiURL = `${API_URL}/color`;
  //private apiURL = 'http://127.0.0.1:8000/api/color_pt/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  

  constructor(private httpClient: HttpClient) { }



  getAll(): Observable<Color[]> {
   return this.httpClient.get<Color[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(color): Observable<Color> {
   return this.httpClient.post<Color>(this.apiURL, JSON.stringify(color), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_color){
   return this.httpClient.put<Color>(this.apiURL +'/estado/' + id_color, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(color){
   return this.httpClient.get<Color>(this.apiURL +'/rep/' + color)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_color): Observable<Color> {
   return this.httpClient.get<Color>(this.apiURL +'/'+ id_color)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_color, color): Observable<Color> {
   return this.httpClient.put<Color>(this.apiURL +'/'+ id_color, JSON.stringify(color), this.httpOptions)
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
