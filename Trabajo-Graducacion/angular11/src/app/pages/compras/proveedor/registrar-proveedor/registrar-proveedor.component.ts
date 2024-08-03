import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../proveedor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {IntercambioService} from '../../service/intercambio.service';

//import Swal from 'sweetalert2/dist/sweetalert2.js';
import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.css']
})
export class RegistrarProveedorComponent implements OnInit {

  form: FormGroup;
loading:boolean;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarp: IntercambioService,
public proveedorService: ProveedorService,
   private router: Router, private bitacoraS:BitacoraService, private loginS: LoginService) { }


  ngOnInit(): void {
        this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      
      nit: new FormControl('', [Validators.pattern("^[0-9]*$") ]),
      nrc: new FormControl('', [Validators.pattern("^[0-9]*$") ]),
      dui: new FormControl('', [Validators.pattern("^[0-9]*$") ]),
      direccion:  new FormControl('', [ Validators.required]),
      celular: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),

      email: new FormControl('', [ Validators.required, Validators.email ]),
      limite_credito: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")])

    });
  }

 get f(){
    return this.form.controls;
  }



 
   

   submit(){

    this.loading=true;
    this.proveedorService.create(this.form.value).subscribe(res => {

         console.log('Proveedor creado con exito!');
    //     swal('Proveedor creado con exito!', this.titularAlerta, 'success');

 swal.fire('Exito...', 'Proveedor registrado con exito!!', 'success');


//bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo proveedor'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


      this.router.navigateByUrl('dashboard/listado-proveedor');
    })
  }

  ngOnDestroy(){
      this.regresarp.intercambioValue(false);

  }

}