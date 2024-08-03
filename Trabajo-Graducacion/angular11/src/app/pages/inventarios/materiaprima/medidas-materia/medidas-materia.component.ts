import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import {RegresarService} from '../service/regresar.service';


import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';

import { MedidampService } from './services/medidamp.service';
import { Medidamp } from './medidamp';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import {ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-medidas-materia',
  templateUrl: './medidas-materia.component.html',
  styleUrls: ['./medidas-materia.component.css']
})
export class MedidasMateriaComponent implements OnInit, OnDestroy
{

update3:boolean;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 medidas:Medidamp[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  
    form: FormGroup;
  id_medida: number;
  med: Medidamp;
cantidad:any;
loading:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public  regresarService: RegresarService, private service: MedidampService, 
     private router: Router,
     private route: ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService
) { 
this.update3=false;
this.med= new Medidamp();
}


   

  ngOnInit(): void {

      this.form = new FormGroup({
      medida:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
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

getAcualizar(id_medida){
this.update3=true;

  this.id_medida = id_medida;

    this.service.find(this.id_medida).subscribe((data: Medidamp)=>{
      this.med = data;
    });
}


getAll():void{
  this.service.getAll().subscribe((data: Medidamp[])=>{
      this.medidas = data;
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

    deleteMedidamp(id_medida){
      swal.fire({
  title: 'Eliminar unidad de medida de materia prima?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_medida).subscribe(res => {
         this.medidas = this.medidas.filter(item => item.id_medida !== id_medida);
         //console.log('Proveedor eliminado con éxito!');
this.rerender();

       this.getAll();
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja una unidad de medida de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
    swal.fire(
      'Eliminado!',
      'La medida ha sido eliminado.',
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

    this.service.repetido(this.form.get('medida').value).subscribe((data: Medidamp)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading=false;
            swal.fire('La unidad de medida: "'+ this.form.get('medida').value + '" ya existe ')

           }else{

            if(this.update3==false){





  this.service.create(this.form.value).subscribe(res => {
this.form.reset();

 swal.fire('Exito...', 'Unidad de medida registrada con exito!!', 'success');
       this.getAll();
       this.loading=false;
         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva unidad de medida de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });

}else{

      this.service.update(this.id_medida, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Unidad de medida actualizada con exito!!', 'success');
this.form.reset();

       this.getAll();
       this.loading=false;

         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó una unidad de medida de materia prima'
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

        this.regresarService.regresarValue(false);
 
    this.dtTrigger.unsubscribe();


}


cambio(){
  this.update3=false;
 this.form.reset();
}
}
