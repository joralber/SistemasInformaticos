import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { CodigoEstiloService } from '../services/codigo-estilo.service';
import { CodigoEstilo } from '../codigo-estilo';

import { DetalleCodigoEstiloService } from '../services/detalle-codigo-estilo.service';
import { DetalleCodigoEstilo } from '../detalle-codigo-estilo';

import { CostoproduccionService } from '../../costosproduccion/services/costoproduccion.service';
import { CostoProduccion } from '../../costosproduccion/costo-produccion';

import { DetallecostoService } from '../../costosproduccion/services/detallecosto.service';
import { DetalleCosto } from '../../costosproduccion/detalle-costo';

import { MateriaprimaService } from '../../materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../materiaprima/materiaprima';


import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';

import swal from'sweetalert2';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

import { CortesService } from '../../materiaprima/cortes/services/cortes.service';
import { Cortes } from '../../materiaprima/cortes/cortes';


//import { Select2OptionData } from 'ngSelect2';
declare const $: any;
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-editar-estilos',
  templateUrl: './editar-estilos.component.html',
  styleUrls: ['./editar-estilos.component.css']
})
export class EditarEstilosComponent implements OnInit, AfterViewInit, OnDestroy {

   @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();

  idcodigo_estilo: number;
  codigoEst: CodigoEstilo;
  costo_produ: CostoProduccion;
  detallecodigo: DetalleCodigoEstilo[]=[];

  materiaprima: Materiaprima[]=[];
  costoproduccion: CostoProduccion[]=[];

detalleC:DetalleCosto[]=[];
  form: FormGroup;
c:number=0;

idcodigo:number;
idcodigo2:number;
nuevototalmedida:number=0;

  public exampleData: Array<Select2OptionData>;
 public options: Options;
  public value: string[];

  //options: Options;
  //public exampleData: Array<Select2OptionData>;
  //public _value: string[];

  registerForm: FormGroup;
  
  detalleForm: FormGroup;
  detalleForm2: FormGroup;
  detalleForm3: FormGroup;

  formCosto: FormGroup;

costo_produccion:number=0;
margen_contribucion:number=0;
consumidor_final:number=0;
total_iva_mayoreo:number=0;
total_iva_consumidorf:number=0;
//id:number;

tot:number=0;

id_detalle_costo:number;
loading:boolean;

contador:number=0;
contador2:number=0;
arreglo=[];

 corte:Cortes[]=[];
 sum:number;
   ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
constructor(
    private codEst: CodigoEstiloService,
    private detalleCS: DetalleCodigoEstiloService, 
    private mp: MateriaprimaService,
    private cpS:CostoproduccionService,
    private detalleCPS: DetallecostoService,
    private route: ActivatedRoute,
    private router: Router,
     private fb:FormBuilder,
    private fb2:FormBuilder, 
    private cortS: CortesService,
    private bitacoraS:BitacoraService, private loginS: LoginService
  ) {
  this.codigoEst= new CodigoEstilo();
  this.costo_produ= new CostoProduccion();

//this.detalleC=new DetalleCosto();

  
}



   

  ngOnInit(): void {

    this.form = new FormGroup({
      codigo: new FormControl('', [ Validators.required]),
      estilo: new FormControl('', [ Validators.required]),
       estado: new FormControl('', [ Validators.required]),
  
    });

        this.registerForm = this.fb.group({


 idcodigo_estilo:  new FormControl(''),
id_mp: new FormControl(''),
      
    });

         this.detalleForm= this.fb2.group({
            id_costo_produccion: new FormControl(''),
        id_mp: new FormControl(''),
      medida1: new FormControl(''),
      medida2: new FormControl(''),
      total_m: new FormControl(''),
      id_factor: new FormControl(''),
      factor: new FormControl(''),
      precio: new FormControl(''),

        });


     //detallle
      this.detalleForm3= new FormGroup({
            id_costo_produccion: new FormControl(''),
        id_mp: new FormControl(''),
  id_cortes: new FormControl(''),
    precio: new FormControl(''),


        });

  //detallle2
      this.detalleForm2= new FormGroup({
            id_costo_produccion: new FormControl(''),
        id_mp: new FormControl(''),
    precio: new FormControl(''),


        });

//Actualizar costos
  this.formCosto = new FormGroup({
      idcodigo_estilo: new FormControl(''),
      totalmedida: new FormControl(''),
    //mano_obra: new FormControl(''),
    cdf_cif: new FormControl(''),
    costo_produccion: new FormControl(''),
    margen_contribucion: new FormControl(''),
    consumidor_final: new FormControl(''),
    total_iva_mayoreo: new FormControl(''),
    total_iva_consumidorf: new FormControl(''),
      estado: new FormControl(''),
  
    });
  //

             this.idcodigo_estilo = this.route.snapshot.params['idcodigo_estilo'];

    this.codEst.find(this.idcodigo_estilo).subscribe((data: CodigoEstilo)=>{
      this.codigoEst = data;
    this.c=this.codigoEst.codigo;


                    this.form.patchValue({codigo: this.c.toString().padStart(4, '0')});


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
        ]
    };

    this.getAllDetalle(this.idcodigo_estilo);


this.getAllselect(this.idcodigo_estilo);

this.getAllCosto(this.idcodigo_estilo);



  }



ngAfterViewInit(): void{



        $('#id_mp').select2({
  placeholder: '---- Seleccione ----',
  theme: "classic"
});
/*
$('#id_mp').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
});
*/





}


