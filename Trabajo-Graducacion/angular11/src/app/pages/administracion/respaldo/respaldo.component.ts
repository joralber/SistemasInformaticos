import { Component, OnInit } from '@angular/core';
import { RespaldosService } from '../services/respaldos.service';
//import * as mysql from 'mysql2';
import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import swal from'sweetalert2';
import { Usuarios } from '../usuarios'

import { LoginService } from '../../../auth/services/login.service';
import { BitacoraService } from '../services/bitacora.service';

@Component({
  selector: 'app-respaldo',
  templateUrl: './respaldo.component.html',
  styleUrls: ['./respaldo.component.css']
})
export class RespaldoComponent implements OnInit {
    form: FormGroup;
    loading:boolean;
    loading2:boolean;
  archivoSeleccionado: any;
      ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private respS: RespaldosService, private bitacoraS:BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {

  this.form = new FormGroup({
      path:  new FormControl('', [ Validators.required]),

        });

  }

  get f(){
    return this.form.controls;
  }


Backup() {
  this.loading=true;
  this.respS.runBackup().subscribe(
      response => {
        this.loading=false;

         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Envio un nuevo respaldo al correo'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
         swal.fire('Exito...', 'Respaldo enviado correctamente!!', 'success');

      },
      error => {
        this.loading=false;
                 swal.fire('Error...', 'El respaldo no se pudo enviar!!' ,'error');
        console.error('Error al enviar el respaldo', error);
      });

}


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Nombre del archivo:', file.name);
    }
            this.form.patchValue({path: file.name});

  }


  submit(){
    this.loading2=true;
  console.log(this.form.get('path').value);

  this.respS.restaurarBackup(this.form.get('path').value).subscribe(
      response => {
        this.loading2=false;
         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Realizo una nueva restauración de la base de datos'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
         swal.fire('Exito...', 'Base de datos restaurada con éxito!!', 'success');
  this.archivoSeleccionado = null;

      },
      error => {
        this.loading2=false;
                 swal.fire('Error...', 'La restauración de la base de datos falló!!' ,'error');
  this.archivoSeleccionado = null;
        console.error('Error al enviar el respaldo', error);
      });

}

}
