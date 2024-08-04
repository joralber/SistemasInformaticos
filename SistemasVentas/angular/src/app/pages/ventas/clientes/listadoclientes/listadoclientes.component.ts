import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import {NgForm, FormControl, Validators } from '@angular/forms';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cliente';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';

import { IntercambioService }  from '../services/intercambio.service';
import swal from'sweetalert2';


import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-listadoclientes',
  templateUrl: './listadoclientes.component.html',
  styleUrls: ['./listadoclientes.component.css']
})
export class ListadoclientesComponent implements OnInit, OnDestroy {

 title = 'THERSAN';
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 clientes:Cliente[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  
   constructor(public regresarp: IntercambioService, private service: ClienteService, private router: Router,  private bitacoraS:BitacoraService, private loginS: LoginService) {
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
        ]
    };
    //setInterval( ()=>{
      this.getAll();
    //},3000);
  }



getAll():void{
  this.service.getAll().subscribe((data: Cliente[])=>{
      this.clientes = data;
            console.log(this.clientes);
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

    deleteCliente(id_cliente){

      swal.fire({
  title: 'Eliminar cliente?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_cliente).subscribe(res => {
         this.clientes = this.clientes.filter(item => item.id_cliente !== id_cliente);
         //console.log('Proveedor eliminado con éxito!');
                     console.log(this.clientes);
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

        this.router.navigateByUrl('dashboard/listar-cliente');


    });
    swal.fire(
      'Eliminado!',
      'EL cliente ha sido eliminado.',
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

