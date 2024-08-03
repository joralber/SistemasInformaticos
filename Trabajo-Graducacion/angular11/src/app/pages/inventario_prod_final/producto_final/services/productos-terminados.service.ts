import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';


import { ProductosTerminados } from '../productos_terminados';
import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class ProductosTerminadosService {
private apiURL = `${API_URL}/productos_terminados/`;
 //   private apiURL = 'http://127.0.0.1:8000/api/productos_terminados/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ProductosTerminados[]> {
   return this.httpClient.get<ProductosTerminados[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   create(productosTerminados): Observable<ProductosTerminados> {
   return this.httpClient.post<ProductosTerminados>(this.apiURL, JSON.stringify(productosTerminados), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  repetido(codigo_barra){
   return this.httpClient.get<ProductosTerminados>(this.apiURL +'rep/' + codigo_barra)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  repetido2(id_cat_pt, id_color_pt, id_talla_pt, idcodigo_estilo){
   return this.httpClient.get<ProductosTerminados>(this.apiURL +'rep2/' + id_cat_pt+ '/' + id_color_pt+ '/' + id_talla_pt + '/'+idcodigo_estilo)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  delete(id_producto){
   return this.httpClient.put<ProductosTerminados>(this.apiURL +'estado/' + id_producto, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  agregarStock(id_producto, cantidad){
   return this.httpClient.put<ProductosTerminados>(this.apiURL +'agregar/' + id_producto +'/'+ cantidad, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   find(id_producto): Observable<ProductosTerminados> {
   return this.httpClient.get<ProductosTerminados>(this.apiURL + id_producto)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_producto, productosterminados): Observable<ProductosTerminados> {
   return this.httpClient.put<ProductosTerminados>(this.apiURL + id_producto, JSON.stringify(productosterminados), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   ultimo_id(): Observable<ProductosTerminados> {
   return this.httpClient.get<ProductosTerminados>(this.apiURL + 'ultimo')
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido3(id_mp){
   return this.httpClient.get<ProductosTerminados>(this.apiURL +'reppk/' + id_mp)
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
