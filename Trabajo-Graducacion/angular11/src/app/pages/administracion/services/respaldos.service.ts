import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';


import {catchError } from 'rxjs/operators';

import { API_URL } from '../../../config/config';
import { Usuarios } from '../usuarios';
@Injectable({
  providedIn: 'root'
})
export class RespaldosService {
  private apiURL = `${API_URL}/respaldos/`;

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }

  runBackup(): Observable<any> {
   return this.httpClient.get<any>(this.apiURL +'backup');
  }



restaurarBackup(path) {

    const pathd = encodeURIComponent(path);
 
   return this.httpClient.post<any[]>(`${this.apiURL +'restore'}?path=${pathd}`, this.httpOptions)
   //return this.httpClient.get<any[]>(`${this.apiURL +'restore'}?path=${pathd}`);

}

}
