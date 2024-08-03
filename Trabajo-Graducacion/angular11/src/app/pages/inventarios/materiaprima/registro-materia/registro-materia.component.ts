import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RegresarService} from '../service/regresar.service';

import { MateriaprimaService } from '../service/materiaprima.service';
import { Materiaprima } from '../materiaprima';

import { CategoriampService } from '../categoria-materia/services/categoriamp.service';
import { Categoriamp } from '../categoria-materia/categoriamp';

import { ColormpService } from '../color-materia/services/colormp.service';
import { Colormp } from '../color-materia/colormp';

import { MedidampService } from '../medidas-materia/services/medidamp.service';
import { Medidamp } from '../medidas-materia/medidamp';

import { KardexmpService } from '../../../kardex-mat-prima/services/kardexmp.service';
import { Kardexmp } from '../../../kardex-mat-prima/kardexmp';

import { MpkardexService } from '../../../kardex-mat-prima/services/mpkardex.service';
import { Mpkardexmp } from '../../../kardex-mat-prima/mpkardexmp';

import { validarQueSeanMayor } from '../validator';

import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registro-materia',
  templateUrl: './registro-materia.component.html',
  styleUrls: ['./registro-materia.component.css']
})
export class RegistroMateriaComponent implements OnInit, OnDestroy {

 categorias:Categoriamp[]=[];
 color:Colormp[]=[];
medida:Medidamp[]=[];

materiap: Materiaprima;
kardexmp: Kardexmp;

  form: FormGroup;
  formCategoria: FormGroup;
  formColor: FormGroup;
  formMedida: FormGroup;
  formKardex: FormGroup;
  formMpKar: FormGroup;

cantidad:any;
cantidad2:any;
cantidad3:any;
cantidad5:any;

idm:number=0;
idk:number=0;
loading:boolean;
loading2:boolean;
loading3:boolean;
loading4:boolean;

id_categoria:number;
id_color:number;
id_medida:number;
nombre_producto:string;
  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarService: RegresarService, 
    public regresarm: RegresarService, private cate_ser: CategoriampService,
     private col_ser: ColormpService,private med_ser: MedidampService,
     private kardexmpS: KardexmpService, private mpKS:MpkardexService,
      private materiaservice: MateriaprimaService, private router: Router, private bitacoraS:BitacoraService, private loginS: LoginService ) 
  {
    this.materiap=new Materiaprima();
    this.kardexmp=new Kardexmp();

   }

  ngOnInit(): void {

      this.form = new FormGroup({
        id_categoria:  new FormControl('', [ Validators.required]),
        id_color:  new FormControl('', [ Validators.required]),
        id_medida:  new FormControl('', [ Validators.required]),
        nombre_producto:  new FormControl('', [ Validators.required]),
        cantidad:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
        precio_unitario:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex)]),
        stock_minimo:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
        descripcion:  new FormControl('', [ Validators.required]),

    },
  {
    validators: validarQueSeanMayor,
  });

//categoria
         this.formCategoria = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ])

    });

         //medida
           this.formMedida = new FormGroup({
      medida:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),

    });

