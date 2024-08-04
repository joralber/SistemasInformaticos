import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cliente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Departamento } from '../departamento';
import { Municipio } from '../municipio';
import { Router } from '@angular/router';
import {IntercambioService} from '../services/intercambio.service';

//import Swal from 'sweetalert2/dist/sweetalert2.js';
import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-registrarclientes',
  templateUrl: './registrarclientes.component.html',
  styleUrls: ['./registrarclientes.component.css']
})
export class RegistrarclientesComponent implements OnInit, OnDestroy {
 form: FormGroup;
loading:boolean;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
dpto:Departamento[]=[];
muni:Municipio[]=[];
  select:number;
  cantidad:any;
  constructor(public regresarp: IntercambioService, public cliService: ClienteService, private bitacoraS:BitacoraService, private loginS: LoginService,
   private router: Router) { }


  ngOnInit(): void {
        this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(60) ]),
      dui: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$") ]),
      direccion:  new FormControl('', [ Validators.required, Validators.maxLength(50)]),
      telefono: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(100) ]),
      id_municipio: new FormControl('', [ Validators.required]),
      id_departamento: new FormControl('', [ Validators.required])

    });

        this.getAllDPTO();
  }

 get f(){
    return this.form.controls;
  }

getAllDPTO():void{
  this.cliService.getAllDpeto().subscribe((data: Departamento[])=>{
      this.dpto = data;
  console.log(this.dpto);
    });

}

   getAllMuni(id_departamento): void {
    this.cliService.getAllMuni(id_departamento).subscribe((data: Municipio[]) => {
      this.muni = data;
      console.log(this.muni);
    });

  }
   
  changeSelect(){
       this.getAllMuni(this.form.get('id_departamento').value );

   }

   submit(){

    this.loading=true;
  this.cliService.repetido(this.form.get('dui').value).subscribe((data: Cliente)=>{
         this.cantidad = data;


           if(this.cantidad>0){
           this.loading=false;
            swal.fire('El DUI: "'+ this.form.get('dui').value + '" ya existe ')

           }else{
        this.cliService.create(this.form.value).subscribe(res => { 
          
       swal.fire('Exito...', 'Cliente registrado con exito!!', 'success');
       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo cliente'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

      this.router.navigateByUrl('/dashboard/listar-cliente');
        },
        error => {
          this.loading=false;
           swal.fire('Error...', 'Error de conexion a la base de datos!!'+error, 'error');
          console.log(error);
        } );
      }
    });
  }

  ngOnDestroy(){
      this.regresarp.intercambioValue(false);

  }

limpiar(){
  this.muni=[];
}
}
