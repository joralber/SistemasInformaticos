import { Component, EventEmitter, Input, OnInit,OnDestroy, Output, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../../auth/services/login.service';
import { BitacoraService } from '../../administracion/services/bitacora.service';
import { Usuarios } from '../../administracion/usuarios';
import swal from'sweetalert2';
import { Router } from '@angular/router';

import { ClienteService } from '../clientes/services/cliente.service';
import { Cliente } from '../clientes/cliente';
import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { Departamento } from '../clientes/departamento';
import { Municipio } from '../clientes/municipio';
import { ProductosService } from '../../inventarios/productos/services/productos.service';
import { Productos } from '../../inventarios/productos/productos';
import { VentasService } from '../services/ventas.service';
import { Venta } from '../venta';

import {IntercambioService} from '../clientes/services/intercambio.service';



@Component({
  selector: 'app-registrar-ventas',
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})
export class RegistrarVentasComponent implements OnInit, OnDestroy {

 fechaActual: string;
efe:boolean;
usuario:Usuarios;
usuario2:any;
user:string;
efectivo:number=0;
clientes:Cliente[]=[];
selectCli:number;
 formCli: FormGroup;
 formVen: FormGroup;
 loading:boolean;
 dpto:Departamento[]=[];
muni:Municipio[]=[];
  select:number;
///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
prod:Productos[]=[];
selectPro:number;

  productoSeleccionado: any = null;
  cantidad: number = 1;
  descuento: number = 0;
  productosSeleccionados: any[] = [];
  total: number = 0;
  msj:boolean;
  cambio:number=0;
  debe:number=0;
  cam:boolean;
  cam2:boolean;
  produc:Productos;
  agregar1:boolean;
  agregar2:boolean;
  inventarioDisponible:number;
  venta:Venta;
  numeroV:number;
 contador:number=0;
 contador2:number=0;
 registrar:boolean;
 msjclie:boolean;
 loading2:boolean;
  constructor(public regresarp: IntercambioService, private loginS: LoginService, public cliService: ClienteService, private bitacoraS:BitacoraService,
   private router: Router,  private prodS: ProductosService, private ventaS: VentasService) {
this.produc=new Productos();
                }

  ngOnInit(): void {
         // Crea una instancia de Date con la fecha y hora actual
    const fecha = new Date();
    // Asigna la fecha actual en formato ISO a la propiedad fechaActual del componente
    this.fechaActual = fecha.toISOString().substring(0, 10);
   
    this.usuario=this.loginS.userValue;
    this.usuario2=this.usuario['user']
    this.user=this.usuario2['name'];
this.getAll();
this.getAllPro();

        this.formVen = new FormGroup({
productoSeleccionado:new FormControl(''),
      cantidad: new FormControl(''),
      descuento: new FormControl('')

    });


//cliente
        this.formCli = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      dui: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$") ]),
      direccion:  new FormControl('', [ Validators.required]),
      telefono: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      id_municipio: new FormControl('', [ Validators.required]),
      id_departamento: new FormControl('', [ Validators.required])

    });

        this.getAllDPTO();

        //    //# venta
this.ventaS.ultimo_id().subscribe((data: Venta)=>{
      this.venta = data;

      if(Object.entries(this.venta).length===0){
    

        this.numeroV=1;
                //this.form.patchValue({idcodigo_estilo: this.id});


      }else{
           
              this.numeroV=this.venta.id_venta+1;



      }

    });
  }


getAll():void{
  this.cliService.getAll().subscribe((data: Cliente[])=>{
      this.clientes = data;
    });

}

getAllPro():void{
  this.prodS.getAll().subscribe((data: Productos[])=>{
      this.prod = data;
    });
}

 get fv(){
    return this.formVen.controls;
  }

agregarProducto() {
  if (this.productoSeleccionado && this.cantidad > 0) {
          this.msj=false;

this.efectivo=0;
this.cambio=0;
this.debe=0;
this.cam2=false;
this.cam=false
  const productoExistenteIndex = this.productosSeleccionados.findIndex(item => item.id_producto === this.productoSeleccionado.id_producto);
  console.log(productoExistenteIndex);
    if (productoExistenteIndex === -1) {
         this.inventarioDisponible = this.productoSeleccionado.cantidad;

      if (this.cantidad <= this.inventarioDisponible) {

    const importe = this.productoSeleccionado.precio_unitario * this.cantidad * (1 - this.descuento / 100);
    const productoAgregado = {
      id_producto:this.productoSeleccionado.id_producto,
      nombre: this.productoSeleccionado.nombre_producto,
    color: this.productoSeleccionado.color,
      talla: this.productoSeleccionado.talla,
categoria:this.productoSeleccionado.categoria,
      precio: this.productoSeleccionado.precio_unitario,
      cantidad: this.cantidad,
      descuento: this.descuento,
      importe: importe,
      id_venta:this.numeroV
    };
    
    this.productosSeleccionados.push(productoAgregado);
    this.actualizarTotal();
    this.efe=true;
    this.agregar1=false;

        // Restablece los campos
    this.productoSeleccionado = null;
    this.cantidad = 1;
    this.descuento = 0;
        } else {
        // La cantidad deseada supera el inventario disponible, puedes mostrar un mensaje de error.
        this.agregar1=true;
      }
     } else {
      // El producto ya existe en productosSeleccionados, puedes mostrar un mensaje o realizar otra acción.

      this.msj=true;
    }

    

  }
}

