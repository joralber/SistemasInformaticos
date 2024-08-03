import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Materiaprima } from 'src/app/pages/inventarios/materiaprima/materiaprima';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  // private apiURL = 'http://127.0.0.1:8000/api/compra/';
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
  getAppOrdenCompra(){
    return this.httpclient.get<any>(`${environment.rutaApi}listaOrden`,this.options);
  }
  getProveedores(){
    return this.httpclient.get<any>(`${environment.rutaApi}listaproveedores`,this.options);
  }
  getMateriaPrima(){
    return this.httpclient.get<any>(`${environment.rutaApi}materiaprima`,this.options);
  }
  guardarOrdeCompra(total:any){
    // const data:any = {
    //   ...total
    // };
    return this.httpclient.post(`${environment.rutaApi}guardarordencompra`,JSON.stringify(total),this.options);
  }
  guardarDetalleOC(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardardetalleoc`,JSON.stringify(detalle),this.options);
  }
  cargarOrdenEspecifica(id_ordencompra:any){
    return this.httpclient.get<any>(`${environment.rutaApi}obtenercompra/${id_ordencompra}`, this.options);
  }
  cargarDetalleEspecifica(id_ordencompra:any){
    return this.httpclient.get<any>(`${environment.rutaApi}listardetalleoc/${id_ordencompra}`, this.options);
  }
  buscarprecio(id_mp:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getpreciomateria`, JSON.stringify(id_mp), this.options);
  }
  cargarcompraproveedor(id_proveedor:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getcomprasproveedor`, JSON.stringify(id_proveedor), this.options);
  }
  cargarcompradetalle(id_compra:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetallecompra`, JSON.stringify(id_compra), this.options);
  }
  cargarcompradetalledev(id_compra:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetallecompradev`, JSON.stringify(id_compra), this.options);
  }
  guardarCompra(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardarcompra`,JSON.stringify(detalle),this.options);
  }
  guardarDetalleCompra(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardardetallecompra`,JSON.stringify(detalle),this.options);
  }
  actualizardetalleoc(detactual:any){
    return this.httpclient.post(`${environment.rutaApi}actualizarordencompra`,JSON.stringify(detactual),this.options);
  }
  guardardevolucion(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardardevolucion`,JSON.stringify(detalle),this.options);
  }
  guardarDevolucionCompra(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardardetalledev`,JSON.stringify(detalle),this.options);
  }
  getDevoluciones(){
    return this.httpclient.get<any>(`${environment.rutaApi}getdevoluciones`,this.options);
  }
  verdetalledev(id_dcompra:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalledev`, JSON.stringify(id_dcompra), this.options);
  }
  getcompras(){
    return this.httpclient.get<any>(`${environment.rutaApi}getcompras`,this.options);
  }
  creditodisponible(id_proveedor:any){
    return this.httpclient.post<any>(`${environment.rutaApi}consultacredito`, JSON.stringify(id_proveedor), this.options);
  }
  finalizarorden(datafin:any){
    return this.httpclient.post(`${environment.rutaApi}finalizarodc`,JSON.stringify(datafin),this.options);
  }
  verdetalleodc(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalleodc`,JSON.stringify(data),this.options);
  }
  verificarmaterial(id_mp:any){
    return this.httpclient.post<any>(`${environment.rutaApi}checkmateriaprima`,JSON.stringify(id_mp),this.options);
  }

}
