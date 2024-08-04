import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { from } from 'rxjs';
import axios from 'axios';
import{ ReporteService } from '../services/reporte.service';
import swal from'sweetalert2';
import { CategoriasService } from '../../inventarios/categorias/services/categorias.service';
import { Categorias } from '../../inventarios/categorias/categorias';

@Component({
  selector: 'app-ventas-categ',
  templateUrl: './ventas-categ.component.html',
  styleUrls: ['./ventas-categ.component.css']
})
export class VentasCategComponent implements OnInit {


select:number;
  mp:any[]=[];
  categorias:Categorias[]=[];

  constructor(private repS: ReporteService, private catS: CategoriasService) { }

  ngOnInit(): void {

    this.catS.getAll().subscribe((data: Categorias[])=>{
      this.categorias = data;
          });
  }


  changeSelect(){
    console.log(this.select);
      this.generateReport(this.select);

}



generateReport(id_categoria)  {
this.select=null;
  ///tabla

    this.repS.getVentaC(id_categoria).subscribe((data: any[]) => {
      this.mp = data;
    
if (this.mp.length === 0) {
              swal.fire('No existen datos con la cetegoría seleccionada!!');

}else{
const tableHeaders = ['Categorías', 'Nombres Del Producto','Colores', '# Tallas', '# De Ventas'];

  const tableRows = this.mp.map(item => [item.categoria, item.nombre_producto, item.color, item.talla, item.nventa]);

  const table = {
  table: {
    headerRows: 1,
    widths: [95, 135, 90, 90,'auto'], // Ajusta los anchos de las columnas según tus necesidades
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
  const reporte= 'VENTAS POR CATEGORÍAS.';
 const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();
const formattedTime = currentDate.toLocaleTimeString();
   const logoImageUrl = 'assets/logo2.png';


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
            { text: 'Ventas Por Categorías' , fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
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