cambios(){
  if(this.efectivo>=this.total){
this.cambio=this.efectivo-this.total;
this.cam=true;
this.cam2=false;

  }else if(this.efectivo<this.total){

this.debe=this.total-this.efectivo;
this.cam=false;
this.cam2=true;

}

if(this.efectivo>=this.total){
this.registrar=true;
}else{
  this.registrar=false;
}
}





actualizarImporte(producto: any, index: number) {
    const producto2 = this.productosSeleccionados[index];
//    const inventarioDisponible = producto2.cantidad;

        this.prodS.find(producto2.id_producto).subscribe((data: Productos)=>{
      this.produc = data;

if(producto2.cantidad<=this.produc.cantidad)

{

  const cantidad = this.productosSeleccionados[index].cantidad;
  const descuento = this.productosSeleccionados[index].descuento;
  const precio = this.productosSeleccionados[index].precio;
  const importe = precio * cantidad * (1 - descuento / 100);
  
  this.productosSeleccionados[index].importe = importe;
  this.actualizarTotal();
  this.agregar2=false;
    this.efe=true;

}else {
      // La cantidad deseada supera el inventario disponible, puedes mostrar un mensaje de error.
  this.agregar2=true;
  this.efe=false;
    }
  
});
}

actualizarTotal() {
  this.total = this.productosSeleccionados.reduce((acc, producto) => acc + producto.importe, 0);
    this.efectivo=0;
  this.cambio=0;
  this.debe=0;
  this.cam2=false;
this.cam=false
          this.msj=false;

}

eliminarProducto(index: number) {
  if (index >= 0 && index < this.productosSeleccionados.length) {
    this.productosSeleccionados.splice(index, 1); // Elimina el producto del arreglo
    this.actualizarTotal();
  }
}


submit(){
        if(this.selectCli>=1)
{
  this.loading2=true;
  this.msjclie=false;

  var ven = {
          "total": this.total,
          "id_cliente": this.selectCli,
          "id": this.usuario2['id'],
          "efectivo":this.efectivo,
          "cambio":this.cambio
        }

        this.contador=this.productosSeleccionados.length;
        this.ventaS.create(ven).subscribe(res => { 
          console.log(this.productosSeleccionados);
          for(const deV of this.productosSeleccionados ){
          this.ventaS.createD(deV).subscribe(res=>{
            this.contador2++;
            console.log(this.contador2+' '+ this.contador);
            if(this.contador===this.contador2){
               //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva venta #: '+this.numeroV
    };

this.bitacoraS.create(detalle).subscribe(res => {
               swal.fire('Exito...', 'Venta registrada con exito!!', 'success');
     this.router.navigateByUrl('dashboard/listar-ventas');

});
//fin bitacora

            }

          });
      
  }
        },
        error => {
          this.loading=false;
           swal.fire('Error...', 'Error de conexion a la base de datos!!'+error, 'error');
          console.log(error);
        } );
}else{
this.msjclie=true;
this.loading2=false;
}

}
//cliente
 get f(){
    return this.formCli.controls;
  }

getAllDPTO():void{
  this.cliService.getAllDpeto().subscribe((data: Departamento[])=>{
      this.dpto = data;
  console.log(this.dpto);
    });

}

   getAllMuni(id_departamento): void {
    this.cliService.getAllMuni(id_departamento).subscribe((data: Municipio[]) => {
      this.muni = data;
      console.log(this.muni);
    });

  }
  changeSelect(){
       this.getAllMuni(this.formCli.get('id_departamento').value );

   }


submit2(){

    this.loading=true;

        this.cliService.create(this.formCli.value).subscribe(res => { 
          
       swal.fire('Exito...', 'Cliente registrado con exito!!', 'success');
       //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo cliente'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
  this.loading=false;
    this.formCli.reset();
  this.muni=[];
      this.getAll();
});
//fin bitacora

        },
        error => {
          this.loading=false;
           swal.fire('Error...', 'Error de conexion a la base de datos!!'+error, 'error');
          console.log(error);
        } );
  }


limpiar(){
  this.muni=[];
    this.formCli.reset();
}
  ngOnDestroy(){
      this.regresarp.intercambioValue(false);

  }
}