//color
              this.formColor = new FormGroup({
      color:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      
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



    this.getCategorias();
    this.getMedida();
    this.getColor();


     //ultim id
this.materiaservice.ultimo_id().subscribe((data: Materiaprima)=>{
      this.materiap = data;

if(Object.entries(this.materiap).length===0){
  
        this.idm=1;

      }else{
              
              this.idm=this.materiap.id_mp+1;

    }

    });

this.kardexmpS.ultimo_id().subscribe((data: Kardexmp)=>{
      this.kardexmp = data;
      
//console.log(this.kardexmp);


if(Object.entries(this.kardexmp).length===0){
  
        this.idk=1;
                

      }else{
              
              this.idk=this.kardexmp.id_kardex+1;

    }

    });
//
  }

 get f(){
    return this.form.controls;
  }


get fCol(){
    return this.formColor.controls;
  }
get fCat(){
    return this.formCategoria.controls;
  }
get fMed(){
    return this.formMedida.controls;
  }



public regresar(){
  this.regresarService.regresarValue(true);

}



    getCategorias():void{
  this.cate_ser.getAll().subscribe((data: Categoriamp[])=>{
      this.categorias = data;
     
    });
}

getColor():void{
  this.col_ser.getAll().subscribe((data: Colormp[])=>{
      this.color = data; 
    });

}


getMedida():void{
  this.med_ser.getAll().subscribe((data: Medidamp[])=>{
      this.medida = data; 
    });

}


submit(){
this.loading=true;
this.id_categoria=this.form.get('id_categoria').value;
this.id_color=this.form.get('id_color').value;
this.id_medida=this.form.get('id_medida').value;
this.nombre_producto=this.form.get('nombre_producto').value;
console.log(this.nombre_producto);
  this.materiaservice.repetido2(this.id_categoria, this.id_color, this.id_medida, this.nombre_producto ).subscribe((data: Materiaprima[])=>{
         this.cantidad5 = data;



           if(this.cantidad5>0){
            this.loading=false;

           
            swal.fire('EL Material: "'+ this.form.get('nombre_producto').value + '" ya existe ')

           }else{

    ///
  
this.formKardex.patchValue({inv_inicial: this.form.get('cantidad').value});

this.formKardex.patchValue({inv_final: this.form.get('cantidad').value});
this.formKardex.patchValue({descripcion: 'Inventario Inicial'});
//this.formKardex.patchValue({entradas: this.form.get('cantidad').value});
//this.formKardex.patchValue({salida: this.form.get('cantidad').value});
//this.formKardex.patchValue({inv_inicial: this.form.get('cantidad').value});


      this.formMpKar.patchValue({id_mp: this.idm});
this.formMpKar.patchValue({id_kardex: this.idk});

console.log(this.formMpKar.value);


   this.materiaservice.create(this.form.value).subscribe(res => {

this.kardexmpS.create(this.formKardex.value).subscribe(res=>{
 

this.mpKS.create(this.formMpKar.value).subscribe(res => {
});

});
 swal.fire('Exito...', 'Materia prima registrada con exito!!', 'success');

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


      this.router.navigateByUrl('dashboard/listado-materia');

    });
  //
  }
});

}

//categoria
submit2(){
this.loading2=true;
    this.cate_ser.repetido(this.formCategoria.get('nombre').value).subscribe((data: Categoriamp)=>{
         this.cantidad = data;



           if(this.cantidad>0){
            this.loading2=false;
           
            swal.fire('La categoria: "'+ this.formCategoria.get('nombre').value + '" ya existe ')

           }else{

console.log(this.formCategoria.value);
this.cate_ser.create(this.formCategoria.value).subscribe(res => {

    this.getCategorias();

this.formCategoria.reset();
 swal.fire('Exito...', 'Categoria registrada con exito!!', 'success');

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

    this.getCategorias();

    });
            this.loading2=false;

this.formCategoria.reset();


}
});
}

//medida
submit3(){
  this.loading3=true;
this.med_ser.repetido(this.formMedida.get('medida').value).subscribe((data: Medidamp)=>{
         this.cantidad2 = data;



           if(this.cantidad2>0){
           this.loading3=false;
            swal.fire('La medida: "'+ this.formMedida.get('medida').value + '" ya existe ')

           }else{






  this.med_ser.create(this.formMedida.value).subscribe(res => {
this.formMedida.reset();

 swal.fire('Exito...', 'Medida registrada con exito!!', 'success');
       this.getMedida();

       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva medida de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


    });
  this.loading3=false;
this.formMedida.reset();

           }


         });

    

}

//color
submit4(){
  this.loading4=true;

      this.col_ser.repetido(this.formColor.get('color').value).subscribe((data: Colormp)=>{
         this.cantidad3 = data;



           if(this.cantidad3>0){
           this.loading4=false;
            swal.fire('El color: "'+ this.formColor.get('color').value + '" ya existe ')

           }else{



this.col_ser.create(this.formColor.value).subscribe(res => {

         console.log('Color creado con exito!');

this.formColor.reset();
 swal.fire('Exito...', 'Color registrado con exito!!', 'success');
       this.getColor();
//bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo color de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
this.loading4=false;
this.formColor.reset();

}

});

}

  ngOnDestroy(){
      this.regresarm.regresarmp(false);

  }

    checarSiEsMayor(): boolean {
    return this.form.hasError('noesMayor') &&
      this.form.get('cantidad').dirty &&
      this.form.get('stock_minimo').dirty;
  }

    limpiar(){
this.formCategoria.reset();
this.formMedida.reset();
this.formColor.reset();
//this.loading2=false;
//this.loading3=false;
//this.loading4=false;
}

}
