import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';


import {catchError, map } from 'rxjs/operators';

import { API_URL } from '../../config/config';
import { Usuarios } from '../../pages/administracion/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private apiURL = `${API_URL}/admin/`;
      private apiURL2 = `${API_URL}/respaldos/`;

        private userSubject: BehaviorSubject<Usuarios | null>;
    public user: Observable<Usuarios | null>

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }


  constructor(private httpClient: HttpClient, private router: Router,
) {

this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
 }

 public get userValue() {
        return this.userSubject.value;
    }

   login(usuario): Observable<any> {
   return this.httpClient.post<any>(this.apiURL+'login/', JSON.stringify(usuario), this.httpOptions)
   .pipe(

map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
            //    console.log(user)
                return user;
            }),

     catchError(this.errorHandler)
   )
 }



 

 logout2(): Observable<any> {
  return this.httpClient.post<any>(this.apiURL+'logout', {});
}

logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }


    repetido(email){
      const emailCodificado = encodeURIComponent(email);
 
   return this.httpClient.get<Usuarios[]>(`${this.apiURL +'email'}?email=${emailCodificado}`)
   //return this.httpClient.get<Usuarios>(this.apiURL +'email/' + email)
   .pipe(
     catchError(this.errorHandler)
   )
 }




 generateResetCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let resetCode = '';

    // Genera un carácter aleatorio del conjunto de caracteres
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      resetCode += characters.charAt(randomIndex);
    }

    return resetCode;
  }


 enviarCodigo(recuperar): Observable<any> {
   return this.httpClient.post<any>(this.apiURL+'enviar-codigo', JSON.stringify(recuperar), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

   find(email): Observable<Usuarios> {
   return this.httpClient.get<Usuarios>(this.apiURL +'user/'+ email)
   .pipe(
     catchError(this.errorHandler)
   )
 }


   update(id, password){
   return this.httpClient.put<Usuarios>(this.apiURL +'pass/' + id +'/'+ password, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 restaurarBackup(path) {

    const pathd = encodeURIComponent(path);
 
   return this.httpClient.post<any[]>(`${this.apiURL2 +'restore2'}?path=${pathd}`, this.httpOptions)
   //return this.httpClient.get<any[]>(`${this.apiURL +'restore'}?path=${pathd}`);

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
