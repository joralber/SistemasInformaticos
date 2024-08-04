import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';


import { Productos } from '../productos';
import { API_URL } from '../../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
private apiURL = `${API_URL}/productos`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Productos[]> {
   return this.httpClient.get<Productos[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   create(productos): Observable<Productos> {
   return this.httpClient.post<Productos>(this.apiURL, JSON.stringify(productos), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


  repetido(codigo_barra){
   return this.httpClient.get<Productos>(this.apiURL +'/rep/' + codigo_barra)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  repetido2(id_cat_pt, id_color_pt, id_talla_pt, nombre){
   return this.httpClient.get<Productos>(this.apiURL +'/rep2/' + id_cat_pt+ '/' + id_color_pt+ '/' + id_talla_pt+'/'+nombre )
   .pipe(
     catchError(this.errorHandler)
   )
 }

  delete(id_producto){
   return this.httpClient.put<Productos>(this.apiURL +'/estado/' + id_producto, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  agregarStock(id_producto, cantidad){
   return this.httpClient.put<Productos>(this.apiURL +'/agregar/' + id_producto +'/'+ cantidad, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   find(id_producto): Observable<Productos> {
   return this.httpClient.get<Productos>(this.apiURL +'/'+ id_producto)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_producto, productos): Observable<Productos> {
   return this.httpClient.put<Productos>(this.apiURL +'/'+ id_producto, JSON.stringify(productos), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   ultimo_id(): Observable<Productos> {
   return this.httpClient.get<Productos>(this.apiURL + '/ultimo')
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido3(id_mp){
   return this.httpClient.get<Productos>(this.apiURL +'/reppk/' + id_mp)
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
