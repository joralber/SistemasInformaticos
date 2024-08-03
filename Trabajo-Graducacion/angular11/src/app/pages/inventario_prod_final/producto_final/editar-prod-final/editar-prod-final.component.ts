import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

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

import { ActivatedRoute, Router } from '@angular/router';


import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { validarQueSeanMayor } from '../validator';


import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';


@Component({
  selector: 'app-editar-prod-final',
  templateUrl: './editar-prod-final.component.html',
  styleUrls: ['./editar-prod-final.component.css']
})
export class EditarProdFinalComponent implements OnInit  {
  @ViewChild('barcode') barcode: ElementRef;

 codigoE:CodigoEstilo[]=[];
 talla:Tallapt[]=[];
 categorias: Categoriapt[]=[];

color:Colorpt[]=[];

kx: Kardexpf[]=[];

  selectedEstilo:number;

  codigoEst: CodigoEstilo;
costo: CostoProduccion;
producto:ProductosTerminados;

form:FormGroup;
formCategoria: FormGroup;
  formColor: FormGroup;
  formTalla: FormGroup;
  formKardex: FormGroup;
  
  cantidad:any;
cantidad2:any;
cantidad3:any;
cantidad4:any;
cantidad5:any;


codigoes:string;
codigo:any;
barra:boolean;

id_pf:number;

existe:number;

ent:number=0;
sal:number=0;

variable:boolean;

  loading:boolean = false;
  loading2:boolean;
loading3:boolean;
loading4:boolean;

numeroKX:any;
stokKX:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;

  constructor( private codS: CodigoEstiloService, private costS:CostoproduccionService,
              private tallaS: TallaptService, private colorS:ColorptService, private kxS: KardexpfService,
              private prodS: ProductosTerminadosService, private categoriasS:CategoriaptService,
              private router:Router, private route:ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService) {
this.codigoEst=new CodigoEstilo();
this.costo=new CostoProduccion();
this.producto=new ProductosTerminados();
   }

  ngOnInit(): void {

           this.id_pf = this.route.snapshot.params['id_producto'];

    this.prodS.find(this.id_pf).subscribe((data: ProductosTerminados)=>{
      this.producto = data;

this.generarCodigoBarra(this.producto.codigo_barra);
//
console.log(this.producto.idcodigo_estilo)
      this.codS.find(this.producto.idcodigo_estilo).subscribe((data: CodigoEstilo)=>{
      this.codigoEst = data;

//      this.codigoes=this.codigoEst.codigo.toString().padStart(4, '0');
              this.form.patchValue({codigoest: this.codigoEst.codigo.toString().padStart(4, '0')});



    });

       this.costS.find2(this.producto.idcodigo_estilo).subscribe((data: CostoProduccion)=>{
      this.costo = data;

                  this.form.patchValue({id_costo_produccion:  this.costo.id_costo_produccion });

    });
    ///

    });



    //comprobar si es mayor q uno
    this.prodS.repetido3(this.id_pf).subscribe((data: ProductosTerminados)=>{
         this.numeroKX = data;



           if(this.numeroKX==1){
           this.stokKX=true;
           }
           });


this.barra=false;



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
 estado:  new FormControl(''),
        codigoest:  new FormControl('', [Validators.required]),


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
fechap: new FormControl(''),
inv_inicialp: new FormControl(''),
entradasp: new FormControl(''),
salidap: new FormControl(''),
inv_finalp: new FormControl(''),
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

    this.kardex(this.id_pf);
  }

  kardex(id_producto){
    this.kxS.getAll2(id_producto).subscribe((data: Kardexpf[]) => {
      this.kx = data;

});

  }




generarCodigoBarra(codigo): void {
 
  // Generar el código de barras utilizando JsBarcode
  JsBarcode('#barcode', codigo, {format: 'EAN13',
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

    this.loading = true;

    ///


if(this.numeroKX===1){

  this.prodS.update( this.id_pf, this.form.value).subscribe(res => {

this.variable=true;

      //modificar kardex
if(this.existe!=this.form.get('cantidad').value){
 this.variable=false;

        for (const k of this.kx) {

 this.formKardex.patchValue({descripcionp: k.descripcionp});
  this.formKardex.patchValue({fechap: k.fechap});


if(k.descripcionp ==='Inventario Inicial'){
    this.formKardex.patchValue({inv_inicialp: this.form.get('cantidad').value});
this.formKardex.patchValue({inv_finalp: this.form.get('cantidad').value});


    this.kxS.update(k.id_kardex_productos, this.formKardex.value).subscribe(res => {
});

}
else if(k.descripcionp==='Entrada'){

 this.formKardex.patchValue({inv_inicialp: ''});
 this.formKardex.patchValue({entradasp: k.entradasp});
//this.formKardex.patchValue({inv_finalp: this.form.get('cantidad').value});

//this.exis=parseFloat(this.form.get('cantidad').value) + this.materiaprima.cantidad; 

this.ent=parseFloat(this.formKardex.get('inv_finalp').value.toString()) + parseFloat(k.entradasp.toString()); 

this.formKardex.patchValue({inv_finalp: this.ent});


 this.kxS.update(k.id_kardex_productos, this.formKardex.value).subscribe(res => {
});
 
 this.formKardex.patchValue({entradasp: ''});

 
}else if(k.descripcionp==='Salida'){

 this.formKardex.patchValue({inv_inicialp: ''});
 this.formKardex.patchValue({entradasp: ''});
 this.formKardex.patchValue({salidap: k.salidap});
//this.formKardex.patchValue({inv_finalp: this.form.get('cantidad').value});

//this.exis=parseFloat(this.form.get('cantidad').value) + this.materiaprima.cantidad; 

this.sal=parseFloat(this.formKardex.get('inv_finalp').value.toString()) - parseFloat(k.salidap.toString()); 

this.formKardex.patchValue({inv_finalp: this.sal});


 this.kxS.update(k.id_kardex_productos, this.formKardex.value).subscribe(res => {
});
 
 this.formKardex.patchValue({salidap: ''});


}

}


//modificar cantidad pf

 this.prodS.agregarStock(this.id_pf, this.formKardex.get('inv_finalp').value ).subscribe(res => {
     
     this.loading = false;

   swal.fire('Exito...', 'Producto terminado Modificadoo con exito!!', 'success');

      this.router.navigateByUrl('dashboard/listado-prod-final');

});
//
}
      //fin kardex

      //fin kardex
if(this.variable!=false){

    this.loading = false;
 swal.fire('Exito...', 'Producto terminado Modificadoo con exito!!', 'success');

   //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

      this.router.navigateByUrl('dashboard/listado-prod-final');
}
 

    });


}else{
      this.prodS.update( this.id_pf, this.form.value).subscribe(res => {
         swal.fire('Exito...', 'Producto terminado Modificadoo con exito!!', 'success');
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
      this.router.navigateByUrl('dashboard/listado-prod-final');
});
}
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




}
