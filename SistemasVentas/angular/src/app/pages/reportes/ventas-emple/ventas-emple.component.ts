import { Component, OnInit } from '@angular/core';
import{ ReporteService } from '../services/reporte.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ventas-emple',
  templateUrl: './ventas-emple.component.html',
  styleUrls: ['./ventas-emple.component.css']
})
export class VentasEmpleComponent implements OnInit {


fechaI:Date;
  fechaF:Date;
  ventaEmpl:any[]=[];

  constructor(private repS: ReporteService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }
//precio Estilos
generateReportVentaZona()  {
  ///tabla

    this.repS.getVentaEm(this.fechaI, this.fechaF).subscribe((data: any[]) => {
      this.ventaEmpl = data;
      console.log(this.ventaEmpl);
if (this.ventaEmpl.length === 0) {
              swal.fire('No existen datos!!');
}else{
const tableHeaders = ['Empleados', 'Correo electrónicos', '# Ventas', 'Total De Ventas']; 


  const tableRows = this.ventaEmpl.map(item => [item.name, item.email, item.nventa, '$'+item.tventa]);

  const table = {
  table: {
    headerRows: 1,
    widths: [175, 170,'auto','auto'], // Ajusta los anchos de las columnas según tus necesidades
    body: [
      tableHeaders.map(header => ({ text: header, style: 'tableHeader' })),
      ...tableRows,
    ],

  },


};


//
  const companyName = 'VENTAS DE ARTICULOS DEPORTIVOS.';
    const companyName2 = 'TIENDA HENÁNDEZ';
  const direccion = 'COLONIA EL MILAGRO.';
  const phoneNumber = '2392-3228.';
  const reporte= 'VENTAS POR EMPLEADOS.';
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
      { text: 'FECHA Y HORA: ' + formattedDate +', '+formattedTime+'.',fontSize: 12, bold: true, margin: [38, 10, 0, 5], alignment: 'left'  },
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
    content: [
      headerContent,
            { text: 'Ventas Por Empleados Del '+fechaI2+' Al '+fechaF2, fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
      table,
    ],
     defaultStyle: {
    fontSize: 11,
    alignment: 'left', // Alinea el contenido de las celdas al centro


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


