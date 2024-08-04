import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

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


import { ActivatedRoute, Router } from '@angular/router';


import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';


import swal from'sweetalert2';


import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrls: ['./modificar-productos.component.css']
})
export class ModificarProductosComponent implements OnInit {

 @ViewChild('barcode') barcode: ElementRef;

 talla:Tallas[]=[];
 categorias: Categorias[]=[];

color:Color[]=[];

kx: Kardexpf[]=[];

  selectedEstilo:number;


producto:Productos;

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
  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;
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

  constructor(private tallaS: TallasService, private colorS:ColorService, private kxS: KardexpfService,
              private prodS: ProductosService, private categoriasS:CategoriasService,
              private router:Router, private route:ActivatedRoute, private bitacoraS:BitacoraService, private loginS: LoginService) {
this.producto=new Productos();
   }

  ngOnInit(): void {

           this.id_pf = this.route.snapshot.params['id_producto'];

    this.prodS.find(this.id_pf).subscribe((data: Productos)=>{
      this.producto = data;

this.generarCodigoBarra(this.producto.codigo_barra);



    });



    //comprobar si es mayor q uno
    this.prodS.repetido3(this.id_pf).subscribe((data: Productos)=>{
         this.numeroKX = data;



           if(this.numeroKX==1){
           this.stokKX=true;
           }
           });


this.barra=false;



      this.form = new FormGroup({
        nombre_producto:  new FormControl('', [ Validators.required, Validators.maxLength(50)]),
        id_talla:  new FormControl('', [ Validators.required]),
        id_color:  new FormControl('', [ Validators.required]),
        id_cat:  new FormControl('', [ Validators.required]),
        precio_unitario:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex), Validators.min(0.1), Validators.maxLength(11)]),
      cantidad:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+"),Validators.min(1), Validators.maxLength(10)]),
      codigo_barra:  new FormControl(''),
 estado:  new FormControl('')

  });


//categoria
         this.formCategoria = new FormGroup({
      categoria:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(50) ]),

    });

         //medida
           this.formTalla = new FormGroup({
talla:  new FormControl('', [ Validators.required, Validators.maxLength(8) ]),
    
    });

//color
              this.formColor = new FormGroup({
      color:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(50) ]),
      
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
   this.tallaS.getAll().subscribe((data: Tallas[])=>{
      this.talla = data;
    });
}
      //

      //categoria
getCategoria():void{
  this.categoriasS.getAll().subscribe((data: Categorias[])=>{
      this.categorias = data;
       
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

   swal.fire('Exito...', 'Producto  Modificadoo con exito!!', 'success');

      this.router.navigateByUrl('dashboard/listar-productos');

});
//
}
      //fin kardex

      //fin kardex
if(this.variable!=false){

    this.loading = false;
 swal.fire('Exito...', 'Producto  Modificado con exito!!', 'success');

   //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un producto '
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

      this.router.navigateByUrl('dashboard/listar-productos');
}
 

    });


}else{
      this.prodS.update( this.id_pf, this.form.value).subscribe(res => {
         swal.fire('Exito...', 'Producto  Modificado con exito!!', 'success');
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un producto '
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
      this.router.navigateByUrl('dashboard/listar-productos');
});
}
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
      acciones: 'Registro una nueva categoria de producto '
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
      acciones: 'Registro un nuevo color de producto '
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
      acciones: 'Registro una nueva talla de producto '
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




}
