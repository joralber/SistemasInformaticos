import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../../config/config';

import { Tallas } from '../tallas';
@Injectable({
  providedIn: 'root'
})
export class TallasService {

private apiURL = `${API_URL}/talla`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  

  constructor(private httpClient: HttpClient) { }




  getAll(): Observable<Tallas[]> {
   return this.httpClient.get<Tallas[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(tallas): Observable<Tallas> {
   return this.httpClient.post<Tallas>(this.apiURL, JSON.stringify(tallas), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_talla){
   return this.httpClient.put<Tallas>(this.apiURL +'/estado/' + id_talla, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(talla){
   return this.httpClient.get<Tallas>(this.apiURL +'/rep/' + talla)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_talla): Observable<Tallas> {
   return this.httpClient.get<Tallas>(this.apiURL +'/'+ id_talla)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_talla, tallas): Observable<Tallas> {
   return this.httpClient.put<Tallas>(this.apiURL +'/'+ id_talla, JSON.stringify(tallas), this.httpOptions)
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
