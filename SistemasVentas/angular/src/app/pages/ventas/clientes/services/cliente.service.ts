import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../../config/config';
import { Cliente } from '../cliente';
import { Departamento } from '../departamento';
import { Municipio } from '../municipio';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
      private apiURL = `${API_URL}/cliente`;
  //private apiURL = 'http://127.0.0.1:8000/api/Cliente/';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Cliente[]> {
   return this.httpClient.get<Cliente[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }
 repetido(dui){
   return this.httpClient.get<Cliente>(this.apiURL +'/rep/' + dui)
   .pipe(
     catchError(this.errorHandler)
   )
 }
 create(cliente): Observable<Cliente> {
  console.log(cliente);
   return this.httpClient.post<Cliente>(this.apiURL, JSON.stringify(cliente), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 delete(id_cliente){
   return this.httpClient.put<Cliente>(this.apiURL +'/estado/' + id_cliente, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }
  find(id_cliente): Observable<Cliente> {
   return this.httpClient.get<Cliente>(this.apiURL +'/'+ id_cliente)
   .pipe(
     catchError(this.errorHandler)
   )
 }
  getAllDpeto(): Observable<Departamento[]> {
   return this.httpClient.get<Departamento[]>(this.apiURL+'/dpto')
   .pipe(
     catchError(this.errorHandler)
   )
 }
  getAllMuni(id_departamento): Observable<Municipio[]> {
   return this.httpClient.get<Municipio[]>(this.apiURL+'/muni/'+id_departamento)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 update(id_cliente, cliente): Observable<Cliente> {
   return this.httpClient.put<Cliente>(this.apiURL +'/'+ id_cliente, JSON.stringify(cliente), this.httpOptions)
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
