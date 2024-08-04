import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import * as JsBarcode from 'jsbarcode';


import { TallasService } from '../../tallas/services/tallas.service';
import { Tallas } from '../../tallas/tallas';

import { ColorService } from '../../colores/services/color.service';
import { Color } from '../../colores/color';

import { CategoriasService } from '../../categorias/services/categorias.service';
import { Categorias } from '../../categorias/categorias';

import { ProductosService } from '../services/productos.service';
import { Productos } from '../productos';

import { KardexpfService } from '../../kardexP/services/kardexpf.service';
import { Kardexpf } from '../../kardexP/kardexpf';

import { PfkardexService } from '../../kardexP/services/pfkardex.service';
import { Pfkardex } from '../../kardexP/pfkardex';


import { Router } from '@angular/router';


import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';

import {RegresarService} from '../../regresar.service';

import swal from'sweetalert2';


import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-registrar-productos',
  templateUrl: './registrar-productos.component.html',
  styleUrls: ['./registrar-productos.component.css']
})
export class RegistrarProductosComponent implements OnInit, OnDestroy {
  @ViewChild('barcode') barcode: ElementRef;

 talla:Tallas[]=[];
 categorias: Categorias[]=[];

color:Color[]=[];

  selectedEstilo:number;


form:FormGroup;
formCategoria: FormGroup;
  formColor: FormGroup;
  formTalla: FormGroup;
  

  formKardex: FormGroup;
  formPfKar: FormGroup;

  cantidad:any;
cantidad2:any;
cantidad3:any;
cantidad4:any;
cantidad5:any;


codidoB: number=0;
codigo:any;
barra:boolean;

kardPF: Kardexpf;
pfKar: Pfkardex;

pro:Productos;

id_pt:number=0;
id_kp:number=0;

loading:boolean;
loading2:boolean;
loading3:boolean;
loading4:boolean;
  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
codigoEAN13:any;
  constructor(public regresarService: RegresarService,
               private tallaS: TallasService, private colorS:ColorService,
              private prodS: ProductosService,
               private categoriasS:CategoriasService,
               private kardexpfS:KardexpfService, private pfKS:PfkardexService,
              private router:Router, private bitacoraS:BitacoraService, private loginS: LoginService) {
   this.pfKar= new Pfkardex();
this.kardPF=new Kardexpf();
this.pro=new Productos();
   }

  ngOnInit(): void {


this.barra=false;

this.generarCodigoBarra();


      this.form = new FormGroup({
        nombre_producto:  new FormControl('', [ Validators.required, Validators.maxLength(50)]),
        id_talla:  new FormControl('', [ Validators.required]),
        id_color:  new FormControl('', [ Validators.required]),
        id_cat:  new FormControl('', [ Validators.required]),
        precio_unitario:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex),  Validators.min(0.1), Validators.maxLength(11)]),
      cantidad:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+"), Validators.min(1), Validators.maxLength(10)]),
      codigo_barra:  new FormControl(''),

  });


//categoria
         this.formCategoria = new FormGroup({
      categoria:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(50) ]),

    });

         //medida
           this.formTalla = new FormGroup({
talla:  new FormControl('', [ Validators.required, Validators.maxLength(8)]),
    
    });

//color
              this.formColor = new FormGroup({
      color:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'),Validators.maxLength(50) ]),
      
    });

                    //kardex

              this.formKardex = new FormGroup({
descripcionp: new FormControl(''),
fecha: new FormControl(''),
inv_inicialp: new FormControl(''),
entradasp: new FormControl(''),
salidap: new FormControl(''),
inv_finalp: new FormControl(''),
              });

this.formPfKar = new FormGroup({
id_producto: new FormControl(''),
id_kardex_productos: new FormControl(''),
});




//tallas
this.getTalla();
      //

      //categoria
this.getCategoria();
      //

  //color
this.getColor();
      //


     //ultim id
this.prodS.ultimo_id().subscribe((data: Productos)=>{
      this.pro = data;
//console.log(this.pro);
if(Object.entries(this.pro).length===0){
  
        this.id_pt=1;

      }else{
              
              this.id_pt=this.pro.id_producto+1;

    }


    });

this.kardexpfS.ultimo_id().subscribe((data: Kardexpf)=>{
      this.kardPF = data;
      
//console.log(this.kardPF);


if(Object.entries(this.kardPF).length===0){
  
        this.id_kp=1;
                

      }else{
              
              this.id_kp=this.kardPF.id_kardex_productos+1;

    }

    });
//
  }


  public regresar(){
  this.regresarService.regresarValue(true);

}


generarCodigoBarra(): void {
// Generar un número aleatorio de 12 dígitos
let randomNumber = '';
for (let i = 0; i < 12; i++) {
  randomNumber += Math.floor(Math.random() * 10);
}

// Calcular el dígito de control utilizando el algoritmo de EAN-13
let sum = 0;
for (let i = 0; i < 12; i++) {
  sum += parseInt(randomNumber.charAt(i)) * (i % 2 === 0 ? 1 : 3);
}
let checkDigit = (10 - (sum % 10)) % 10;

// Combinar el número aleatorio con el dígito de control
let barcode = randomNumber + checkDigit;

console.log(barcode);

this.codigo=barcode;


  // Generar el código de barras utilizando JsBarcode
  JsBarcode('#barcode', this.codigo, {format: 'EAN13',
width:4,
  height:40,
});


}



