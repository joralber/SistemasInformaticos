import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import * as JsBarcode from 'jsbarcode';

import { CodigoEstiloService } from '../../../inventarios/estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../../inventarios/estilos/codigo-estilo';

import {CostoproduccionService} from '../../../inventarios/costosproduccion/services/costoproduccion.service';
import {CostoProduccion} from '../../../inventarios/costosproduccion/costo-produccion';

import { TallaptService } from '../../tallas_prod_final/registro-tallas-prod/services/tallapt.service';
import { Tallapt } from '../../tallas_prod_final/registro-tallas-prod/tallapt';

import { ColorptService } from '../../color_prod_final/registro-color-prod/services/colorpt.service';
import { Colorpt } from '../../color_prod_final/registro-color-prod/colorpt';

import { CategoriaptService } from '../../categoria_prod_final/registro-cate-prod/services/categoriapt.service';
import { Categoriapt } from '../../categoria_prod_final/registro-cate-prod/categoriapt';

import { ProductosTerminadosService } from '../services/productos-terminados.service';
import { ProductosTerminados } from '../productos_terminados';

import { KardexpfService } from '../../kardex_prod_final/services/kardexpf.service';
import { Kardexpf } from '../../kardex_prod_final/kardexpf';

import { PfkardexService } from '../../kardex_prod_final/services/pfkardex.service';
import { Pfkardex } from '../../kardex_prod_final/pfkardex';


import { Router } from '@angular/router';


import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { validarQueSeanMayor } from '../validator';

import {RegresarService} from '../../../inventarios/materiaprima/service/regresar.service';

import swal from'sweetalert2';

import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-registro-prod-final',
  templateUrl: './registro-prod-final.component.html',
  styleUrls: ['./registro-prod-final.component.css'],

})
export class RegistroProdFinalComponent implements OnInit, OnDestroy {
  @ViewChild('barcode') barcode: ElementRef;

 codigoE:CodigoEstilo[]=[];
 talla:Tallapt[]=[];
 categorias: Categoriapt[]=[];

color:Colorpt[]=[];

  selectedEstilo:number;

  codigoEst: CodigoEstilo;
costo: CostoProduccion;
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

pro:ProductosTerminados;

id_pt:number=0;
id_kp:number=0;

loading:boolean;
loading2:boolean;
loading3:boolean;
loading4:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
codigoEAN13:any;
  constructor(private toastr: ToastrService, public regresarService: RegresarService,
   private codS: CodigoEstiloService, private costS:CostoproduccionService,
              private tallaS: TallaptService, private colorS:ColorptService,
              private prodS: ProductosTerminadosService,
               private categoriasS:CategoriaptService,
               private kardexpfS:KardexpfService, private pfKS:PfkardexService,
              private router:Router, private bitacoraS:BitacoraService, private loginS: LoginService) {
this.codigoEst=new CodigoEstilo();
this.costo=new CostoProduccion();
   this.pfKar= new Pfkardex();
this.kardPF=new Kardexpf();
this.pro=new ProductosTerminados();
   }

  ngOnInit(): void {


this.barra=false;

this.generarCodigoBarra();


      this.form = new FormGroup({
        idcodigo_estilo:  new FormControl('', [Validators.required]),
        id_costo_produccion:  new FormControl('', [Validators.required]),
        nombre_producto:  new FormControl('', [ Validators.required]),
        total_iva_mayoreo:  new FormControl('', [ Validators.required]),
        total_iva_consumidorf:  new FormControl('', [ Validators.required]),
        id_talla_pt:  new FormControl('', [ Validators.required]),
        id_color_pt:  new FormControl('', [ Validators.required]),
        id_cat_pt:  new FormControl('', [ Validators.required]),
      cantidad:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
      stock_minimo:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
 codigo_barra:  new FormControl('', [Validators.required]),


    },
  {
    validators: validarQueSeanMayor,
  });


//categoria
         this.formCategoria = new FormGroup({
      nombre_cat:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),

    });

