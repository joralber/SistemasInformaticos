import { Component, OnInit,OnDestroy, ViewChild  } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../usuarios'
import { IntercambioService }  from '../../services/intercambio.service';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import swal from'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit, OnDestroy {
user:Usuarios[]=[];
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
    dtOptions: any = {};
  dtTrigger = new Subject();
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarp: IntercambioService, private usuarioS: UsuariosService, private router: Router,
                 private bitacoraS:BitacoraService, private loginS: LoginService) { }

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
    this.getAll();
  }

getAll():void{
  this.usuarioS.getAll().subscribe((data: Usuarios[])=>{
      this.user = data;
            console.log(this.user);
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


deleteUser(id)
{

      swal.fire({
  title: 'Eliminar Usuario?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.usuarioS.delete(id).subscribe(res => {
         this.user = this.user.filter(item => item.id !== id);

this.rerender();
        //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja a un usuario'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

        this.router.navigateByUrl('dashboard/listado-usuarios');


    });
    swal.fire(
      'Eliminado!',
      'EL Usuario ha sido eliminado.',
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


public regresarpr(){
  this.regresarp.intercambioValue(true);

}



}