//tallas
getTalla():void{
   this.tallaS.getAll().subscribe((data: Tallas[])=>{
      this.talla = data;
    });

}
      //

      //categoria
getCategoria():void{
  this.categoriasS.getAll().subscribe((data: Categorias[])=>{
      this.categorias = data;
       console.log(this.categorias);
    });

}
      //

  //color
getColor():void{
  this.colorS.getAll().subscribe((data: Color[])=>{
      this.color = data;
           
    });

}
      //



get f(){
    return this.form.controls;
  }

get fCol(){
    return this.formColor.controls;
  }
get fCat(){
    return this.formCategoria.controls;
  }
get fTall(){
    return this.formTalla.controls;
  }

submit(){
              this.form.patchValue({codigo_barra: this.codigo});
this.loading=true;
this.prodS.repetido2(this.form.get('id_cat').value, this.form.get('id_color').value, this.form.get('id_talla').value, this.form.get('nombre_producto').value ).subscribe((data: Productos)=>{
         this.cantidad5 = data;



           if(this.cantidad5>0){
                       this.loading=false;

            swal.fire('El producto: "'+ this.form.get('nombre_producto').value + '" ya existe ')

           }else{

    ///

 this.form.patchValue({codigo_barra: this.codigo});

this.prodS.repetido(this.form.get('codigo_barra').value).subscribe((data: Productos)=>{
         this.cantidad4 = data;



           if(this.cantidad4>0){
           this.barra=true;
            swal.fire('El codigo de barra: "'+ this.form.get('codigo_barra').value + '" ya existe, actualice el codigo')

           }else{

//formKardex

this.formKardex.patchValue({inv_inicialp: this.form.get('cantidad').value});

this.formKardex.patchValue({inv_finalp: this.form.get('cantidad').value});
this.formKardex.patchValue({descripcionp: 'Inventario Inicial'});



      this.formPfKar.patchValue({id_producto: this.id_pt});
this.formPfKar.patchValue({id_kardex_productos: this.id_kp});

////
console.log(this.form.value);
  this.prodS.create(this.form.value).subscribe(res => {


//kardex
this.kardexpfS.create(this.formKardex.value).subscribe(res=>{
 

this.pfKS.create(this.formPfKar.value).subscribe(res => {
});

});
//.......
 swal.fire('Exito...', 'Producto  registrado con exito!!', 'success');

  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo producto'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

      this.router.navigateByUrl('dashboard/listar-productos');

    });
}
});

//else producto repetido
}
});
}

//categoria
submit2(){
    this.loading2=true;

 this.categoriasS.repetido(this.formCategoria.get('categoria').value).subscribe((data: Categorias)=>{
         this.cantidad = data;



           if(this.cantidad>0){
            this.loading2=false;
           
            swal.fire('La categoria: "'+ this.formCategoria.get('categoria').value + '" ya existe ')

           }else{


this.categoriasS.create(this.formCategoria.value).subscribe(res => {

         console.log('Categoria creada con exito!');

this.formCategoria.reset();
 swal.fire('Exito...', 'Categoria registrada con exito!!', 'success');
this.getCategoria();
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva categoria de producto'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


    });
this.loading2=false;

this.formCategoria.reset();

}
});

}

submit3(){
    this.loading3=true;

      this.colorS.repetido(this.formColor.get('color').value).subscribe((data: Color)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading3=false;

            swal.fire('El color: "'+ this.formColor.get('color').value + '" ya existe ')

           }else{



this.colorS.create(this.formColor.value).subscribe(res => {

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
      acciones: 'Registro un nuevo color de producto'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


    });
this.loading3=false;

this.formColor.reset();

}

});
}

//talla
submit4(){
    this.loading4=true;

 this.tallaS.repetido(this.formTalla.get('talla').value).subscribe((data: Tallas)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading4=false;
            swal.fire('La talla: "'+ this.formTalla.get('talla').value + '" ya existe ')

           }else{


this.tallaS.create(this.formTalla.value).subscribe(res => {

         console.log('Talla creada con exito!');

this.formTalla.reset();
 swal.fire('Exito...', 'Talla registrada con exito!!', 'success');
       this.getTalla();
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva talla de producto'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
this.loading4=false;
this.formTalla.reset();


}
});

}





    limpiar(){
this.formCategoria.reset();
this.formTalla.reset();
this.formColor.reset();
}


ngOnDestroy(){
      this.regresarService.regresarmp(false);

  }

   // Validación personalizada
  customNumberValidator(control) {
    const value = control.value;
    if (value < 10) {
      return { 'invalidNumber': true };
    }
    return null;
  }

}
