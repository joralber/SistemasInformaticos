import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { API_URL } from '../../../config/config';
import { Materiaprima } from '../../inventarios/materiaprima/materiaprima';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

        private apiURL = `${API_URL}/reporte/`;
 

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }



  constructor(private httpClient: HttpClient) { }
//operativos
  getAll(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getAll2(id_categoria): Observable<Materiaprima[]> {
   return this.httpClient.get<Materiaprima[]>(this.apiURL + id_categoria)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getProductoT(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'pt')
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getDevMP(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'dev')
   .pipe(
     catchError(this.errorHandler)
   )
 }
 getEstiloBaja(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'estBaja')
   .pipe(
     catchError(this.errorHandler)
   )
 }
 
  getProveedorB(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'proBaja')
   .pipe(
     catchError(this.errorHandler)
   )
 }

  geMPB(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'mpBaja')
   .pipe(
     catchError(this.errorHandler)
   )
 }

  geCompraFecha(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'compr')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  getCliente(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.apiURL+'cli')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  getClienteB(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.apiURL+'clib')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  getVentaCredito(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.apiURL+'ventaCre')
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getVentaContado(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.apiURL+'ventaCon')
   .pipe(
     catchError(this.errorHandler)
   )
 }

getVentaCliente(): Observable<any[]> {
  return this.httpClient.get<any[]>(this.apiURL+'ventaCli')
   .pipe(
     catchError(this.errorHandler)
   )
 }


  geVentaFecha(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'ventaIng')
   .pipe(
     catchError(this.errorHandler)
   )
 }

   getVenEst(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'ventaEs')
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getVenDev(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'devP')
   .pipe(
     catchError(this.errorHandler)
   )
 }

 getProveedorF(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'prov/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getProductoMasF(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'ventFre/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }

  getProductoMenF(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'ventMFre/'+fechaI+'/'+fechaF)
   .pipe(
     catchError(this.errorHandler)
   )
 }
 
  getProductoMasCol(proC): Observable<any[]> {
   return this.httpClient.post<any[]>(this.apiURL+'proC', JSON.stringify(proC), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }
   getProductoMasTal(proT): Observable<any[]> {
   return this.httpClient.post<any[]>(this.apiURL+'proT', JSON.stringify(proT), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }
 
 

   getClienteDeuda(): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'cliDe')
   .pipe(
     catchError(this.errorHandler)
   )
 }
    getClienteZona(fechaI,fechaF): Observable<any[]> {
   return this.httpClient.get<any[]>(this.apiURL+'cliZona/'+fechaI+'/'+fechaF)
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
