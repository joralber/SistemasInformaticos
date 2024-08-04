import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Venta } from '../venta';
import { DetalleVenta } from '../detalle-venta';
import { API_URL } from '../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiURL = `${API_URL}/venta`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

   constructor(private httpClient: HttpClient) { }

create(venta): Observable<Venta> {
   return this.httpClient.post<Venta>(this.apiURL, JSON.stringify(venta), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 createD(detalleventa): Observable<DetalleVenta> {
   return this.httpClient.post<DetalleVenta>(this.apiURL+'/detv', JSON.stringify(detalleventa), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

ultimo_id(): Observable<Venta> {
   return this.httpClient.get<Venta>(this.apiURL + '/ultimav')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  getAll(): Observable<Venta[]> {
   return this.httpClient.get<Venta[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getAllDetalle(id_venta): Observable<DetalleVenta[]> {
   return this.httpClient.get<DetalleVenta[]>(this.apiURL+'/getdetalle/'+id_venta)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 

   find(idventa): Observable<Venta> {
   return this.httpClient.get<Venta>(this.apiURL +'/'+ idventa)
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
