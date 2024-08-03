import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CuentaspagarService {

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

  compraspendientescred(id_proveedor:any){
    return this.httpclient.post<any>(`${environment.rutaApi}compraspendientes`, JSON.stringify(id_proveedor), this.options);
  }
  camposparacxp(id_compra:any){
    return this.httpclient.post<any>(`${environment.rutaApi}extraerdatoscompra`, JSON.stringify(id_compra), this.options);
  }
  guardarCuentaPagar(datacuentaxp:any){
    return this.httpclient.post<any>(`${environment.rutaApi}guardarcuentaspagar`, JSON.stringify(datacuentaxp), this.options);
  }
  cargarcuentasproveedor(id_proveedor:any){
    return this.httpclient.post<any>(`${environment.rutaApi}cuentasporproveedor`, JSON.stringify(id_proveedor), this.options);
  }
  cargardatacuenta(id_cxp:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdatacuenta`, JSON.stringify(id_cxp), this.options);
  }
  getabonoscuenta(id_cxp:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalleabono`, JSON.stringify(id_cxp), this.options);
  }
  guardarabono(datos:any){
    return this.httpclient.post<any>(`${environment.rutaApi}guardarabonocuenta`, JSON.stringify(datos), this.options);
  }
  actualizarcuentadata(dataup:any){
    return this.httpclient.post<any>(`${environment.rutaApi}actualizarcuenta`, JSON.stringify(dataup), this.options);
  }
  extraecuentascompare(id_proveedor:any){
    return this.httpclient.post<any>(`${environment.rutaApi}cuentascompare`, JSON.stringify(id_proveedor), this.options);
  }
}
