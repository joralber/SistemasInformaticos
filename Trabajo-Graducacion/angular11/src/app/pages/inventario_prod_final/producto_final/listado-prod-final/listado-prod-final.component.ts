
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild,ElementRef, AfterViewInit  } from '@angular/core';

import {RegresarService} from '../../../inventarios/materiaprima/service/regresar.service';

import { ProductosTerminadosService } from '../services/productos-terminados.service';
import { ProductosTerminados } from '../productos_terminados';

import { CodigoEstiloService } from '../../../inventarios/estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../../inventarios/estilos/codigo-estilo';

import { KardexpfService } from '../../kardex_prod_final/services/kardexpf.service';
import { Kardexpf } from '../../kardex_prod_final/kardexpf';

import { PfkardexService } from '../../kardex_prod_final/services/pfkardex.service';
import { Pfkardex } from '../../kardex_prod_final/pfkardex';

import { TallaptService } from '../../tallas_prod_final/registro-tallas-prod/services/tallapt.service';
import { Tallapt } from '../../tallas_prod_final/registro-tallas-prod/tallapt';
import { ColorptService } from '../../color_prod_final/registro-color-prod/services/colorpt.service';
import { Colorpt } from '../../color_prod_final/registro-color-prod/colorpt';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';

import swal from'sweetalert2';

import * as JsBarcode from 'jsbarcode';

import { xmlserializer } from 'xmlserializer';

import * as htmlToImage from 'html-to-image';

import * as canvg from 'canvg';

import * as printJS from 'print-js';

import html2canvas from 'html2canvas';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

import { NotificacionPTSService } from '../../../../shared/header/notificacion-pts.service';

@Component({
  selector: 'app-listado-prod-final',
  templateUrl: './listado-prod-final.component.html',
  styleUrls: ['./listado-prod-final.component.css']
})
export class ListadoProdFinalComponent implements OnInit, OnDestroy, AfterViewInit {

      @ViewChild('inputValue') input; // acceder al elemento de referencia
 @ViewChild('inputValue2') input2; // acceder al elemento de referencia
  @ViewChild('barcode', { static: true }) barcode: ElementRef;
 @ViewChild('codigoBarrasSVG', { static: true }) codigoBarrasSVG: ElementRef;
  @ViewChild('codigoBarrasImagen', { static: true }) codigoBarrasImagen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;


    numero1: number=0;
  numero2: number=0;
  resultado: number=0;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
dtOptions: any = {};
  dtTrigger = new Subject();
prod:ProductosTerminados[]=[];
ptN:ProductosTerminados[]=[];
producto:ProductosTerminados;

codigoEst:CodigoEstilo;
talla:Tallapt;
color:Colorpt;

form:FormGroup;
 formKardex: FormGroup;
  formPfKar: FormGroup;


kardPF: Kardexpf;
pfKar: Pfkardex;
id_pt:number=0;
id_kp:number=0;
exis:number=0;
loading:boolean=false;
estilo:string;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
msj:boolean;
idPro:number;
  constructor(public regresarm: RegresarService,private prodS: ProductosTerminadosService,
              private codEst: CodigoEstiloService, private kardexpfS:KardexpfService, private pfKS:PfkardexService,
              private router: Router, private tallaS:TallaptService, private colorS: ColorptService, private bitacoraS:BitacoraService, 
              private loginS: LoginService, private notiS:NotificacionPTSService) { 
this.producto = new ProductosTerminados();
this.codigoEst=new CodigoEstilo();
this.talla=new Tallapt();
this.color=new Colorpt();
  }


 ngAfterViewInit() {
  }

