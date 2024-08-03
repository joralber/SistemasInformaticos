import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { CostoProduccion } from '../costo-produccion';
import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class CostoproduccionService {
private apiURL = `${API_URL}/costo_produccion/`;
     // private apiURL = 'http://127.0.0.1:8000/api/costo_produccion/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

   constructor(private httpClient: HttpClient) { }

    getAll(): Observable<CostoProduccion[]> {
   return this.httpClient.get<CostoProduccion[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

create(costoproduccion): Observable<CostoProduccion> {
   return this.httpClient.post<CostoProduccion>(this.apiURL, JSON.stringify(costoproduccion), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  ultimo_id(): Observable<CostoProduccion> {
   return this.httpClient.get<CostoProduccion>(this.apiURL + 'ultimo')
   .pipe(
     catchError(this.errorHandler)
   )
 }
 
 delete(costoproduccion){
   return this.httpClient.put<CostoProduccion>(this.apiURL +'estado/' + costoproduccion, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   find(costoproduccion): Observable<CostoProduccion> {
   return this.httpClient.get<CostoProduccion>(this.apiURL + costoproduccion)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  find2(idcodigo_estilo): Observable<CostoProduccion> {
   return this.httpClient.get<CostoProduccion>(this.apiURL+'get/' + idcodigo_estilo)
   .pipe(
     catchError(this.errorHandler)
   )
 }

    getAllDetalle(idcodigo_estilo): Observable<CostoProduccion[]> {
   return this.httpClient.get<CostoProduccion[]>(this.apiURL+ 'detalle/'+ idcodigo_estilo)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  update(id_costo, costoproduccion): Observable<CostoProduccion> {
   return this.httpClient.put<CostoProduccion>(this.apiURL + id_costo, JSON.stringify(costoproduccion), this.httpOptions)
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
