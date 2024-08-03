import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';

import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';

import { CortesService } from './services/cortes.service';
import { Cortes } from './cortes';

import { MateriaprimaService } from '../service/materiaprima.service';
import { Materiaprima } from '../materiaprima';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import {ActivatedRoute, Router } from '@angular/router';

import {DetallecostoService} from '../../costosproduccion/services/detallecosto.service';
import {DetalleCosto} from '../../costosproduccion/detalle-costo';

import swal from'sweetalert2';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-cortes',
  templateUrl: './cortes.component.html',
  styleUrls: ['./cortes.component.css']
})
export class CortesComponent implements OnInit, OnDestroy{

update2:boolean;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 corte:Cortes[]=[];
 detalle: DetalleCosto[]=[];
  dtOptions: any = {};
  dtTrigger = new Subject();
  
    form: FormGroup;
    detalleForm: FormGroup;
  id_cortes: number;
  cort: Cortes;

cantidad:any;
cantidad2:any;
ultimoid:number;
ultimoall:number;

loading:boolean;
id_mp:number;
materia:Materiaprima;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private cortS: CortesService, private router: Router, private route: ActivatedRoute,
              private mpS: MateriaprimaService, private detalS:DetallecostoService, private bitacoraS:BitacoraService, private loginS: LoginService) { 
this.update2=false;
this.cort= new Cortes();
this.materia=new Materiaprima();
}


   

  ngOnInit(): void {
          this.id_mp = this.route.snapshot.params['id_mp'];



  this.mpS.find(this.id_mp).subscribe((data: Materiaprima)=>{
      this.materia = data;

    });

      this.form = new FormGroup({
      cortes:  new FormControl('', [ Validators.required]),
      id_mp: new FormControl(''),

    });

      //detallle
      this.detalleForm= new FormGroup({
            id_costo_produccion: new FormControl(''),
        id_mp: new FormControl(''),
  id_cortes: new FormControl(''),
    precio: new FormControl(''),


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

      this.getAll(this.id_mp);

 

this.ultimoidCorte(this.id_mp);


  }



  //ultimo id corte

  ultimoidCorte(id_mp){
    this.cortS.obtenerUltimoId(this.id_mp).subscribe((data: number)=>{
this.ultimoid = data;
      console.log(this.ultimoid);
if(this.ultimoid >=1){
           this.detalS.getAllCorte(this.ultimoid).subscribe((data: DetalleCosto[])=>{
      this.detalle = data;
      console.log(this.detalle);
    
    
    });

         }

  });
  }


//actualizar

getAcualizar(id_cortes){
this.update2=true;

  this.id_cortes = id_cortes;

    this.cortS.find(id_cortes).subscribe((data: Cortes)=>{
      this.cort = data;

    });
}


getAll(id_mp):void{
  this.cortS.getAll(id_mp).subscribe((data: Cortes[])=>{
      this.corte = data;
         //   console.log(this.corte);
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
/*
    deleteCortes(id_cortes){
      swal.fire({
  title: 'Eliminar corte de Materia Prima?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonCorte: '#3085d6',
  cancelButtonCorte: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.cortS.delete(id_cortes).subscribe(res => {
         this.corte = this.corte.filter(item => item.id_cortes !== id_cortes);
         //console.log('Proveedor eliminado con éxito!');
this.rerender();

       this.getAll();


    });
    swal.fire(
      'Eliminado!',
      'EL color ha sido eliminado.',
      'success'
    )
  }
})

  }




*/



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


//registrar Detalle costo
  createDetalle(){
     if(this.detalle.length !==0){



    this.cortS.obtenerUltimoall().subscribe((data: number)=>{
this.ultimoall = data;
console.log(this.ultimoall);

for(const d of this.detalle){

this.detalleForm.patchValue({id_costo_produccion: d.id_costo_produccion});
this.detalleForm.patchValue({id_mp: this.id_mp});
this.detalleForm.patchValue({id_cortes: this.ultimoall});
this.detalleForm.patchValue({precio: '0.00'});

  console.log(this.detalleForm.value);
  this.detalS.create(this.detalleForm.value).subscribe(res=>{

                });

}

});
   }

  }

  //////7

   submit(){
    this.form.patchValue({id_mp: this.id_mp});

  
    

this.loading=true;
    this.cortS.repetido(this.form.get('id_mp').value, this.form.get('cortes').value).subscribe((data: Cortes[])=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading=false;
            swal.fire('El corte: "'+ this.form.get('cortes').value + '" ya existe ')

           }else{


if(this.update2==false){

this.cortS.create(this.form.value).subscribe(res => {

         console.log('Corte creado con exito!');


 swal.fire('Exito...', 'Corte registrado con exito!!', 'success');
this.form.reset();
       this.getAll(this.id_mp);

       this.updateMP(this.id_mp);

       this.createDetalle();

this.loading=false;
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo corte de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
    });

}else{

      this.cortS.update(this.id_cortes, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Corte actualizado con exito!!', 'success');

       this.getAll(this.id_mp);
this.form.reset();
       this.loading=false;

         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un nuevo corte de materia prima'
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

updateMP(id_mp){
 this.cortS.repetido2(this.id_mp).subscribe((data: Cortes)=>{
         this.cantidad2 = data;
         console.log(this.cantidad2);

         if(this.cantidad2===1){
          this.mpS.modificarCorte(this.id_mp, 0).subscribe(res => {


          });


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
