import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import { VentasService } from '../services/ventas.service';
import { Venta } from '../venta';
import { DetalleVenta } from '../detalle-venta';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tiket',
  templateUrl: './tiket.component.html',
  styleUrls: ['./tiket.component.css']
})
export class TiketComponent implements OnInit {
detalleV:DetalleVenta[]=[];
 products = [
  { name: 'Producto 1', description: 'Descripción del producto 1', price: 50.00 },
  { name: 'Producto 2', description: 'Descripción del producto 2', price: 30.00 },
  { name: 'Producto 3', description: 'Descripción del producto 3', price: 20.00 },
];

  constructor(private ventaS: VentasService) { }

  ngOnInit(): void {
    this.generateTicket(this.products);

 //   this.ver(1);
  //this.tiket();
  //this.generarTicket();
 //this.imprimirTicket();
  }


generateTicket(products: any[]) {
  const productLines = products.map((product, index) => {
    return `${index + 1}. ${product.name}: ${product.description}`;
  });

  const total = products.reduce((sum, product) => sum + product.price, 0);

  const docDefinition = {
    content: [
  'TICKET DE VENTA',
  'TICKET DE VENTA',

    '-------------------------',
      ...productLines,
      { text: `Total: $${total.toFixed(2)}`, style: 'subheader' },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  pdfMake.createPdf(docDefinition).open();
}
tiket(){

const detalleVenta = [
  { producto: 'Producto 1', cantidad: 2, precioUnitario: 10.00, total: 20.00 },
  { producto: 'Producto 2', cantidad: 1, precioUnitario: 15.00, total: 15.00 },
  // Agrega más detalles aquí si es necesario
];


const ticketData = {
  content: [
    'TICKET DE VENTA',
    '-------------------------',
    {
      text: 'Producto: Zapatos',
      fontSize: 16,
      bold: true,
    },
    'Precio: $50.00',
    'Cantidad: 2',
    'Total: $100.00',
    '-------------------------',
    {
      text: 'Gracias por su compra!',
      fontSize: 14,
      bold: true,
    },
  ],
};

const pdfDoc = pdfMake.createPdf(ticketData);
pdfDoc.open();

}

 imprimirTicket() {
    window.print();
  }

ver(id_venta){
this.ventaS.getAllDetalle(id_venta).subscribe((data: DetalleVenta[])=>{
this.detalleV=data;

});

}
}
