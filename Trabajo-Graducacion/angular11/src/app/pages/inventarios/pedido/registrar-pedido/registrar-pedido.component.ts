import {Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {RegresarService} from '../../materiaprima/service/regresar.service';

import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../pedido';

import { DetalleEstiloService } from '../services/detalle-estilo.service';
import { DetalleEstilo } from '../detalle-estilo';

import { KardexmpService } from '../../../kardex-mat-prima/services/kardexmp.service';
import { Kardexmp } from '../../../kardex-mat-prima/kardexmp';

import { MpkardexService } from '../../../kardex-mat-prima/services/mpkardex.service';
import { Mpkardexmp } from '../../../kardex-mat-prima/mpkardexmp';

import { MateriaprimaService } from '../../materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../materiaprima/materiaprima';

import swal from'sweetalert2';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css']
})
export class RegistrarPedidoComponent implements OnInit {
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();


 fechaActual: string;

pedido:Pedido;

myArray=[];

numero_pedido:number;

loading:boolean;

mp2:Materiaprima[]=[];
 n:Materiaprima[]=[];

descripcion:string="";

form:FormGroup;
formKardex:FormGroup;
formMpKar:FormGroup;

exisInv:number;
idk:number;
idk2:number;

kardexmp:Kardexmp;

 contador:number = 0;
 bandera:boolean=true;

bandera3:number=0;
bandera4:number=0;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public regresarService: RegresarService, private pedS: PedidoService, 
              private detalleES: DetalleEstiloService, private mpserv: MateriaprimaService,
             private mpKS:MpkardexService, private kadexmS:KardexmpService, private router: Router, private bitacoraS:BitacoraService, private loginS: LoginService) {
this.pedido=new Pedido()
this.kardexmp= new Kardexmp();
//this.mpkardex=new Mpkardexmp();
  }


 

  ngOnInit(): void {

this.form = new FormGroup({
numero_pedido: new FormControl(''),
descripcion: new FormControl(''),
//id_mp: new FormControl(''),
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


//ultimoid
 this.kadexmS.obtenerUltimoId().subscribe((data: number)=>{
      this.idk = data;      


  });
//fin

        // Crea una instancia de Date con la fecha y hora actual
    const fecha = new Date();
    // Asigna la fecha actual en formato ISO a la propiedad fechaActual del componente
    this.fechaActual = fecha.toISOString().substring(0, 10);

    //# Pedido
this.pedS.ultimo_id().subscribe((data: Pedido)=>{
      this.pedido = data;

      if(Object.entries(this.pedido).length===0){
    

        this.numero_pedido=1;
                //this.form.patchValue({idcodigo_estilo: this.id});


      }else{
           
              this.numero_pedido=this.pedido.numero_pedido+1;



      }

    });

  

   this.dtOptions = {
      pagingType: 'full_numbers',
      "paging": false,
        "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },
  processing: true,
  
        dom: 'Bfrtip',
        buttons: [
        ]
    };

//listado de materia
this.getMP();

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

 get f(){
    return this.form.controls;
  }

submit(){
  this.loading=true;
this.form.patchValue({numero_pedido: this.numero_pedido});
this.form.patchValue({descripcion: this.descripcion});

 const productosSeleccionados = this.mp2.filter(producto => producto.cantidad2 > 0 && producto.cantidad2 <= producto.cantidad);
    productosSeleccionados.forEach(producto => {
      if (producto.cantidad2 > producto.cantidad) {
        producto.mensaje = 'Stock insuficiente';
      } else {
        producto.mensaje = '';
      }

      // Lógica para enviar los productos seleccionados

    });
if(productosSeleccionados.length!==0){
    //console.log(productosSeleccionados);
 this.myArray = productosSeleccionados.map(item => ({...item, idpedido: this.numero_pedido}));

//console.log(this.form.value);
//pedido
this.pedS.create(this.form.value).subscribe(res => {
  this.bandera3=this.myArray.length;
  console.log(this.bandera3);
  //detalle pedido
for(const dp of this.myArray){


this.detalleES.create(dp).subscribe(res => {

//kardex
this.formKardex.patchValue({descripcion: 'Salida'});
this.formKardex.patchValue({salida: dp['cantidad2']});
//this.formKardex.patchValue({inv_inicial: this.form.get('cantidad').value});
this.exisInv=parseFloat(dp['cantidad']) - parseFloat(dp['cantidad2']); 
this.formKardex.patchValue({inv_final: this.exisInv});
//
//this.formMpKar.patchValue({id_kardex: this.kardexmp.id_kardex});


this.kadexmS.create(this.formKardex.value).subscribe(res=>{
//MP KARDEX
this.idk++;

  this.formMpKar.patchValue({id_mp: dp['id_mp']});
  this.formMpKar.patchValue({id_kardex: this.idk});


  this.mpKS.create(this.formMpKar.value).subscribe(res => {
    //updatr mp

this.contador=parseFloat(dp['cantidad']) - parseFloat(dp['cantidad2']);

 this.mpserv.agregarStock(dp.id_mp, this.contador ).subscribe(res => {
this.bandera4++;
console.log(this.bandera4)
if(this.bandera3===this.bandera4){
   swal.fire('Exito...', 'Pedido de materiales registrado con exito!!', 'success');
//this.router.navigate(['/articulo'], { queryParams: { id: 123 } });

  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo pedido de materiales'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
      //this.router.navigateByUrl('dashboard/listado-pedido');
     this.router.navigateByUrl('dashboard/listado-pedido?id=true');

    }
});
    //fin update
});
  //fin mp kardex

});
  //fin kardex


});
//fin detalle pedido
}
  //fin for


});
//fin pedido

}else{
            swal.fire('Agrege la cantidad de materiales');
this.loading=false;
}

}






 ngOnDestroy(){
      this.regresarService.regresarValue(false);

  }


}
