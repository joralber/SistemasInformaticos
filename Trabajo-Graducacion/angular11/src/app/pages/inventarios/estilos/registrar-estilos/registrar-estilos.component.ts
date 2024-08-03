import {Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {RegresarService} from '../../materiaprima/service/regresar.service';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

import { MateriaprimaService } from '../../materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../materiaprima/materiaprima';

import { CodigoEstiloService } from '../services/codigo-estilo.service';
import { CodigoEstilo } from '../codigo-estilo';

import { DetalleCodigoEstiloService } from '../services/detalle-codigo-estilo.service';
import { DetalleCodigoEstilo } from '../detalle-codigo-estilo';


import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';

declare const $: any;
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registrar-estilos',
  templateUrl: './registrar-estilos.component.html',
  styleUrls: ['./registrar-estilos.component.css']
})
export class RegistrarEstilosComponent implements OnInit {

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

 mp2:Materiaprima[]=[];




 //check=[];
 cod_mp:string;

codigo_estilo: CodigoEstilo;

  dtOptions: any = {};
  dtTrigger = new Subject();

  cod:number=0;
  id:number=0;
    form: FormGroup;
  registerForm: FormGroup;

 cantidad:any;
 loading:boolean;
 ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarService: RegresarService, private mpserv: MateriaprimaService,
              private codigoS: CodigoEstiloService,
              private detallecodigoS:DetalleCodigoEstiloService,
               private router: Router,
               private fb:FormBuilder, private bitacoraS:BitacoraService, private loginS: LoginService) {
this.codigo_estilo = new CodigoEstilo();


   }

  ngOnDestroy(){
      this.regresarService.regresarValue(false);

  }



  
  ngOnInit(): void {

    this.form = new FormGroup({
      codigo:  new FormControl('', [ Validators.required]),
      estilo:  new FormControl('', [ Validators.required]),
     id_mp2: new FormControl('', [ Validators.required] ),

      

    });

//            lessons: this.fb.array([])

    this.registerForm = this.fb.group({


 idcodigo_estilo:  new FormControl(''),
id_mp: new FormControl(''),
      
    });


  this.codigoS.ultimo_id().subscribe((data: CodigoEstilo)=>{
      this.codigo_estilo = data;
      console.log(this.codigo_estilo.idcodigo_estilo);

      if(Object.entries(this.codigo_estilo).length===0){
        this.cod=1;
        
        this.form.patchValue({codigo: this.cod.toString().padStart(4, '0')});

        this.id=1;
                //this.form.patchValue({idcodigo_estilo: this.id});

      }else{
              this.cod= this.codigo_estilo.codigo+1;

              this.form.patchValue({codigo: this.cod.toString().padStart(4, '0')});

              this.id=this.codigo_estilo.idcodigo_estilo+1;

//              this.form.patchValue({idcodigo_estilo: this.id});
//this.registerForm.controls['idcodigo_estilo'].patchValue(this.id);



      }

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


this.getMP();

  }

 get f(){
    return this.form.controls;
  }

 get skills() : FormArray {
    return this.registerForm.get("skills") as FormArray
  }
 

getMP():void{
  this.mpserv.getAll().subscribe((data: Materiaprima[])=>{
      this.mp2 = data;

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


   submit(){
this.loading=true;
    this.codigoS.repetido(this.form.get('estilo').value).subscribe((data: CodigoEstilo)=>{
         this.cantidad = data;



           if(this.cantidad>0){
              swal.fire('El estilo: "'+ this.form.get('estilo').value + '" ya existe ')
           this.loading=false;
           }else{


    var table = $("#idTable").DataTable();

            

     var arr = table.$('[name="id_mp[]"]:checked').map(function(){
      return this.value;
    }).get();
      //   var str = arr.join(',');

   // console.log(arr)
    if(arr.length<=0){
            swal.fire('Seleccione la Materia Prima necesaria');
            this.loading=false;

    }else{
//console.log(this.form.value);


//guardar condigo estilo
        this.codigoS.create(this.form.value).subscribe(res => {
//this.form.reset();



//guardar detalle codigo de estilo

   

 
for (let i=0; i<arr.length; i++){
  //console.log('eleme'+i+ 'es'+arr[i] )
                    this.registerForm.controls['idcodigo_estilo'].patchValue(this.id)

          this.registerForm.controls['id_mp'].patchValue(arr[i])
//console.log(this.registerForm.value)



     this.detallecodigoS.create(this.registerForm.value).subscribe(res => {

    });

}

this.form.reset();
this.registerForm.reset();

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo estilo: '+ this.cod.toString().padStart(4, '0')
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
 swal.fire('Exito...', 'Estilo registrado con exito!!', 'success');

   this.router.navigateByUrl('dashboard/listado-estilo');
    });
        //---------------



}
//
}
});

   }



}
