import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import {NgForm, FormControl, Validators } from '@angular/forms';

import {RegresarService} from '../../materiaprima/service/regresar.service';

import { CodigoEstiloService } from '../services/codigo-estilo.service';
import { CodigoEstilo } from '../codigo-estilo';

import { DetalleCodigoEstiloService } from '../services/detalle-codigo-estilo.service';
import { DetalleCodigoEstilo } from '../detalle-codigo-estilo';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';
declare const $: any;
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-listado-estilos',
  templateUrl: './listado-estilos.component.html',
  styleUrls: ['./listado-estilos.component.css']
})
export class ListadoEstilosComponent implements OnInit, OnDestroy {

   @ViewChild(DataTableDirective, {static: false})

 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
 codigoE:CodigoEstilo[]=[];
 detallecodigo: DetalleCodigoEstilo[]=[];
 codigoestilo : CodigoEstilo;
  dtOptions: any = {};
  dtTrigger = new Subject();

  idcodigo_estilo:number;
  c:string='';
   ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarService: RegresarService,
           private codS: CodigoEstiloService,
           private detalleS: DetalleCodigoEstiloService,
            private router: Router,
                private route: ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService
                ) { 
this.codigoestilo= new CodigoEstilo();
  }

  ngOnInit(): void {



 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
            destroy:true,

        "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },
  processing: true,
  
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    };

      this.getAll();

  }

public regresar(){
  this.regresarService.regresarValue(true);

}




getAll():void{
  this.codS.getAll().subscribe((data: CodigoEstilo[])=>{
      this.codigoE = data;
          //  console.log(this.codigoE);
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

    deleteCodigoEstilo(est, idcodigo_estilo){

      swal.fire({
  title: 'Eliminar Estilo?',
  text: "¿Estás seguro de eliminar el estilo "+est+"?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.codS.delete(idcodigo_estilo).subscribe(res => {
         this.codigoE = this.codigoE.filter(item => item.idcodigo_estilo !== idcodigo_estilo);
this.rerender();
 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja al estilo: '+ est
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

        this.router.navigateByUrl('dashboard/listado-estilo');

    });


     
    swal.fire(
      'Eliminado!',
      'EL estilo ha sido eliminado.',
      'success'
    )
  }
})



  }



ver(idcodigo_estilo){

//this.rerender2();



//       this.idcodigo_estilo = this.route.snapshot.params['idcodigo_estilo'];

    this.codS.find(idcodigo_estilo).subscribe((data: CodigoEstilo)=>{
      this.codigoestilo = data;
   this.c=this.codigoestilo.codigo.toString().padStart(4, '0');


    });

      this.detalleS.getAllDetalle(idcodigo_estilo).subscribe((data: DetalleCodigoEstilo[])=>{
      this.detallecodigo = data;
        
});
}


salir(){
  this.codigoestilo=new CodigoEstilo();
  this.detallecodigo=[];
  this.c='';
}

 ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
}






  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }






}
