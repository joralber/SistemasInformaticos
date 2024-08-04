import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import { VentasService } from '../services/ventas.service';
import { Venta } from '../venta';
import { DetalleVenta } from '../detalle-venta';
import { UsuariosService } from '../../administracion/services/usuarios.service';
import { Usuarios } from '../../administracion/usuarios';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';
import { IntercambioService }  from '../clientes/services/intercambio.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {
   @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();

venta:Venta[]=[];
detalleV:DetalleVenta[]=[];
ven:Venta;
use:Usuarios;
  constructor(public regresarp: IntercambioService, private ventaS: VentasService, private useS:UsuariosService) { 
this.ven=new Venta();
 this.use=new Usuarios();
  }

  ngOnInit(): void {
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

public regresarpr(){
  this.regresarp.intercambioValue(true);

}
getAll():void{
  this.ventaS.getAll().subscribe((data: Venta[])=>{
      this.venta = data;
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


ver(id_venta){
this.ventaS.getAllDetalle(id_venta).subscribe((data: DetalleVenta[])=>{
this.detalleV=data;

});

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

  salir(){
  this.detalleV=[];
  
}


generateTicket(id_venta) {
  this.ventaS.getAllDetalle(id_venta).subscribe((data: DetalleVenta[])=>{
this.detalleV=data
  this.ventaS.find(id_venta).subscribe((data: Venta)=>{
this.ven=data
  this.useS.find(this.ven.id).subscribe((data: Usuarios)=>{
this.use=data

this.generarTicket3(this.detalleV, this.ven, this.use );
});
});
});
}


generarTicket3(productos, venta, user) {
     const currentDate = new Date();

const formattedDate = currentDate.toLocaleDateString();
const formattedTime = currentDate.toLocaleTimeString();
          productos.forEach(producto => {
  const importe = producto.precio_unitario * producto.cantidad * (1 - producto.descuento / 100);
  producto.imported = importe.toFixed(2);
});
//// Define el documento PDF
const documentDefinition = {
  content: [
    // Título
    { text: 'TIENDA HENÁNDEZ', style: 'header' },

    { text: 'GIRO ACTIVIDAD EOONOMICA:', style: 'header' },
    { text: 'VENTA DE ARTICULOS DEPORTIVOS', style: 'header' },
    { text: 'COLONIA EL MILAGRO , SAN VICENTE, SAN VICENTE', style: 'header' },
    { text: 'CORREO: tiendaherndez@gmail.com', style: 'header' },
    { text: 'TELÉFONO: 2393-3228', style: 'header' },
    { text: `VENDEDOR: ${user.name}`, style: 'header' },
{ text: `TIQUETE No: ${venta.id.toString().padStart(5, '0')}`, style: 'header' },


    // Espacio en blanco
    '\n',
    // Tabla de productos
    {
      table: {
        widths: ['*', 'auto', 'auto', 'auto'], // Ancho de las columnas
        body: [
          // Encabezados de la tabla
          ['Nombre del Producto', 'Cantidad', 'Precio.U', 'Sub-Total'],
          // Filas de productos

          ...productos.map(producto => [producto.nombre_producto+' '+producto.color+' #'+producto.talla, producto.cantidad,      [
          '$'+producto.precio_unitario,
          producto.descuento > 0 ? 'Desc: - $' + (producto.cantidad* producto.precio_unitario) * (producto.descuento/100) : '', // Agregar "Descuento" solo si el descuento es mayor que 0
        ],'$'+ producto.imported]),
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return 0; // Elimina los bordes horizontales
        },
        vLineWidth: function (i, node) {
          return 0; // Elimina los bordes verticales
        },
      },
    },
    // Espacio en blanco
    '\n',
    // Total
    {
       text: `Total: $${venta.total}`, 
       style: 'subheader' ,
       alignment: 'right',
             margin: [0, 0, 0, 0], // Sin margen inferior

    },
    {
      text: `Efectivo: $${venta.efectivo}`, 
       style: 'subheader' ,
       alignment: 'right',
             margin: [0, 0, 0, 0], // Sin margen inferior

    },
    {
       text: `Cambio: $${venta.cambio}`, 
       style: 'subheader' ,
       alignment: 'right',
             margin: [0, 0, 0, 0], // Sin margen inferior

    },
    // Mensaje de agradecimiento
    {
      text: '¡Gracias por su compra!',
      style: 'thanks',
      alignment: 'center',
    },
    {
      text: formattedDate +'       '+formattedTime,
      style: 'thanks',
      alignment: 'center',
       margin: [0, 0, 0, 0],
    },
  ],
  styles: {
    header: {
      fontSize: 14,
      bold: true,
      alignment: 'center',
    },
    thanks: {
      fontSize: 14,
      italics: true,
    },
        subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
  },
};


// Genera el PDF
const pdfDoc = pdfMake.createPdf(documentDefinition);

// Abre el PDF en una nueva pestaña del navegador
pdfDoc.open();


}



}
