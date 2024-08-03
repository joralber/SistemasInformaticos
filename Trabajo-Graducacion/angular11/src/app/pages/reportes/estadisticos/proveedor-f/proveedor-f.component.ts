import { Component, OnInit } from '@angular/core';
import{ ReportesService } from '../../services/reportes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
@Component({
  selector: 'app-proveedor-f',
  templateUrl: './proveedor-f.component.html',
  styleUrls: ['./proveedor-f.component.css']
})
export class ProveedorFComponent implements OnInit {
  fechaI:Date;
  fechaF:Date;
  select:number=5;
listP:any[]=[];
  constructor(private repS: ReportesService) { }

  ngOnInit(): void {
   // this.getAll();
  }




  generateReportEgresos(){
            this.repS.getProveedorF(this.fechaI, this.fechaF).subscribe((data: any[]) => {
      this.listP = data;
if (this.listP.length === 0) {
              swal.fire('No existen Datos!!');

}else{
const tableHeaders = ['Nombre', 'Teléfono', 'Correo', '# de Compras'];
console.log(this.select)
    const proveedoresSubconjunto = this.listP.slice(0, this.select); // Obtener los primeros 5 proveedores


  const tableRows = proveedoresSubconjunto.map(item => [item.nombre, item.celular, item.email, item.ncompra]);

  const table = {
  table: {
    headerRows: 1,
    widths: [195,'auto', 150, 80], // Ajusta los anchos de las columnas según tus necesidades
    body: [
      tableHeaders.map(header => ({ text: header, style: 'tableHeader' })),
      ...tableRows,
    ],
        layout: "lightHorizontalLines", // o "noBorders"

  },


};

//
  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A. DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'PROVEEDORES MAS FRECUENTES.';
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();
const formattedTime = currentDate.toLocaleTimeString();

   const logoImageUrl = 'assets/logo1.png';

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
            { text: 'Proveedores más Frecuentes del '+this.fechaI+' al '+this.fechaF ,fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },

      table,
    ],
     defaultStyle: {
    fontSize: 12,
    alignment: 'center', // Alinea el contenido de las celdas al centro


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
