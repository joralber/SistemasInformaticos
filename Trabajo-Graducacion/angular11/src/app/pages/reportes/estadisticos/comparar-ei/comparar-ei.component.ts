import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
import{ ReportesService } from '../../services/reportes.service';
import{ Venta } from '../venta';

@Component({
  selector: 'app-comparar-ei',
  templateUrl: './comparar-ei.component.html',
  styleUrls: ['./comparar-ei.component.css']
})
export class CompararEIComponent implements OnInit {
@ViewChild('barChart', { static: true }) barChart: ElementRef;

  private chart: Chart;

ingresos:any[]=[];
egresos:any[]=[];
select:string='';
m:boolean;
a:boolean;

  constructor(private repS: ReportesService) { }

  ngOnInit(): void {

  }



  changeSelect(){
      if(this.select==='MES'){

        this.a=false;
        this.m=true;

          this.generateComparisonBarChart();
        }if(this.select==='AÑO'){
      this.m=false;
      this.a=true;
this.generateBarChartAnual();

        }

}


generateComparisonBarChart() {
      this.repS.geVentaFecha().subscribe((data2: any[]) => {
      this.ingresos = data2;
      //
   this.repS.geCompraFecha().subscribe((data3: any[]) => {
      this.egresos = data3;

const fechaActual = new Date();
const ultimoMes = fechaActual.getUTCMonth();
const ultimoAnio = fechaActual.getUTCFullYear();
const meses = [];
const montosIngresos = [];
const montosEgresos = [];

for (let i = 0; i < 6; i++) {
  const fecha = new Date(ultimoAnio, ultimoMes - i);
  const mes = fecha.toLocaleString('default', { month: 'long' });
  const anio = fecha.getUTCFullYear();
  meses.unshift(`${mes} ${anio}`);

  const montoIngresos = this.ingresos.reduce((total, ingreso) => {
    const fechaIngreso = new Date(ingreso.fecha);
    if (fechaIngreso.getUTCMonth() === fecha.getUTCMonth() && fechaIngreso.getUTCFullYear() === fecha.getUTCFullYear()) {
      return total + parseFloat(ingreso.total.toString());
    }
    return total;
  }, 0);
  montosIngresos.unshift(montoIngresos);

  const montoEgresos = this.egresos.reduce((total, egreso) => {
    const fechaEgreso = new Date(egreso.fecha);
    if (fechaEgreso.getUTCMonth() === fecha.getUTCMonth() && fechaEgreso.getUTCFullYear() === fecha.getUTCFullYear()) {
      return total + parseFloat(egreso.total.toString());
    }
    return total;
  }, 0);
  montosEgresos.unshift(montoEgresos);
}

    this.clearChart();

      const canvas: HTMLCanvasElement = this.barChart.nativeElement;
    const ctx = canvas.getContext('2d')

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Ingresos',
        data: montosIngresos,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Egresos',
        data: montosEgresos,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ],
  };

  Chart.pluginService.register({
    afterDraw: function(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach(function(dataset, index) {
        const meta = chart.getDatasetMeta(index);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            const value = dataset.data[index].toFixed(2); // Formatea el valor a 2 decimales
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            const padding = 5;
            const position = element.tooltipPosition();
            ctx.fillText(value, position.x, position.y - (padding / 2));
          });
        }
      });
    }
  });

  this.chart= new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              if (value % 1 === 0) {
                return value;
              }
            }
          },
        }],
      },
      plugins: {
        datalabels: {
          display: false, // Oculta las etiquetas de datos por defecto
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.dataset.data[context.dataIndex].toFixed(2);
              const month = meses[context.dataIndex];
              return `${label}: ${value} (${month})`;
            },
          },
        },
      },
    },
  });
   });
    });
}

generatePDF() {
  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A. DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'COMPARACIÓN DE INGRESOS Y EGRESOS MENSUALMENTE.';
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

      { text: 'Comparación Entre Ingresos y Egresos de los Últimos seis Meses', style: 'header' },
      { image: (this.barChart.nativeElement as HTMLCanvasElement).toDataURL(), width: 500 },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };
  pdfMake.createPdf(docDefinition).open();
  });
//  pdfMake.createPdf(docDefinition).download('reporte.pdf');
}



////aNUAl
generateBarChartAnual() {
  this.ingresos=[];
  this.egresos=[];
        this.repS.geVentaFecha().subscribe((data2: any[]) => {
      this.ingresos = data2;
      //
   this.repS.geCompraFecha().subscribe((data3: any[]) => {
      this.egresos = data3;
 console.log(this.egresos);
const fechaActual = new Date();
const ultimoAnio = fechaActual.getUTCFullYear();
const anios = [];
const montosPorAnio = [];
const montosPorAnioE = [];

for (let i = 0; i < 6; i++) {
  const anio = ultimoAnio - i;
  anios.unshift(anio);

  const montoPorAnio = this.ingresos.reduce((total, ingreso) => {
    const fechaIngreso = new Date(ingreso.fecha);
    if (fechaIngreso.getUTCFullYear() === anio) {
      return total + parseFloat(ingreso.total.toString());
    }
    return total;
  }, 0);
  montosPorAnio.unshift(montoPorAnio);

    const montoPorAnioE = this.egresos.reduce((total, egreso) => {
    const fechaEgreso = new Date(egreso.fecha);
    if (fechaEgreso.getUTCFullYear() === anio) {
      return total + parseFloat(egreso.total.toString());
    }
    return total;
  }, 0);
  montosPorAnioE.unshift(montoPorAnioE);
}

    this.clearChart();
       const canvas: HTMLCanvasElement = this.barChart.nativeElement;
    const ctx = canvas.getContext('2d')


  const data = {
    labels: anios,
    datasets: [
      {
        label: 'Ingresos',
        data: montosPorAnio,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Egresos',
        data: montosPorAnioE,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ],
  };


 Chart.pluginService.register({
    afterDraw: function(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach(function(dataset, index) {
        const meta = chart.getDatasetMeta(index);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            const value = dataset.data[index].toFixed(2); // Formatea el valor a 2 decimales
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            const padding = 5;
            const position = element.tooltipPosition();
            ctx.fillText(value, position.x, position.y - (padding / 2));
          });
        }
      });
    }
  });

  this.chart=new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              if (value % 1 === 0) {
                return value;
              }
            }
          },
        }],
      },
      plugins: {
        datalabels: {
          display: false, // Oculta las etiquetas de datos por defecto
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.dataset.data[context.dataIndex].toFixed(2);
              const month = anios[context.dataIndex];
              return `${label}: ${value} (${month})`;
            },
          },
        },
      },
    },
  });
});
   });
}


generatePDFANUAL() {
  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'COMPARACIÓN DE INGRESOS Y EGRESOS ANUALMENTE.';
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

      { text: 'Comparación Entre Ingresos y Egresos de los Últimos seis Años', style: 'header' },
      { image: (this.barChart.nativeElement as HTMLCanvasElement).toDataURL(), width: 500 },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };
  pdfMake.createPdf(docDefinition).open();
  });
//  pdfMake.createPdf(docDefinition).download('reporte.pdf');
}


  private clearChart() {
    
   
if (this.chart) {
      this.chart.destroy();
      
     
this.chart = undefined; // Marcar el objeto chart como undefined
    }
  }

  
    
}
