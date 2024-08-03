import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { from } from 'rxjs';
import axios from 'axios';
import { Materiaprima } from '../../../inventarios/materiaprima/materiaprima';
import{ ReportesService } from '../../services/reportes.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-inventario-cat',
  templateUrl: './inventario-cat.component.html',
  styleUrls: ['./inventario-cat.component.css']
})
export class InventarioCatComponent implements OnInit {

select:number;
  mp:Materiaprima[]=[];
  categorias:any[]=[];

  constructor(private repS: ReportesService) { }

  ngOnInit(): void {

    this.repS.getAll().subscribe((data: any[])=>{
      this.categorias = data;
          });
  }


  changeSelect(){
      this.generateReport(this.select);

}



generateReport(id_categoria)  {
this.select=null;
  ///tabla

    this.repS.getAll2(id_categoria).subscribe((data: Materiaprima[]) => {
      this.mp = data;
    
if (this.mp.length === 0) {
              swal.fire('No existen datos con la cetegoría seleccionada!!');

}else{
const tableHeaders = ['Categoría', 'Medida', 'Color', 'Materiales'];

  const tableRows = this.mp.map(item => [item.nombre, item.medida, item.color, item.nombre_producto]);

  const table = {
  table: {
    headerRows: 1,
    widths: [90, 90, 90, 210], // Ajusta los anchos de las columnas según tus necesidades
    body: [
      tableHeaders.map(header => ({ text: header, style: 'tableHeader' })),
      ...tableRows,
    ],

  },


};


//
const categ="Yarda";
  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A. DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'INVENTARIO DE MATERIA PRIMA POR CATEGORIA.';
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
            { text: 'Listado de Materia Prima por Categoría' , fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
      table,
    ],
     defaultStyle: {
    fontSize: 11,
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
