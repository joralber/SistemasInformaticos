import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  constructor(private httpclient: HttpClient) { }

  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer' }), params: new HttpParams() };
  objUser: any;
  crearHeader() {
    if (localStorage.getItem('userLogin')) {
      this.objUser = JSON.parse(localStorage.getItem('userLogin'));
      var token = this.objUser.authorisation.token;
      var type = this.objUser.authorisation.type;
      this.options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }), params: new HttpParams() };
    }
  }
  gettipodocumento(){
    return this.httpclient.get<any>(`${environment.rutaApi}tipodocumento`,this.options);
  }
  verificartickets(){
    return this.httpclient.get<any>(`${environment.rutaApi}existeticket`,this.options);
  }
  getcategoriapt(){
    return this.httpclient.get<any>(`${environment.rutaApi}getcategorias`,this.options);
  }
  getcolorpt(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getcolores`, JSON.stringify(data),this.options);
  }
  gettallapt(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}gettallas`, JSON.stringify(data), this.options);
  }

  buscandocliente(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}buscarcliente`, JSON.stringify(data), this.options);
  }
  buscandoproducto(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}buscarproducto`, JSON.stringify(data), this.options);
  }
  buscarproductofiltro(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}productoporfiltro`, JSON.stringify(data), this.options);
  }
  getprecioproducto(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}precioproducto`, JSON.stringify(data), this.options);
  }
  creditosdisponibles(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}verificacreditos`, JSON.stringify(data), this.options);
  }
  registrarventa(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}guardarventa`, JSON.stringify(data), this.options);
  }
  registrardetalleventa(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}guardardetventa`, JSON.stringify(data), this.options);
  }
  registrarcxc(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}guardarcxc`, JSON.stringify(data), this.options);
  }
  consultarstock(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}consultastock`, JSON.stringify(data), this.options);
  }
  registrakardex(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}regkardex`, JSON.stringify(data), this.options);
  }
  registrakardexin(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}regkardexentrada`, JSON.stringify(data), this.options);
  }
  actualizarstpt(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}actualizastockpt`, JSON.stringify(data), this.options);
  }
  interkardxproducto(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}intermediakarx`, JSON.stringify(data), this.options);
  }
  listarventas() {
    return this.httpclient.get<any>(`${environment.rutaApi}listaventas`, this.options);
  }
  detalleventa(data: any) {
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalleventa`, JSON.stringify(data), this.options);
  }
  cargarventacliente(id_cliente:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getventacliente`, JSON.stringify(id_cliente), this.options);
  }
  cargarventadetalledev(id_venta:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalleventadev`, JSON.stringify(id_venta), this.options);
  }
  guardardevolucion(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardardevolucionvnt`,JSON.stringify(detalle),this.options);
  }
  guardarDetDevVenta(detalle:any){
    return this.httpclient.post(`${environment.rutaApi}guardardetalledevvnt`,JSON.stringify(detalle),this.options);
  }
  listardevolucionventas(){
    return this.httpclient.get<any>(`${environment.rutaApi}getdevolucionesventa`,this.options);
  }
  detalledevolucionventa(id_dventa){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetdevolucionventa`,JSON.stringify(id_dventa),this.options);
  }
  ventaparaimpresion(id_venta:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getventaimpresion`,JSON.stringify(id_venta), this.options);
  }
  ventadetalleimpresion(id_venta:any){
    return this.httpclient.post<any>(`${environment.rutaApi}getdetalleimpresion`, JSON.stringify(id_venta), this.options);
  }
  enviardefinicion(data:any){
    return this.httpclient.post<any>(`${environment.rutaApi}recepciondata`, JSON.stringify(data), this.options);
  }
}
