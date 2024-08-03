import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import {RegresarService} from '../service/regresar.service';

import {FormGroup, FormControl, Validators } from '@angular/forms';

import { MateriaprimaService } from '../service/materiaprima.service';
import { Materiaprima } from '../materiaprima';

import { FactorService } from '../factor/services/factor.service';
import { Factor } from '../factor/factor';

import { KardexmpService } from '../../../kardex-mat-prima/services/kardexmp.service';
import { Kardexmp } from '../../../kardex-mat-prima/kardexmp';

import { MpkardexService } from '../../../kardex-mat-prima/services/mpkardex.service';
import { Mpkardexmp } from '../../../kardex-mat-prima/mpkardexmp';

import { DetallecostoService } from '../../costosproduccion/services/detallecosto.service';
import { DetalleCosto } from '../../costosproduccion/detalle-costo';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';

import swal from'sweetalert2';

import { NavServiceService } from '../../../../shared/header/nav-service.service';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

declare const $: any;

@Component({
  selector: 'app-listado-materia',
  templateUrl: './listado-materia.component.html',
  styleUrls: ['./listado-materia.component.css']
})
export class ListadoMateriaComponent implements OnInit, OnDestroy {

 @ViewChild('inputValue') input; // acceder al elemento de referencia
 @ViewChild('inputValue2') input2; // acceder al elemento de referencia


    numero1: number=0;
  numero2: number=0;
  resultado: number=0;

  existe:boolean;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 mp:Materiaprima[]=[];
 n:Materiaprima[]=[];

  factores2:Factor[]=[];
  fac: any=[];

  dtOptions: any = {};
  dtTrigger = new Subject();
materiaprima: Materiaprima;
kardexmp: Kardexmp;

form: FormGroup;

  formKardex: FormGroup;
  formMpKar: FormGroup;
idm:number=0;
idk:number=0;
exis:number=0;

cant:any;

loading:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarm: RegresarService, private service: MateriaprimaService, 
    private kardexmpS: KardexmpService, private mpKS:MpkardexService, private detS:DetallecostoService,
    private router: Router,
    private factorServ: FactorService, private notificationService: NavServiceService,  private bitacoraS:BitacoraService, private loginS: LoginService) {
    this.materiaprima= new Materiaprima();
    this.kardexmp= new Kardexmp();

  }



public regresarmp(){
  this.regresarm.regresarmp(true);

}


  ngOnInit(): void {

this.form= new FormGroup({

cantidad: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
cantidad2: new FormControl(''),


});


//kardex

              this.formKardex = new FormGroup({
descripcion: new FormControl(''),
fecha: new FormControl(''),
inv_inicial: new FormControl(''),
entradas: new FormControl(''),
salida: new FormControl(''),
inv_final: new FormControl(''),
              });

this.formMpKar = new FormGroup({
id_kardex: new FormControl(''),
id_mp: new FormControl(''),
});





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

       //ultim id


//
  }


 get f(){
    return this.form.controls;
  }

getAll():void{
  this.service.getAll().subscribe((data: Materiaprima[])=>{
      this.mp = data;

            
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


agregarMP(id_mp){
      // this.id_mp = this.route.snapshot.params['id_mp'];
    this.service.find(id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;

    });

          this.formMpKar.patchValue({id_mp: id_mp});
this.ultimoid();


}



///dar de baja

   deleteMP(id_mp, nombre_producto){

this.detS.repetido(id_mp).subscribe((data: DetalleCosto)=>{
         this.cant = data;
//         console.log(this.cant);
//ver si existe en costo mp
      if(this.cant>0){
              swal.fire('El material: "'+ nombre_producto + '" no se puede eliminar');

      }else{

            swal.fire({
  title: 'Eliminar Materia Prima?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.service.delete(id_mp).subscribe(res => {
         this.mp = this.mp.filter(item => item.id_mp !== id_mp);
         //console.log('Proveedor eliminado con éxito!');
                     //console.log(this.mp);
this.rerender();

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja una materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

        this.router.navigateByUrl('dashboard/listado-materia');


    });
    swal.fire(
      'Eliminado!',
      'La Materia Prima ha sido eliminada.',
      'success'
    )
  }
});




 }

//fin servicio costo
       });

     

  

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



limpiarModal(){

    this.resultado=0;
        this.materiaprima= new Materiaprima();

 this.form.reset();
}


 public Sumar(inputValue:string, inputValue2:string) {


  this.numero1=parseInt(inputValue);     
this.numero2=parseInt(inputValue2);     


if(inputValue2===''){
this.resultado=0;
}else{
    this.resultado =this.numero1 + this.numero2;
}
        //   this.router.navigateByUrl('dashboard/listado-materia');


  }


ultimoid(){

  //ultimo id
this.kardexmpS.ultimo_id().subscribe((data: Kardexmp)=>{
      this.kardexmp = data;
      


if(Object.entries(this.kardexmp).length===0){
  
        this.idk=1;
                this.formMpKar.patchValue({id_kardex: this.idk});


      }else{
              
              this.idk=this.kardexmp.id_kardex+1;
this.formMpKar.patchValue({id_kardex: this.idk});

    }

    });  
}



   submit(){
this.loading=true;



    //
//console.log(this.materiaprima.id_mp);
//console.log(this.resultado);


//this.formKardex.patchValue({inv_inicial: this.form.get('cantidad').value});

this.formKardex.patchValue({entradas: this.form.get('cantidad').value});
this.exis=parseFloat(this.form.get('cantidad').value) + this.materiaprima.cantidad; 
this.formKardex.patchValue({inv_final: this.exis});
this.formKardex.patchValue({descripcion: 'Entrada'});
//this.formKardex.patchValue({salida: this.form.get('cantidad').value});
//this.formKardex.patchValue({inv_inicial: this.form.get('cantidad').value});


//console.log(this.idk);
//console.log(this.formKardex.value);
//console.log(this.formMpKar.value)



 this.service.agregarStock(this.materiaprima.id_mp, this.resultado ).subscribe(res => {
  this.kardexmpS.create(this.formKardex.value).subscribe(res=>{
 

this.mpKS.create(this.formMpKar.value).subscribe(res => {
    this.notificacion();
});

});
//this.formKardex.reset();
//this.formMpKar.reset();
   this.limpiarModal();



            swal.fire('Exito...', 'Se agregado el nuevo stock con exito!!', 'success');

this.getAll();  



//        this.router.navigateByUrl('dashboard/listado-materia');


    });

this.loading=false;

}


notificacion(){
    this.notificationService.clearProducts();      
this.n=[];
      for(const m of this.mp){
        
             if(m.cantidad <= m.stock_minimo){
                      this.n.push(m);
                  }
        }
      //  console.log(this.n);
    this.notificationService.addNotification(this.n);

}

}
