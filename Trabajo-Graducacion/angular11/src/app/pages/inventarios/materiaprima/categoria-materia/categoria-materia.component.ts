import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import {RegresarService} from '../service/regresar.service';


import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';

import { CategoriampService } from './services/categoriamp.service';
import { Categoriamp } from './categoriamp';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import {ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-categoria-materia',
  templateUrl: './categoria-materia.component.html',
  styleUrls: ['./categoria-materia.component.css']
})

export class CategoriaMateriaComponent implements OnInit, OnDestroy
{

update:boolean;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 categorias:Categoriamp[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  
    form: FormGroup;
  id_categoria: number;
  categ: Categoriamp;
cantidad:any;

loading:boolean;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;

  constructor(public  regresarService: RegresarService, private service: CategoriampService, 
     private router: Router,
     private route: ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService
) { 
this.update=false;
this.categ= new Categoriamp();
}


   

  ngOnInit(): void {

      this.form = new FormGroup({
      nombre:  new FormControl('', [ Validators.required]),
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

getAcualizar(id_categoria){
this.update=true;

  this.id_categoria = id_categoria;

    this.service.find(id_categoria).subscribe((data: Categoriamp)=>{
      this.categ = data;
console.log(this.categ);
    });
}


getAll():void{
  this.service.getAll().subscribe((data: Categoriamp[])=>{
      this.categorias = data;
            console.log(this.categorias);
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

    deleteCategoriamp(id_categoria){
      swal.fire({
  title: 'Eliminar Categoria de Materia Prima?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_categoria).subscribe(res => {
         this.categorias = this.categorias.filter(item => item.id_categoria !== id_categoria);
         //console.log('Proveedor eliminado con éxito!');
this.rerender();

       this.getAll();
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja una categoria de materia prima'
      // Agrega aquí otros campos si es necesario
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
    this.service.repetido(this.form.get('nombre').value).subscribe((data: Categoriamp)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading=false;
            swal.fire('La categoria: "'+ this.form.get('nombre').value + '" ya existe ')

           }else{

if(this.update==false){

this.service.create(this.form.value).subscribe(res => {

         console.log('Categoria creada con exito!');

this.form.reset();
 swal.fire('Exito...', 'Categoria registrada con exito!!', 'success');
       this.getAll();
this.loading=false;

  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva categoria de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
    });

}else{

      this.service.update(this.id_categoria, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Categoria actualizada con exito!!', 'success');
this.form.reset();

       this.getAll();
       this.loading=false;
      //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó una categoria de materia prima'
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
  this.update=false;
 this.form.reset();
}
}
