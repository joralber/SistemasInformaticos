
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild,ElementRef, AfterViewInit  } from '@angular/core';

import {RegresarService} from '../../regresar.service';
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



import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';

import swal from'sweetalert2';



import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit, OnDestroy {

      @ViewChild('inputValue') input; // acceder al elemento de referencia
 @ViewChild('inputValue2') input2; // acceder al elemento de referencia

    numero1: number=0;
  numero2: number=0;
  resultado: number=0;

 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
dtOptions: any = {};
  dtTrigger = new Subject();
prod:Productos[]=[];
ptN:Productos[]=[];
producto:Productos;

talla:Tallas;
color:Color;

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
  constructor(public regresarm: RegresarService,private prodS: ProductosService,
               private kardexpfS:KardexpfService, private pfKS:PfkardexService,
              private router: Router, private tallaS:TallasService, private colorS: ColorService, private bitacoraS:BitacoraService, 
              private loginS: LoginService) { 
this.producto = new Productos();
this.talla=new Tallas();
this.color=new Color();
  }




  ngOnInit(): void {


    this.form= new FormGroup({

cantidad: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+"), Validators.maxLength(10)]),
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
        ]
    };

    this.getAll();
  }


getAll():void{
  this.prodS.getAll().subscribe((data: Productos[])=>{
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
  title: 'Eliminar Producto?',
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
      acciones: 'Dio de baja un producto '
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
        this.router.navigateByUrl('dashboard/listar-productos');


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
    this.prodS.find(id_producto).subscribe((data: Productos)=>{
      this.producto = data;


    });

         // this.formMpKar.patchValue({id_mp: id_mp});

      this.formPfKar.patchValue({id_producto: id_producto});

   //ultmo id
this.ultimoid();

}



limpiarModal(){

    this.resultado=0;
        this.producto= new Productos();

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
      acciones: 'Registro un nuevo stock en producto '
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



}
