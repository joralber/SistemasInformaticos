import { Component, OnInit } from '@angular/core';
import{ ReporteService } from '../services/reporte.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ventasfecha',
  templateUrl: './ventasfecha.component.html',
  styleUrls: ['./ventasfecha.component.css']
})
export class VentasfechaComponent implements OnInit {

    ingresos: any[]; // Listado dinámico de ingresos

  fec:Date;
      ingresoTotalDia: number;
  ingresoTotalMes: number;
  ingresoTotalAnio: number;
msj:boolean;
    constructor(private repS: ReporteService,  private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.getAll();
  }

  getAll(){
     this.repS.geVentaFecha().subscribe((data: any[]) => {
      this.ingresos = data;
    console.log(this.ingresos);


  
  });
}



//Reporte ingreesos

  //dev mp
generateReportEgresos()  {
if (this.ingresos.length === 0) {
              swal.fire('No existen datos de ventas!!');
  this.msj=false;
}else{
      if (this.fec != null || this.fec != undefined) {
  this.msj=false;

  const fecha = new Date(this.fec);

  //dia
  const añoSeleccionado = fecha.getFullYear();

  // Filtra y calcula el total de ingresos diario
  const ingresosDiarios = this.ingresos.filter(ingreso => {
    const fechaIngreso = new Date(ingreso.fecha);
    return fechaIngreso.getFullYear() === añoSeleccionado &&
           fechaIngreso.getMonth() === fecha.getMonth() &&
           fechaIngreso.getDate() === fecha.getDate();
  });

  const totalIngresosDiario = ingresosDiarios.reduce((total, ingreso) => total + parseFloat(ingreso.total), 0);

  console.log(totalIngresosDiario);
  //fin

  //mes

  const fechaSeleccionada = new Date(this.fec);

  const añoSeleccionado2 = fechaSeleccionada.getUTCFullYear();
  const mesSeleccionado = fechaSeleccionada.getUTCMonth() + 1;
  const ingresosMensuales = this.ingresos.filter(ingreso => {
    const fechaIngreso = new Date(ingreso.fecha);
    return fechaIngreso.getUTCFullYear() === añoSeleccionado2 && fechaIngreso.getUTCMonth() + 1 === mesSeleccionado;
  });

  const totalIngresosMensual = ingresosMensuales.reduce((total, ingreso) => total + parseFloat(ingreso.total), 0);
  
  //fin

//año
  const fechaSeleccionada2 = new Date(this.fec);

    // Obtén el mes seleccionado
  const anioSeleccionado = fechaSeleccionada2.getUTCFullYear();

       const ingresosAnio = this.ingresos.filter(ingreso => {
    const fechaIngreso = new Date(ingreso.fecha);
    return fechaIngreso.getUTCFullYear() === anioSeleccionado;
  });

    // Calcular el total de ingresos del año
    this.ingresoTotalAnio = ingresosAnio.reduce((total, ingreso) => total + parseFloat(ingreso.total), 0);
  //fin

  const companyName = 'VENTAS DE ARTICULOS DEPORTIVOS.';
    const companyName2 = 'TIENDA HENÁNDEZ';
  const direccion = 'COLONIA EL MILAGRO.';
  const phoneNumber = '2392-3228.';
  const reporte= 'TOTAL DE INGRESOS DIARIOS, MENSUAL Y ANUAL.';
 const currentDate = new Date();
 const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = currentDate.toLocaleDateString('es-ES', options);
const formattedTime = currentDate.toLocaleTimeString();
   const logoImageUrl = 'assets/logo2.png';

const fecha1 = this.datePipe.transform(this.fec, 'dd/MM/yyyy');
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
            { text: 'Total De Ingresos Diarios, Mensual Y Anual' , fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },

  { text: '\n', margin: [0, 0, 0, 10] },
  { text: `Fecha: ${fecha1}`, fontSize: 20, bold: true, margin: [0, 30, 55, 5] },

    { text: `Total de egresos diarios: $ ${totalIngresosDiario.toFixed(2)}`, fontSize: 25, bold: true, margin: [0, 30, 55, 5] },

    { text: `Total de egresos por mes: $ ${totalIngresosMensual.toFixed(2)}`, fontSize: 25, bold: true, margin: [0, 30, 55, 5] },

    { text: `Total de egresos por año: $ ${this.ingresoTotalAnio.toFixed(2)}`, fontSize: 25, bold: true, margin: [0, 30, 55, 5] },

  
      ],

          footer: function(currentPage, pageCount) {
    return { text: 'Página ' + currentPage.toString() + ' de ' + pageCount.toString(), alignment: 'center' };
  }
  };

  pdfMake.createPdf(docDefinition).open();
});

}else{
  this.msj=true;
}

}//lis
}


}

