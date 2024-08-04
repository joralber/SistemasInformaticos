import { Component, OnInit } from '@angular/core';
import{ ReporteService } from '../services/reporte.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import { DatePipe } from '@angular/common';

import swal from'sweetalert2';
@Component({
  selector: 'app-productomv',
  templateUrl: './productomv.component.html',
  styleUrls: ['./productomv.component.css']
})
export class ProductomvComponent implements OnInit {
 fechaI:Date;
  fechaF:Date;
  select:number=5;
listPF:any[]=[];
 productosRango:any[]=[];
  constructor(private repS: ReporteService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }




  generateReportEgresos(){
            this.repS.getProductoMV(this.fechaI, this.fechaF).subscribe((data: any[]) => {
      this.listPF = data;
if (this.listPF.length === 0) {
              swal.fire('No existen Datos!!');

}else{
const tableHeaders = ['Codigo Barras','Productos','# De Ventas'];
//    const productosRango = this.listPF.slice(0, this.select); // Obtener los primeros 5 proveedores

if(this.select==25){
this.productosRango=this.listPF;
}else if(this.select==5 || this.select==10 ||this.select==15 ||this.select==20){

    this.productosRango = this.listPF.slice(0, this.select); // Obtener los primeros 5 proveedores
}

  const tableRows = this.productosRango.map(item => [item.codigo_barra, item.categoria+'  =>  '+ item.nombre_producto+'  =>  '+item.color+'  =>  '+item.talla, item.nventa]);

  const table = {
  table: {
    headerRows: 1,
    widths: [170, 480,  90], // Ajusta los anchos de las columnas según tus necesidades
    body: [
      tableHeaders.map(header => ({ text: header, style: 'tableHeader' })),
      ...tableRows,
    ],
        layout: "lightHorizontalLines", // o "noBorders"

  },


};

//

  const companyName = 'VENTAS DE ARTICULOS DEPORTIVOS.';
    const companyName2 = 'TIENDA HENÁNDEZ';
  const direccion = 'COLONIA EL MILAGRO.';
  const phoneNumber = '2392-3228.';
  const reporte= 'PRODUCTOS MÁS VENDIDOS.';
 const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();
const formattedTime = currentDate.toLocaleTimeString();
   const logoImageUrl = 'assets/logo2.png';
const fechaI2 = this.datePipe.transform(this.fechaI, 'dd/MM/yyyy');
const fechaF2 = this.datePipe.transform(this.fechaF, 'dd/MM/yyyy');

  axios.get(logoImageUrl, { responseType: 'arraybuffer' }).then((response) => {
    const base64 = btoa(
      new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const dataURL = 'data:image/png;base64,' + base64;


  const headerContent = [
         { text: companyName, fontSize: 16, bold: true, alignment: 'center', margin: [20, 0, 0, 0] },

    {
    columns: [
      { image: dataURL, width: 100 },
          { text: companyName2, fontSize: 16, bold: true, alignment: 'center', margin: [0, 0, 75, 0] },

    ]
  },

  { columns: [
      { text: 'FECHA Y HORA: ' + formattedDate +', '+formattedTime+'.',fontSize: 12, bold: true, margin: [100, 10, 0, 5], alignment: 'left'  },
    {text: `REPORTE DE: ${reporte}`, fontSize: 12, bold: true, margin: [10, 10, 30, 5], alignment: 'center'}, 
    ]
  },
    { columns: [
  { text: `TELÉFONO: ${phoneNumber}`, fontSize: 12, bold: true, margin: [0, 0, 55, 5], alignment: 'center' },
    {text: `DIRECCIÓN: ${direccion}`, fontSize: 12, bold: true, margin: [10, 0, 0, 5], alignment: 'center'}, 
    ]
  },
  { text: '\n', margin: [0, 10, 0, 10] }

  ];

  const docDefinition = {
        pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [
         headerContent,
            { text: 'Productos Más Vendidos Del '+fechaI2+' Al '+fechaF2 ,fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },

      table,
    ],
     defaultStyle: {
    fontSize: 12,
 justified: {
      alignment: 'justify' // Justifica el texto
    }

  }, 
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    tableHeader: {
        fillColor: '##1e1e1e',
      color: '#FFFFFF',
      bold: true
    }
  },
          footer: function(currentPage, pageCount) {
    return { text: 'Página ' + currentPage.toString() + ' de ' + pageCount.toString(), alignment: 'center' };
  }
  };

  pdfMake.createPdf(docDefinition).open();
});
}

    });
  }

}

