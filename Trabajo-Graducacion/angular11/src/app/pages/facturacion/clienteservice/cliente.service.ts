import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import {catchError } from 'rxjs/operators';


import { Cliente } from '../clientes/cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpclient:HttpClient) { }

  options = {headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: ''}),params: new HttpParams()};
  objUser:any;
  crearHeader(){
    if(localStorage.getItem('userLogin')){
      this.objUser = JSON.parse(localStorage.getItem('userLogin'));
      var token = this.objUser.authorisation.token;
      var type = this.objUser.authorisation.type;
      this.options = {headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer '+ token}),params: new HttpParams()};
    }
  }
  getClientes(){
    return this.httpclient.get<any>(`${environment.rutaApi}listadoclientes`,this.options);
  }

  cambiarstatus(id_cliente:any){
    return this.httpclient.post<any>(`${environment.rutaApi}bajacliente`,JSON.stringify(id_cliente),this.options);
  }

  consultarpendientes(id_cliente:any){
    return this.httpclient.post<any>(`${environment.rutaApi}pendientes`,JSON.stringify(id_cliente),this.options);
  }

  guardarcliente(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}guardarcliente`,JSON.stringify(data),this.options);
  }

  getdatacliente(id_cliente){
    return this.httpclient.get<any>(`${environment.rutaApi}editarcliente/${id_cliente}`, this.options);
  }

  actualizarcliente(id_cliente, data){
    return this.httpclient.put<any>(`${environment.rutaApi}actualizarcliente/${id_cliente}`, JSON.stringify(data), this.options);
  }

  verificarclienterep(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}clienterepetido`,JSON.stringify(data),this.options);
  }
  verificarclrptupdate(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}clienterepetidoupdate`,JSON.stringify(data),this.options);
  }
  getnombrecliente(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}datacliente`,JSON.stringify(data),this.options);
  }
  cargarcuentasporcliente(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}cuentasporcliente`,JSON.stringify(data),this.options);
  }
  cargarcuentasclientegeneral(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}cuentasclientegeneral`,JSON.stringify(data),this.options);
  }
  cargardatacuenta(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdatacuentaxc`, JSON.stringify(data), this.options);
  }
  getabonoscuenta(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalleabonoxc`, JSON.stringify(data), this.options);
  }

  guardarabono(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}guardarabono`,JSON.stringify(data),this.options);
  }

  actualizarcuentaxc(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}actualizarcuentaxc`,JSON.stringify(data),this.options);
  }
  getDepartamentos(){
    return this.httpclient.get<any>(`${environment.rutaApi}departamentos`,this.options);
  }
  getMunicipios(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}municipios`,JSON.stringify(data),this.options);
  }
}
