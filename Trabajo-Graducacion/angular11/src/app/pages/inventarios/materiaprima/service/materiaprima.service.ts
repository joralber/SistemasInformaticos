import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../../config/config';
import { Materiaprima } from '../materiaprima';
@Injectable({
  providedIn: 'root'
})
export class MateriaprimaService {
  private apiURL = `${API_URL}/materiap/`;
//    private apiURL = 'http://127.0.0.1:8000/api/materiap';
  private apiURL2 = `${API_URL}/materiap/repmas/`;
   // private apiURL2 = 'http://127.0.0.1:8000/api/materiap/repmas';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }




  getAll(): Observable<Materiaprima[]> {
   return this.httpClient.get<Materiaprima[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 create(materiaprima): Observable<Materiaprima> {
   return this.httpClient.post<Materiaprima>(this.apiURL, JSON.stringify(materiaprima), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 delete(id_mp){
   return this.httpClient.put<Materiaprima>(this.apiURL +'estado/' + id_mp, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 agregarStock(id_mp, cantidad){
   return this.httpClient.put<Materiaprima>(this.apiURL +'agregar/' + id_mp +'/'+ cantidad, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 modificarFactor(id_mp, factor){
   return this.httpClient.put<Materiaprima>(this.apiURL +'fac/' + id_mp +'/'+ factor, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


 modificarCorte(id_mp, cortesmp){
   return this.httpClient.put<Materiaprima>(this.apiURL +'cor/' + id_mp +'/'+ cortesmp, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }


/*
 factor(id_mp){
   return this.httpClient.get<Materiaprima>(this.apiURL +'factor/' + id_mp, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

*/

  find(id_mp): Observable<Materiaprima> {
   return this.httpClient.get<Materiaprima>(this.apiURL + id_mp)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_mp, materiaprima): Observable<Materiaprima> {
   return this.httpClient.put<Materiaprima>(this.apiURL + id_mp, JSON.stringify(materiaprima), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  MPDgetSelect(idcodigo_estilo): Observable<Materiaprima[]> {
   return this.httpClient.get<Materiaprima[]>(this.apiURL+'codigo/'+idcodigo_estilo)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 
   ultimo_id(): Observable<Materiaprima> {
   return this.httpClient.get<Materiaprima>(this.apiURL + 'ultimo')
   .pipe(
     catchError(this.errorHandler)
   )
 }

 repetido2(id_categoria:number, id_color:number, id_medida:number, nombre_producto:string){
    const nombreCodificado = encodeURIComponent(nombre_producto);
console.log(nombreCodificado);
     //const url = `${this.urlApi}?numero=${numero}&nombre=${nombreCodificado}`;
const url=`${this.apiURL2}?id_categoria=${id_categoria}&id_color=${id_color}&id_medida=${id_medida}&nombre_producto=${nombreCodificado}`


//this.apiURL +'rep2/' + id_categoria+ '/' + id_color+ '/' + id_medida + '/nombre_producto=${nombreCodificado}'

   return this.httpClient.get<Materiaprima[]>(url)

   .pipe(
     catchError(this.errorHandler)
   )
 }

  repetido3(id_mp){
   return this.httpClient.get<Materiaprima>(this.apiURL +'repk/' + id_mp)
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