         //medida
           this.formTalla = new FormGroup({
nombre_talla:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
    
    });

//color
              this.formColor = new FormGroup({
      nombre_color:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      
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

//estilo
this.getCodigoAll();


     //ultim id
this.prodS.ultimo_id().subscribe((data: ProductosTerminados)=>{
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
   this.tallaS.getAll().subscribe((data: Tallapt[])=>{
      this.talla = data;
    });
}
      //

      //categoria
getCategoria():void{
  this.categoriasS.getAll().subscribe((data: Categoriapt[])=>{
      this.categorias = data;
       
    });

}
      //

  //color
getColor():void{
  this.colorS.getAll().subscribe((data: Colorpt[])=>{
      this.color = data;
           
    });

}
      //

//estilo

  getCodigoAll():void{
    //this.detalleForm.reset();  

  this.codS.getAll().subscribe((data: CodigoEstilo[])=>{
      this.codigoE = data;
       

    });


}

selecCodigo(){
      console.log(this.form.get('idcodigo_estilo').value);

      this.codS.find(this.form.get('idcodigo_estilo').value).subscribe((data: CodigoEstilo)=>{
      this.codigoEst = data;

//                   this.form.patchValue({idcodigo_estilo: });

    });

       this.costS.find2(this.form.get('idcodigo_estilo').value).subscribe((data: CostoProduccion)=>{
      this.costo = data;

      //console.log(this.costo);
    //  console.log(this.costo.id_costo_produccion);

                  this.form.patchValue({id_costo_produccion:  this.costo.id_costo_produccion });

    });


       this.form.patchValue({codigo_barra: this.codigo});


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
get fTall(){
    return this.formTalla.controls;
  }

submit(){
this.loading=true;
this.prodS.repetido2(this.form.get('id_cat_pt').value, this.form.get('id_color_pt').value, this.form.get('id_talla_pt').value, this.form.get('idcodigo_estilo').value ).subscribe((data: ProductosTerminados)=>{
         this.cantidad5 = data;



           if(this.cantidad5>0){
                       this.loading=false;

            swal.fire('El producto: "'+ this.codigoEst.estilo + '" ya existe ')

           }else{

    ///

 this.form.patchValue({codigo_barra: this.codigo});

this.prodS.repetido(this.form.get('codigo_barra').value).subscribe((data: ProductosTerminados)=>{
         this.cantidad4 = data;



           if(this.cantidad4>0){
           this.barra=true;
            swal.fire('El codigo de barra: "'+ this.form.get('codigo_barra').value + '" ya existe, actualice el codigo')

           }else{

//formKardex

this.formKardex.patchValue({inv_inicialp: this.form.get('cantidad').value});

this.formKardex.patchValue({inv_finalp: this.form.get('cantidad').value});
this.formKardex.patchValue({descripcionp: 'Inventario Inicial'});
//this.formKardex.patchValue({entradasp: this.form.get('cantidad').value});
//this.formKardex.patchValue({salidap: this.form.get('cantidad').value});
//this.formKardex.patchValue({inv_inicialp: this.form.get('cantidad').value});


      this.formPfKar.patchValue({id_producto: this.id_pt});
this.formPfKar.patchValue({id_kardex_productos: this.id_kp});

////

  this.prodS.create(this.form.value).subscribe(res => {


//kardex
this.kardexpfS.create(this.formKardex.value).subscribe(res=>{
 

this.pfKS.create(this.formPfKar.value).subscribe(res => {
});

});
//.......
 swal.fire('Exito...', 'Producto terminado registrado con exito!!', 'success');

  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

      this.router.navigateByUrl('dashboard/listado-prod-final');

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

 this.categoriasS.repetido(this.formCategoria.get('nombre_cat').value).subscribe((data: Categoriapt)=>{
         this.cantidad = data;



           if(this.cantidad>0){
            this.loading2=false;
           
            swal.fire('La categoria: "'+ this.formCategoria.get('nombre_cat').value + '" ya existe ')

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
      acciones: 'Registro una nueva categoria de producto terminado'
      // Agrega aquí otros campos si es necesario
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

      this.colorS.repetido(this.formColor.get('nombre_color').value).subscribe((data: Colorpt)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading3=false;

            swal.fire('El color: "'+ this.formColor.get('nombre_color').value + '" ya existe ')

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
      acciones: 'Registro un nuevo color de producto terminado'
      // Agrega aquí otros campos si es necesario
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

 this.tallaS.repetido(this.formTalla.get('nombre_talla').value).subscribe((data: Tallapt)=>{
         this.cantidad = data;



           if(this.cantidad>0){
           this.loading4=false;
            swal.fire('La talla: "'+ this.formTalla.get('nombre_talla').value + '" ya existe ')

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
      acciones: 'Registro una nueva talla de producto terminado'
      // Agrega aquí otros campos si es necesario
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


  checarSiEsMayor(): boolean {
    return this.form.hasError('noesMayor') &&
      this.form.get('cantidad').dirty &&
      this.form.get('stock_minimo').dirty;
  }


    limpiar(){
this.formCategoria.reset();
this.formTalla.reset();
this.formColor.reset();
}


ngOnDestroy(){
      this.regresarService.regresarmp(false);

  }

}
