import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import {NgForm, FormControl, Validators } from '@angular/forms';
import {RegresarService} from '../../materiaprima/service/regresar.service';

import {CostoproduccionService} from '../services/costoproduccion.service';
import {CostoProduccion} from '../costo-produccion';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-listado-costos-produccion',
  templateUrl: './listado-costos-produccion.component.html',
  styleUrls: ['./listado-costos-produccion.component.css']
})
export class ListadoCostosProduccionComponent implements OnInit, OnDestroy {


   @ViewChild(DataTableDirective, {static: false})

 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
    dtOptions: any = {};
  dtTrigger = new Subject();

 costoP:CostoProduccion[]=[];
   ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
ce:number=0;
  constructor(public regresarService: RegresarService,
              private costoS: CostoproduccionService,
               private router: Router,
                private route: ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService) { }



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
  this.costoS.getAll().subscribe((data: CostoProduccion[])=>{
      this.costoP = data;
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



  deleteCosto(est, id_costo_produccion){

      swal.fire({
  title: 'Eliminar Estilo?',
  text: "¿Estás seguro de eliminar el costo del estilo "+est+"?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.costoS.delete(id_costo_produccion).subscribe(res => {
         this.costoP = this.costoP.filter(item => item.id_costo_produccion !== id_costo_produccion);
this.rerender();
 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja a los precios de estilo: '+est
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
        this.router.navigateByUrl('dashboard/listado-costo');

    });


     
    swal.fire(
      'Eliminado!',
      'EL estilo ha sido eliminado.',
      'success'
    )
  }
})



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
