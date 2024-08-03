import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../config/config';
import { Usuarios } from '../usuarios';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiURL = `${API_URL}/admin/`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

 create(usuario): Observable<Usuarios> {
   return this.httpClient.post<Usuarios>(this.apiURL, JSON.stringify(usuario), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

repetido(email){
      const emailCodificado = encodeURIComponent(email);
 
   return this.httpClient.get<Usuarios[]>(`${this.apiURL +'email'}?email=${emailCodificado}`)
   //return this.httpClient.get<Usuarios>(this.apiURL +'email/' + email)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getAll(): Observable<Usuarios[]> {
   return this.httpClient.get<Usuarios[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id){
   return this.httpClient.put<Usuarios>(this.apiURL +'estado/' + id, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

find(id): Observable<Usuarios> {
   return this.httpClient.get<Usuarios>(this.apiURL + id)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  update(id, usuario): Observable<Usuarios> {
   return this.httpClient.put<Usuarios>(this.apiURL + id, JSON.stringify(usuario), this.httpOptions)
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
