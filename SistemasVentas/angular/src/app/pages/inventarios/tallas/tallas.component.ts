import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
//import {RegresarService} from '../service/regresar.service';


import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';

import { TallasService } from './services/tallas.service';
import { Tallas } from './tallas';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import {ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';
import { LoginService } from '../../../auth/services/login.service';
import { BitacoraService } from '../../administracion/services/bitacora.service';
import { Usuarios } from '../../administracion/usuarios';
@Component({
  selector: 'app-tallas',
  templateUrl: './tallas.component.html',
  styleUrls: ['./tallas.component.css']
})
export class TallasComponent implements OnInit, OnDestroy{
update:boolean;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 tallas:Tallas[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  
    form: FormGroup;
  id_talla: number;
  tall: Tallas;
cantidad:any;

loading:boolean;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;

constructor(private service: TallasService, 
     private router: Router,
     private route: ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService
) { 
this.update=false;
this.tall= new Tallas();
}



ngOnInit(): void {

      this.form = new FormGroup({
      talla:  new FormControl('', [ Validators.required, Validators.maxLength(8)]),
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

getAcualizar(id_talla){
this.update=true;

  this.id_talla = id_talla;

    this.service.find(id_talla).subscribe((data: Tallas)=>{
      this.tall = data;
    });
}


getAll():void{
  this.service.getAll().subscribe((data: Tallas[])=>{
      this.tallas = data;
            console.log(this.tallas);
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

    deleteTalla(id_talla){
      swal.fire({
  title: 'Eliminar Talla de Producto?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_talla).subscribe(res => {
         this.tallas = this.tallas.filter(item => item.id_talla !== id_talla);
         //console.log('Proveedor eliminado con éxito!');
this.rerender();

       this.getAll();
       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja una talla de producto'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora



    });
    swal.fire(
      'Eliminado!',
      'La categoria ha sido eliminado.',
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
    this.service.repetido(this.form.get('talla').value).subscribe((data: Tallas)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading=false;
            swal.fire('La talla: "'+ this.form.get('talla').value + '" ya existe ')

           }else{

if(this.update==false){

this.service.create(this.form.value).subscribe(res => {

         console.log('Talla creada con exito!');

this.form.reset();
 swal.fire('Exito...', 'Talla registrada con exito!!', 'success');
       this.getAll();
this.loading=false;
//bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva talla de producto'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });

}else{

      this.service.update(this.id_talla, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Talla actualizada con exito!!', 'success');
this.form.reset();

       this.getAll();
       this.loading=false;
       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó una nueva talla de producto'
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
  this.update=false;
 this.form.reset();
}
}
