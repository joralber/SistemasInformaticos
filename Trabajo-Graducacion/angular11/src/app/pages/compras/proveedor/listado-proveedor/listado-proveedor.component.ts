import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import {NgForm, FormControl, Validators } from '@angular/forms';

import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../proveedor';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';

import { IntercambioService }  from '../../service/intercambio.service';
import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-listado-proveedor',
  templateUrl: './listado-proveedor.component.html',
  styleUrls: ['./listado-proveedor.component.css']
})
export class ListadoProveedorComponent implements OnInit, OnDestroy
{


 title = 'SIGFICEV';
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 proveedores:Proveedor[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  
   constructor(public regresarp: IntercambioService, private service: ProveedorService, private router: Router,  private bitacoraS:BitacoraService, private loginS: LoginService) {
  }


   
public regresarpr(){
  this.regresarp.intercambioValue(true);

}





  ngOnInit(): void {

 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
        "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },
  processing: true,
  
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    };
    //setInterval( ()=>{
      this.getAll();
    //},3000);
  }



getAll():void{
  this.service.getAll().subscribe((data: Proveedor[])=>{
      this.proveedores = data;
            console.log(this.proveedores);
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

    deleteProveedor(id_proveedor){

      swal.fire({
  title: 'Eliminar Proveedor?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_proveedor).subscribe(res => {
         this.proveedores = this.proveedores.filter(item => item.id_proveedor !== id_proveedor);
         //console.log('Proveedor eliminado con éxito!');
                     console.log(this.proveedores);
this.rerender();

 //bitacora
        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];
    
   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja a un proveedor'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

        this.router.navigateByUrl('dashboard/listado-proveedor');


    });
    swal.fire(
      'Eliminado!',
      'EL proveedor ha sido eliminado.',
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
