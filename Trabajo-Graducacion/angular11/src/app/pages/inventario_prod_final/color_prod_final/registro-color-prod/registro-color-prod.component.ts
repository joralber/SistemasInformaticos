import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';


import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';

import { ColorptService } from './services/colorpt.service';
import { Colorpt } from './colorpt';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import {ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registro-color-prod',
  templateUrl: './registro-color-prod.component.html',
  styleUrls: ['./registro-color-prod.component.css']
})
export class RegistroColorProdComponent implements OnInit, OnDestroy
{

update2:boolean;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 color:Colorpt[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  
    form: FormGroup;
  id_color_pt: number;
  col: Colorpt;

cantidad:any;
loading:boolean;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
 constructor(private service: ColorptService, 
     private router: Router,
     private route: ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService
) { 
this.update2=false;
this.col= new Colorpt();
}


   

  ngOnInit(): void {

      this.form = new FormGroup({
      nombre_color:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      estado: new FormControl(''),

    });


 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
        "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },
  processing: true,
  
        dom: 'Bfrtip',
        buttons: [
        ]
    };

//listado

      this.getAll();


  }
//actualizar

getAcualizar(id_color_pt){
this.update2=true;

  this.id_color_pt = id_color_pt;

    this.service.find(id_color_pt).subscribe((data: Colorpt)=>{
      this.col = data;
console.log(this.col);
    });
}


getAll():void{
  this.service.getAll().subscribe((data: Colorpt[])=>{
      this.color = data;
            console.log(this.color);
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();

          }
    });

}

///dar de baja

    deleteColorpt(id_color_pt){
      swal.fire({
  title: 'Eliminar color de Productos Terminados?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_color_pt).subscribe(res => {
         this.color = this.color.filter(item => item.id_color_pt !== id_color_pt);
         //console.log('Proveedor eliminado con éxito!');
this.rerender();

       this.getAll();
//bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja un color de producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
    swal.fire(
      'Eliminado!',
      'EL color ha sido eliminado.',
      'success'
    )
  }
})




  }








  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

//registrar
 get f(){
    return this.form.controls;
  }


   submit(){
this.loading=true;
    this.service.repetido(this.form.get('nombre_color').value).subscribe((data: Colorpt)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading=false;
            swal.fire('El color: "'+ this.form.get('nombre_color').value + '" ya existe ')

           }else{


if(this.update2==false){

this.service.create(this.form.value).subscribe(res => {

         console.log('Color creado con exito!');

this.form.reset();
 swal.fire('Exito...', 'Color registrado con exito!!', 'success');
       this.getAll();
this.loading=false;
//bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo color de producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
    });

}else{

      this.service.update(this.id_color_pt, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Color actualizado con exito!!', 'success');
this.form.reset();

       this.getAll();
       this.loading=false;

       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un color de producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
    });
   
 

  }
}

});

  }


 ngOnDestroy():void{

 
    this.dtTrigger.unsubscribe();


}


cambio(){
  this.update2=false;
 this.form.reset();
}
}