    get f(){
    return this.form.controls;
  }

   get costo(){
    return this.formCosto.controls;
  }

   get skills() : FormArray {
    return this.registerForm.get("skills") as FormArray
  }
 
 get dc() : FormArray {
    return this.detalleForm.get("dc") as FormArray
  }
 

  getAllDetalle(idcodigo_estilo):void{
  this.detalleCS.getAllDetalle(idcodigo_estilo).subscribe((data: DetalleCodigoEstilo[])=>{
      this.detallecodigo = data;
           // console.log(this.detallecodigo);
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

getAllCosto(idcodigo_estilo):void{
   this.cpS.getAllDetalle(idcodigo_estilo).subscribe((data: CostoProduccion[])=>{
      this.costoproduccion = data;
if(this.costoproduccion.length>0){
//console.log(this.costoproduccion[0].id_costo_produccion);
 this.idcodigo=this.costoproduccion[0].id_costo_produccion;
//this.idcodigo2=this.idcodigo;
//console.log(this.idcodigo);
}

});
}


  getAllselect(idcodigo_estilo):void{
  this.mp.MPDgetSelect(idcodigo_estilo).subscribe((data: Materiaprima[])=>{
      this.materiaprima = data;
      
    });

}

suma(id_costo_produccion, id_mp){
   this.detalleCPS.suma(id_costo_produccion, id_mp).subscribe((data: number)=>{
this.sum = data;
console.log(this.sum);
});

}

delete(id_costo_produccion, id_mp){
    this.detalleCPS.delete(id_costo_produccion, id_mp).subscribe(res => {
         this.detalleC = this.detalleC.filter(item => item.id_costo_produccion !== id_costo_produccion && item.id_mp !== id_mp );

        //this.router.navigateByUrl('dashboard/listado-estilo');

    });
}

///eliminar
   deleteMOCodigo(est, iddetalle_codigo_estilo, idcodigo_estilo, id_mp){
    
    this.suma(this.idcodigo, id_mp);

    console.log(idcodigo_estilo +' '+ id_mp)
    this.detalleCPS.find(idcodigo_estilo, id_mp).subscribe((data: DetalleCosto[])=>{
      this.detalleC  = data;
console.log(this.detalleC);

      if(this.detalleC.length>0){
      this.id_detalle_costo= this.detalleC[0].id_detalle_costo;
      console.log(this.id_detalle_costo)

if(this.detalleC[0].precio===null){

  swal.fire({
  title: 'Eliminar materia prima del estilo '+this.c.toString().padStart(4, '0')+'?',
  text: "¿Estás seguro de eliminar la materia prima: "+est+"?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
    

  this.detalleCS.delete(iddetalle_codigo_estilo).subscribe(res => {
         this.detallecodigo = this.detallecodigo.filter(item => item.iddetalle_codigo_estilo !== iddetalle_codigo_estilo);

        this.rerender();
        //this.router.navigateByUrl('dashboard/listado-estilo');
this.delete(this.idcodigo, id_mp);
 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja un matarial del estilo: ' + this.c.toString().padStart(4, '0')
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
    });



     
    swal.fire(
      'Eliminado!',
      'Materia prima ha sido eliminado.',
      'success'
    )
  }
});

}else{



  swal.fire({
  title: 'Eliminar materia prima del estilo '+this.c.toString().padStart(4, '0')+'?',
  text: "¿Estás seguro de eliminar la materia prima: "+est+"?, y tambien se modificara en el costo de producción",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
    

  this.detalleCS.delete(iddetalle_codigo_estilo).subscribe(res => {
         this.detallecodigo = this.detallecodigo.filter(item => item.iddetalle_codigo_estilo !== iddetalle_codigo_estilo);

        this.rerender();
        //this.router.navigateByUrl('dashboard/listado-estilo');
this.delete(this.idcodigo, id_mp);

    });

//actualizar costo

  this.cpS.find(this.detalleC[0].id_costo_produccion).subscribe((data: CostoProduccion)=>{
      this.costo_produ = data;

    //this.c=this.codigoEst.codigo;
  //    console.log(this.detalleC[0].precio);
//console.log(this.costo_produ.totalmedida);

this.nuevototalmedida=this.costo_produ.totalmedida - this.sum;

//console.log(this.nuevototalmedida);

//console.log(this.nuevototalmedida);
this.formCosto.patchValue({idcodigo_estilo: idcodigo_estilo})
 this.formCosto.patchValue({totalmedida: this.nuevototalmedida.toFixed(2)});
 //this.formCosto.patchValue({mano_obra: this.costo_produ.mano_obra });
 this.formCosto.patchValue({cdf_cif: this.costo_produ.cdf_cif});

this.costo_produccion= this.nuevototalmedida +  parseFloat(this.formCosto.get('cdf_cif').value);

 this.formCosto.patchValue({costo_produccion: this.costo_produccion });
this.margen_contribucion=(this.costo_produccion*0.10)+this.costo_produccion;

this.formCosto.patchValue({margen_contribucion: this.margen_contribucion.toFixed(2)});
this.consumidor_final=this.costo_produccion+this.costo_produccion;

this.formCosto.patchValue({consumidor_final: this.consumidor_final });

this.total_iva_mayoreo=(parseFloat(this.formCosto.get('margen_contribucion').value) * 0.13) +parseFloat(this.formCosto.get('margen_contribucion').value);

this.formCosto.patchValue({total_iva_mayoreo: this.total_iva_mayoreo.toFixed(2) });

this.total_iva_consumidorf= (parseFloat(this.formCosto.get('consumidor_final').value) * 0.13) + parseFloat(this.formCosto.get('consumidor_final').value);

this.formCosto.patchValue({total_iva_consumidorf: this.total_iva_consumidorf.toFixed(2)});

this.formCosto.patchValue({estado: this.costo_produ.estado });






            this.cpS.update(this.costo_produ.id_costo_produccion, this.formCosto.value).subscribe(res => {
            });

              


    });

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja un matarial del estilo: ' + this.c.toString().padStart(4, '0')+' y modifico los precios del producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

     
    swal.fire(
      'Eliminado!',
      'Materia prima ha sido eliminado.',
      'success'
    )
  }
});

//            console.log(this.detalleC);

            //costo Produccion

    



}
}else{
  //eliminar si n exxiste en costo

  swal.fire({
  title: 'Eliminar materia prima del estilo '+this.c.toString().padStart(4, '0')+'?',
  text: "¿Estás seguro de eliminar la materia prima: "+est+"?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
    

  this.detalleCS.delete(iddetalle_codigo_estilo).subscribe(res => {
         this.detallecodigo = this.detallecodigo.filter(item => item.iddetalle_codigo_estilo !== iddetalle_codigo_estilo);

        this.rerender();
        //this.router.navigateByUrl('dashboard/listado-estilo');

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja un matarial del estilo: ' + this.c.toString().padStart(4, '0')
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
    });



     
    swal.fire(
      'Eliminado!',
      'Materia prima ha sido eliminado.',
      'success'
    )
  }
});

}
    });

    


  }

submit(){
 this.loading=true;
    

  
 
  this.codEst.update(this.idcodigo_estilo, this.form.value).subscribe(res => {

       

       var selected2 = $("#id_mp :selected").map((_, e) => e.value).get();

//console.log(selected2);
this.contador=selected2.length;
       for (let i=0; i<selected2.length; i++){
                    this.registerForm.controls['idcodigo_estilo'].patchValue(this.idcodigo_estilo)

          this.registerForm.controls['id_mp'].patchValue(selected2[i])
//console.log(selected2[i]);

//detalleestilo
  this.detalleCS.create(this.registerForm.value).subscribe(res => {
   });

console.log(this.idcodigo);
if(this.idcodigo!== undefined){

this.arreglo.push(selected2[i]);
this.contador2++
if(this.contador===this.contador2){
 this.registrarDC();

}
}

}
   
      swal.fire('Exito...', 'Estilo actualizada con exito!!', 'success');
       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó el estilo: ' + this.c.toString().padStart(4, '0')
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

         this.router.navigateByUrl('dashboard/listado-estilo');
    });


}


registrarDC(){
console.log(this.arreglo);
for(const a of this.arreglo){
console.log(a);
let ab=0;
this.detalleForm3.patchValue({id_costo_produccion: this.idcodigo});
this.detalleForm3.patchValue({precio: '0.00'});

//
this.detalleForm2.patchValue({id_costo_produccion: this.idcodigo});
this.detalleForm2.patchValue({precio: '0.00'});
//
this.cortS.getAll(a).subscribe((data: Cortes[])=>{
      this.corte = data;
           if(this.corte.length !==0){

      console.log(this.corte);

      for(const c of this.corte){
        console.log(ab++);
        this.detalleForm3.patchValue({id_cortes: c.id_cortes});
                this.detalleForm3.patchValue({id_mp: a});

        console.log(this.detalleForm3.value);

  this.detalleCPS.create(this.detalleForm3.value).subscribe(res=>{

                });

      }

    }else{
this.detalleForm2.patchValue({id_mp: a});

        console.log(this.detalleForm2.value);
  this.detalleCPS.create(this.detalleForm2.value).subscribe(res=>{

                });

    }
  });


}

  /*
   this.detalleForm.controls['id_costo_produccion'].patchValue(this.idcodigo);

  this.detalleForm.controls['id_mp'].patchValue(selected2[i]);


  this.detalleCPS.create(this.detalleForm.value).subscribe(res=>{

                });
  */
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
