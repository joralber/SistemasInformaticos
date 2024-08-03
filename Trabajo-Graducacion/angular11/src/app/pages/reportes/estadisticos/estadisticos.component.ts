import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
import{ ReportesService } from '../services/reportes.service';
import{ Venta } from './venta';
import {CostoproduccionService} from '../../inventarios/costosproduccion/services/costoproduccion.service';
import {CostoProduccion} from '../../inventarios/costosproduccion/costo-produccion';

@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent implements OnInit {
ingresos:any[]=[];
 costoP:CostoProduccion[]=[];
  
  constructor(private repS: ReportesService, private costoS: CostoproduccionService) { }

  ngOnInit(): void {
  this.getAll();
  }


  getAll(){
     this.repS.geVentaFecha().subscribe((data: any[]) => {
      this.ingresos = data;  
  });
}

//indice de crecimiento
generarPDF() {

if (this.ingresos.length === 0) {
              swal.fire('No existen datos de ventas!!');
}else{
// Calcular los ingresos anuales sumando los montos de cada año
const ingresosAnuales = this.ingresos.reduce((total, ingreso) => {
//   ingreso.fecha = new Date(); // Asignar la fecha actual
  const año = new Date(ingreso.fecha).getFullYear();;

 // const año = ingreso.fecha.getFullYear();
  
  if (!total[año]) {
    total[año] = 0;
  }
  total[año] += parseFloat(ingreso.total);
  return total;
}, {});

// Calcular el índice de crecimiento de ventas para cada año promedio
const años = Object.keys(ingresosAnuales).sort();
const indicesCrecimiento = años.map((año, index) => {
  if (index === 0) {
    return 0; // No hay índice de crecimiento para el primer año
  } else {
    const ventasAnterior = ingresosAnuales[años[index - 1]];
    return ((ingresosAnuales[año] - ventasAnterior) / ventasAnterior) * 100;
  }
});


//
  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A. DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'ÍNDICE DE CRECIMIENTO DE VENTAS ANUAL PROMEDIO.';
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
  const tableHeaders = ['Año', 'Total de Ingresos', 'Índice de crecimiento (%)']; 

  const docDefinition = {
    content: [
      headerContent,
            { text: 'Total de Ingresos Anual y Crecimiento de Ventas' , fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
      { text: '\n' },
      {
        table: {
          headerRows: 1,
          widths: [100, 150, 220],
          body: [
      tableHeaders.map(header => ({ text: header, style: 'tableHeader' })),
            ...años.map((año, index) => [
              año,
              ingresosAnuales[año].toFixed(2),
              indicesCrecimiento[index].toFixed(2) +' %'
            ])
          ]
        }
      }
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
  }
  };
  pdfMake.createPdf(docDefinition).open();
  });
}

//  pdfMake.createPdf(docDefinition).download('tabla_ingresos.pdf');
}

//precio Estilos
generateReportPresEst()  {
  ///tabla

    this.costoS.getAll().subscribe((data: CostoProduccion[]) => {
      this.costoP = data;
if (this.costoP.length === 0) {
              swal.fire('No existen precios de estilos!!');
}else{
const tableHeaders = ['Código', 'Estilos', 'Venta a Consumidor Final', 'Venta a Mayoreo']; 

  const tableRows = this.costoP.map(item => [item.codigo.toString().padStart(4, '0'), item.estilo, '$'+item.total_iva_consumidorf,  '$'+item.total_iva_mayoreo]);

  const table = {
  table: {
    headerRows: 1,
    widths: ['auto', 220, 'auto', 'auto'], // Ajusta los anchos de las columnas según tus necesidades
    body: [
      tableHeaders.map(header => ({ text: header, style: 'tableHeader' })),
      ...tableRows,
    ],

  },


};


//
  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A. DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'PRECIO DE PRODUCCIÓN POR ESTILOS.';
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
            { text: 'Listado de Precios por Producción de Estilos' , fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
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