  ngOnInit(): void {


    this.form= new FormGroup({

cantidad: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
cantidad2: new FormControl(''),


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

this.formPfKar = new FormGroup({
id_producto: new FormControl(''),
id_kardex_productos: new FormControl(''),
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

    this.getAll();
  }


getAll():void{
  this.prodS.getAll().subscribe((data: ProductosTerminados[])=>{
      this.prod = data;


            
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

get f(){
    return this.form.controls;
  }


///dar de baja

    deleteP(id_producto){

      swal.fire({
  title: 'Eliminar Producto Final?',
  text: "¿Estás seguro de eliminar el registro?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'SI!'
}).then((result) => {
  if (result.isConfirmed) {
     this.prodS.delete(id_producto).subscribe(res => {
         this.prod = this.prod.filter(item => item.id_producto !== id_producto);
         //console.log('Proveedor eliminado con éxito!');
                     //console.log(this.mp);
this.rerender();

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja un producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
        this.router.navigateByUrl('dashboard/listado-prod-final');


    });
    swal.fire(
      'Eliminado!',
      'El producto ha sido eliminado.',
      'success'
    )
  }
})






  }

agregarPF(id_producto){
    this.idPro=id_producto;
  this.msj=false;
      this.resultado=0;

 this.form.reset();

      // this.id_producto = this.route.snapshot.params['id_producto'];
    this.prodS.find(id_producto).subscribe((data: ProductosTerminados)=>{
      this.producto = data;


    this.codEst.find(this.producto.idcodigo_estilo).subscribe((data: CodigoEstilo)=>{
      this.codigoEst = data;




    });

    });

         // this.formMpKar.patchValue({id_mp: id_mp});

      this.formPfKar.patchValue({id_producto: id_producto});

   //ultmo id
this.ultimoid();

}

verCodigoBarras(id_producto){
   this.prodS.find(id_producto).subscribe((data: ProductosTerminados)=>{
      this.producto = data;

      //estilo
this.codEst.find(this.producto.idcodigo_estilo).subscribe((data: CodigoEstilo)=>{
      this.codigoEst = data;
    });
      //
   //talla
this.tallaS.find(this.producto.id_talla_pt).subscribe((data: Tallapt)=>{
      this.talla = data;
//color
this.colorS.find(this.producto.id_color_pt).subscribe((data: Colorpt)=>{
      this.color = data;

      this.generarCodigoBarra(this.producto.codigo_barra);
    });

    });
      //

    });

}

generarCodigoBarra(codigo): void {
   JsBarcode(this.codigoBarrasSVG.nativeElement, codigo, {
      format: 'EAN13',
      lineColor: '#000',
      width: 2,
      height: 40,
      displayValue: true,
        fontSize: 11 // Ajusta el tamaño del texto aquí

    });
this.imprimirCodigoBarras();
  
}


imprimirCodigoBarras(){

    // SVG del código de barras
  const codigoBarrasSVG = this.codigoBarrasSVG.nativeElement.outerHTML;

  // Convertir el SVG a una imagen
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const img = new Image();


  img.onload = () => {

    canvas.width = img.width;
    canvas.height = img.height;
  //context.font = '7px Arial'; // Ajusta el tamaño y la fuente según tus necesidades

    context.drawImage(img, 5, 10, canvas.width,  canvas.height );
     // Agregar el título
    this.estilo=this.codigoEst.estilo;
  // Agregar el título
  context.font = 'bold 8px arial'; // O utiliza una fuente estándar, por ejemplo: '18px Arial'
  context.textAlign = 'center';

  context.fillText('COLOR: '+this.color.nombre_color+' SIZE: '+this.talla.nombre_talla, canvas.width / 2, 18);

  context.fillText(this.estilo, canvas.width / 2, 8);

    const imagenBase64 = canvas.toDataURL('image/png');

    // Configuración de impresión
    const printOptions: printJS.Configuration = {
      printable: imagenBase64,
      type: 'image',
      maxWidth: 300,
    };

    // Imprimir la etiqueta
    printJS(printOptions);
/*
      // Crea un enlace de descarga
  const link = document.createElement('a');
  link.href = imagenBase64;
  link.download = this.estilo+'.png'; // Establece el nombre del archivo de descarga

  // Simula un clic en el enlace para iniciar la descarga
  link.click();
  */
  ///
  };
  img.src = 'data:image/svg+xml;base64,' + btoa(codigoBarrasSVG);





}



limpiarModal(){

    this.resultado=0;
        this.producto= new ProductosTerminados();

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







  public regresarmp(){
  this.regresarm.regresarmp(true);

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

ultimoid(){

    this.kardexpfS.ultimo_id().subscribe((data: Kardexpf)=>{
      this.kardPF = data;
      
console.log(this.kardPF);


if(Object.entries(this.kardPF).length===0){
  
        this.id_kp=1;

      this.formPfKar.patchValue({id_kardex_productos: this.id_kp});


      }else{
              
              this.id_kp=this.kardPF.id_kardex_productos+1;
      this.formPfKar.patchValue({id_kardex_productos: this.id_kp});

    }

    });

}

  submit(){
       this.loading=true;

    if(!isNaN(this.resultado)){
//this.formKardex.patchValue({inv_inicialp: this.form.get('cantidad').value});

this.formKardex.patchValue({entradasp: this.form.get('cantidad').value});
this.exis=parseFloat(this.form.get('cantidad').value) + this.producto.cantidad; 
this.formKardex.patchValue({inv_finalp: this.exis});
this.formKardex.patchValue({descripcionp: 'Entrada'});
//this.formKardex.patchValue({salidap: this.form.get('cantidad').value});
//this.formKardex.patchValue({inv_inicialp: this.form.get('cantidad').value});

//console.log(this.formKardex.value);
//console.log(this.formPfKar.value);
this.msj=false;
 this.prodS.agregarStock(this.producto.id_producto, this.resultado ).subscribe(res => {


  this.kardexpfS.create(this.formKardex.value).subscribe(res=>{
 

this.pfKS.create(this.formPfKar.value).subscribe(res => {
      this.notificacion();

});



});

   this.limpiarModal();
this.getAll();
     

 //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo stock en producto terminado'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
              swal.fire('Exito...', 'Se agregado el nuevo stock con exito!!', 'success');
              this.agregarPF(this.idPro);
              this.loading=false;

});
//fin bitacora



    });


}else{
    this.loading=false;
this.msj=true;
}
}



notificacion(){
    this.notiS.clearProducts();      
this.ptN=[];
      for(const m of this.prod){
        
             if(m.cantidad <= m.stock_minimo){
                      this.ptN.push(m);
                  }
        }

    this.notiS.addNotificationPT(this.ptN);

}
}
