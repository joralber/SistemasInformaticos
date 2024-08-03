import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';

import { MateriaprimaService } from '../service/materiaprima.service';
import { Materiaprima } from '../materiaprima';
import { MedidampService } from '../medidas-materia/services/medidamp.service';
import { Medidamp } from '../medidas-materia/medidamp';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { FactorService } from './services/factor.service';
import { Factor } from './factor';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.component.html',
  styleUrls: ['./factor.component.css']
})
export class FactorComponent implements OnInit{
 @ViewChild('inputValue') input; // acceder al elemento de referencia
// @ViewChild('inputValue2') input2; // acceder al elemento de referencia


unidad:number =0;
fact:number =0;

update2:boolean;

materiaprima: Materiaprima;
medidamp: Medidamp;
fac: Factor;
id_factor: number;

 id_mp: number;
   form: FormGroup;
  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;


 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 factores:Factor[]=[];
 factores2:Factor[]=[];

  dtOptions: any = {};
  dtTrigger = new Subject();
cantidad:any;
count: number;
loading:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private materiaService: MateriaprimaService, 
  private medidaS: MedidampService, 
       private route: ActivatedRoute,
       private factorServ: FactorService, private bitacoraS:BitacoraService, private loginS: LoginService
       )
    { 
this.update2=false;
this.materiaprima= new Materiaprima();
this.medidamp= new Medidamp();
this.fac= new Factor();
  }



  ngOnInit(): void {
      this.id_mp = this.route.snapshot.params['id_mp'];

this.comprobarExiste(this.id_mp);
      //console.log(this.materiaprima.id_medida);


  this.form = new FormGroup({
        id_mp:  new FormControl(''),
        unidades:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex),Validators.min(1)]),
        factor:  new FormControl('',[Validators.required]),
        fecha: new FormControl(''),
        estado: new FormControl('')

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



      this.getAll();
  }


 get f(){
    return this.form.controls;
  }





 public factor(inputValue:string) {


  this.unidad=parseInt(inputValue);     


//console.log(this.unidad);
//console.log(this.materiaprima.precio_unitario);

if(inputValue===''){
this.fact=0;
}else{
    this.fact =this.materiaprima.precio_unitario / this.unidad;
}
        //   this.router.navigateByUrl('dashboard/listado-materia');


  }




getAll():void{
  this.factorServ.getAll().subscribe((data: Factor[])=>{
      this.factores = data;

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



cambio(){
  this.update2=false;
 this.form.reset();
}

limpiar(){
  this.form.reset();
this.materiaprima=new Materiaprima();
this.medidamp= new Medidamp();
this.fact=0;
this.update2=true;
}



//datos a actualizar

getAcualizar(id_factor){
this.update2=true;
  this.id_factor = id_factor;


    this.factorServ.find(this.id_factor).subscribe((data: Factor)=>{
      this.fac = data;
     
         this.materiaService.find(this.fac.id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;

          this.medidaS.find(this.materiaprima.id_medida).subscribe((data: Medidamp)=>{
      this.medidamp = data;
//console.log(this.medidamp)
      
    });

//console.log(this.materiaprima)

    });



    });
}



submit(){
this.loading=true;
            if(this.update2==false){




  this.factorServ.create(this.form.value).subscribe(res => {
this.limpiar();

 swal.fire('Exito...', 'Factor registrado con exito!!', 'success');
       this.getAll();

        this.materiaService.modificarFactor(this.id_mp, 0).subscribe(res => {
         this.loading=false;
     
    

         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo factor de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });

},

      error => {
                         swal.fire('Error...', 'Ingrese una nueva unidad!!' ,'error');

        });

}else{



      this.factorServ.update(this.id_factor, this.form.value).subscribe(res => {
//        console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Factor actualizado con exito!!', 'success');
this.form.reset();
this.limpiar();
        this.loading=false;
       this.getAll();

            //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un factor de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
   
 

  }
               

  }


cambiofactor(){
//  console.log('hola');
  //console.log(this.fac.factor);

if(this.fact > 0){
this.form.patchValue({factor: this.fact});

}

}

comprobarExiste(id_mp){


   this.factorServ.existe(id_mp).subscribe((data: Factor[])=>{
         this.factores2 = data;



if(this.factores2.length>0){

this.factores2[0].id_factor;

this.update2=true;


this.getAcualizar(this.factores2[0].id_factor);

           }else{

    this.materiaService.find(this.id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;

          this.medidaS.find(this.materiaprima.id_medida).subscribe((data: Medidamp)=>{
      this.medidamp = data;
      
    });


    });
           }

         });

}





}
