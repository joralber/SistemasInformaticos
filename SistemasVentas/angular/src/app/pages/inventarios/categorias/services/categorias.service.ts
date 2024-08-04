import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../../config/config';

import { Categorias } from '../categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
private apiURL = `${API_URL}/categoria`;
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }


  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Categorias[]> {
   return this.httpClient.get<Categorias[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(categorias): Observable<Categorias> {
   return this.httpClient.post<Categorias>(this.apiURL, JSON.stringify(categorias), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_cat){
   return this.httpClient.put<Categorias>(this.apiURL +'/estado/' + id_cat, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(nombre_cat){
   return this.httpClient.get<Categorias>(this.apiURL +'/rep/' + nombre_cat)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_cat): Observable<Categorias> {
   return this.httpClient.get<Categorias>(this.apiURL +'/'+ id_cat)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_cat, categorias): Observable<Categorias> {
   return this.httpClient.put<Categorias>(this.apiURL +'/'+ id_cat, JSON.stringify(categorias), this.httpOptions)
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
