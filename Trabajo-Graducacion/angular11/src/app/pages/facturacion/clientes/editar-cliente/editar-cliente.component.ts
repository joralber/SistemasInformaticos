import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../clienteservice/cliente.service';
import { Cliente } from '../cliente';
import swal from 'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  id_cliente: number;
  clientelist: Cliente;
  formcliente: FormGroup;
  loading: boolean = false;
  listcliente: any = {
    id_cliente: 0,
    nombre: "",
    dui: "",
    nit: "",
    nrc: "",
    telefono: "",
    email: "",
    direccion: "",
    municipio: "",
    departamento: "",
    limite_credito: 0,
    deptoactual: 0
  }
      ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
listadepartamentos : any[] = [];
filtromunicipios : any[] = [];
  constructor(public clienteservice: ClienteService,
    private route: ActivatedRoute,
    private router: Router,  private bitacoraS:BitacoraService, private loginS: LoginService) {
    this.clientelist = new Cliente();
  }

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.params['id_cliente'];
    this.clienteservice.getdatacliente(this.id_cliente).subscribe({
      next: (respuesta) => {
        respuesta.datacliente.forEach(element => {
          this.listcliente.id_cliente = element.id_cliente;
          this.listcliente.nombre = element.nombre;
          this.listcliente.dui = element.dui;
          this.listcliente.nit = element.nit;
          this.listcliente.nrc = element.nrc;
          this.listcliente.telefono = element.telefono;
          this.listcliente.email = element.email;
          this.listcliente.direccion = element.direccion;
          this.listcliente.municipio = element.id_municipio;
          this.listcliente.limite_credito = element.limite_credito;
          this.listcliente.deptoactual = element.id_departamento;
        });
        var datainicial = {
          'iddepartamento': this.listcliente.deptoactual
        }
        console.log(this.listcliente.deptoactual);
        this.clienteservice.getMunicipios(datainicial).subscribe({
          next: (respuesta) => {
            this.filtromunicipios = respuesta.municipios;
            console.log(this.filtromunicipios);
          }, error: (error) => {
            console.log("error", error)
          }
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });

    this.formcliente = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      nit: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      dui: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      nrc: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      limite_credito: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+")])

    });
    this.listardepartamentos();
    this.municipioinicial();
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

  municipioinicial(){
    
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

  verificarclienterep() {
    this.loading = true;
    this.clienteservice.verificarclrptupdate(this.listcliente).subscribe({
      next: (respuesta) => {
        console.log(respuesta.existe.length);
        if (respuesta.existe.length > 0) {
          swal.fire('Advertencia...', respuesta.mensaje, 'warning');
          this.loading = false;
        } else {
          this.clienteservice.actualizarcliente(this.id_cliente, this.listcliente).subscribe({
            next: (respuesta) => {
                 //bitacora
        this.bitacora=this.loginS.userValue;
    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un cliente'
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

  // actualizarCliente() {
  //   this.loading = true;
  //   this.clienteservice.actualizarcliente(this.id_cliente, this.listcliente).subscribe({
  //     next: (respuesta) => {
  //       swal.fire('Exito...', respuesta.mensaje, 'success');
  //       this.router.navigateByUrl('dashboard/listar-cliente');
  //     }, error: (error) => {
  //       console.log("error", error)
  //     }
  //   });
  // }


}
