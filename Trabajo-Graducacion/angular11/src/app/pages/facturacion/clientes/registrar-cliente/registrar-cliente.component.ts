import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../clienteservice/cliente.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {IntercambioService} from '../../clienteservice/intercambio.service';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {
  loading:boolean = false;
  formcliente: FormGroup
  listadepartamentos: any[] = [];
  filtromunicipios: any[] = [];
  ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private clienteservice: ClienteService, private router: Router, public regresarp: IntercambioService,
     private bitacoraS:BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {
    this.formcliente = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      nit: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      dui: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      nrc: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      limite_credito: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+")])
    });
    this.listardepartamentos();
  }

  get f() {
    return this.formcliente.controls;
  }

  listardepartamentos(){
    this.clienteservice.getDepartamentos().subscribe({
      next: (respuesta) => {
        this.listadepartamentos = respuesta.departamentos;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  cargarmunicipio(iddepto){
    var datadepto = {
      'iddepartamento': iddepto.target.value
    }
    this.clienteservice.getMunicipios(datadepto).subscribe({
      next: (respuesta) => {
        this.filtromunicipios = respuesta.municipios;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  verificarclienterep(){
    this.loading=true;
    this.clienteservice.verificarclienterep(this.formcliente.value).subscribe({
      next: (respuesta) => {
        if(respuesta.existe.length > 0){
          swal.fire('Advertencia...', respuesta.mensaje, 'warning');
          this.loading=false;
        } else {
          this.clienteservice.guardarcliente(this.formcliente.value).subscribe({
            next: (respuesta) => {
              //bitacora
        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo cliente'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
              swal.fire('Exito...', respuesta.mensaje, 'success');
              this.router.navigateByUrl('dashboard/listar-cliente');
            }, error: (error) => {
              console.log("error", error)
            }
          });
        }
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  // guardarCliente() {
  //   this.loading=true;
  //   this.clienteservice.guardarcliente(this.formcliente.value).subscribe({
  //     next: (respuesta) => {
  //       swal.fire('Exito...', respuesta.mensaje, 'success');
  //       this.router.navigateByUrl('dashboard/listar-cliente');
  //     }, error: (error) => {
  //       console.log("error", error)
  //     }
  //   });
  // }
 ngOnDestroy(){
      this.regresarp.intercambioValue(false);

  }
}
