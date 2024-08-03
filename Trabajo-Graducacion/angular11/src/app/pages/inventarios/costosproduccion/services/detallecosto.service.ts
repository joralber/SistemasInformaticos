import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';

import {catchError } from 'rxjs/operators';

import { DetalleCosto } from '../detalle-costo';
import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class DetallecostoService {
  private apiURL = `${API_URL}/detalle_costo/`;
   // private apiURL = 'http://127.0.0.1:8000/api/detalle_costo/';
//    private apiURL2 = 'http://127.0.0.1:8000/api/nuevo/';
  private apiURL2 = `${API_URL}/nuevo/`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }

create(detallecosto): Observable<DetalleCosto[]> {
   return this.httpClient.post<DetalleCosto[]>(this.apiURL, JSON.stringify(detallecosto), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

    getAll(id_costo): Observable<DetalleCosto[]> {
   return this.httpClient.get<DetalleCosto[]>(this.apiURL +id_costo)
   .pipe(
     catchError(this.errorHandler)
   )
 }
 
 
    getAllCorte(id_cortes): Observable<DetalleCosto[]> {
   return this.httpClient.get<DetalleCosto[]>(this.apiURL2 +id_cortes)
   .pipe(
     catchError(this.errorHandler)
   )
 }
/*
   getAllCorteIDMP(id_mp): Observable<DetalleCosto[]> {
   return this.httpClient.get<DetalleCosto[]>(this.apiURL2 +'imp/'+id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }
*/
    suma(id_costo_produccion, id_mp): Observable<number> {
    return this.httpClient.get<number>(this.apiURL2 + id_costo_produccion +'/'+ id_mp) .pipe(
     catchError(this.errorHandler)
   )
  }

  update(id_detalle, detallecosto): Observable<DetalleCosto[]> {
   return this.httpClient.put<DetalleCosto[]>(this.apiURL + id_detalle, JSON.stringify(detallecosto), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   find(idcodigo_estilo, id_mp): Observable<DetalleCosto[]> {
   return this.httpClient.get<DetalleCosto[]>(this.apiURL + idcodigo_estilo+ '/'+ id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }


delete(id_costo_produccion, id_mp){
   return this.httpClient.delete<DetalleCosto>(this.apiURL + id_costo_produccion +'/'+ id_mp, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido(id_mp){
   return this.httpClient.get<DetalleCosto>(this.apiURL +'rep/' + id_mp)
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
