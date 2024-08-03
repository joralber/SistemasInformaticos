import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';


import { Categoriamp } from '../categoriamp';
import { API_URL } from '../../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class CategoriampService {

  private apiURL = `${API_URL}/categoria_mp/`;

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


  getAll(): Observable<Categoriamp[]> {
   return this.httpClient.get<Categoriamp[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(categoriamp): Observable<Categoriamp> {
   return this.httpClient.post<Categoriamp>(this.apiURL, JSON.stringify(categoriamp), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_categoria){
   return this.httpClient.put<Categoriamp>(this.apiURL +'estado/' + id_categoria, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(nombre){
   return this.httpClient.get<Categoriamp>(this.apiURL +'rep/' + nombre)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  find(id_categoria): Observable<Categoriamp> {
   return this.httpClient.get<Categoriamp>(this.apiURL + id_categoria)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_categoria, categoriamp): Observable<Categoriamp> {
   return this.httpClient.put<Categoriamp>(this.apiURL + id_categoria, JSON.stringify(categoriamp), this.httpOptions)
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
