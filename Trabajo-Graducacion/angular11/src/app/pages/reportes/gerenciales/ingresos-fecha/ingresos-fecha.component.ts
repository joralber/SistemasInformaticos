import { Component, OnInit } from '@angular/core';
import{ ReportesService } from '../../services/reportes.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
@Component({
  selector: 'app-ingresos-fecha',
  templateUrl: './ingresos-fecha.component.html',
  styleUrls: ['./ingresos-fecha.component.css']
})
export class IngresosFechaComponent implements OnInit {

  ingresos: any[]; // Listado dinámico de ingresos

  fec:Date;
      ingresoTotalDia: number;
  ingresoTotalMes: number;
  ingresoTotalAnio: number;

    constructor(private repS: ReportesService) { }

  ngOnInit(): void {

    this.getAll();
  }

  getAll(){
     this.repS.geVentaFecha().subscribe((data: any[]) => {
      this.ingresos = data;
    console.log(this.ingresos);


  
  });
}

calcularTotalDia() {
console.log(this.fec);
    if (this.fec != null || this.fec != undefined) {


  const fecha = new Date(this.fec);
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
}else{
  console.log('Seleccione la fecha');
}
}

/*
calcularTotalMes(){
   const fechaSeleccionada  = new Date(this.fec);


  const añoSeleccionado = fechaSeleccionada.getFullYear();
  const mesSeleccionado = fechaSeleccionada.getUTCMonth() + 1;
  const ingresosMensuales = this.ingresos.filter(ingreso => {
    const fechaIngreso = new Date(ingreso.fecha);
    return fechaIngreso.getFullYear() === añoSeleccionado && fechaIngreso.getUTCMonth() + 1 === mesSeleccionado;
  });

  const totalIngresosMensual = ingresosMensuales.reduce((total, ingreso) => total + parseFloat(ingreso.total), 0);
  
  console.log(totalIngresosMensual);
}


  calcularTotalAnio() {
  

const fechaSeleccionada = new Date(this.fec);

  // Obtén el mes seleccionado
  const anioSeleccionado = fechaSeleccionada.getFullYear();

       const ingresosAnio = this.ingresos.filter(ingreso => {
    const fechaIngreso = new Date(ingreso.fecha);
    return fechaIngreso.getFullYear() === anioSeleccionado;
  });

    // Calcular el total de ingresos del año
    this.ingresoTotalAnio = ingresosAnio.reduce((total, ingreso) => total + parseFloat(ingreso.total), 0);
  console.log(this.ingresoTotalAnio)

  }
*/

//Reporte egreesos

  //dev mp
generateReportEgresos()  {
if (this.ingresos.length === 0) {
              swal.fire('No existen devoluciones s/ compra!!');

}else{
      if (this.fec != null || this.fec != undefined) {


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

  const companyName = 'FABRICACIÓN DE CALZADO.';
    const companyName2 = 'INDUSTRIAS VALLE S.A. DE C.V.';
  const direccion = 'MONTE SAN JUAN, CUSCATLÁN.';
  const phoneNumber = '6311-5600.';
  const reporte= 'TOTAL DE INGRESOS DIARIOS, MENSUAL Y ANUAL.';
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
            { text: 'Total de Ingresos Diarios, Mensual y Anual' , fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },

  { text: '\n', margin: [0, 0, 0, 10] },
  { text: `Fecha: ${this.fec}`, fontSize: 20, bold: true, margin: [0, 30, 55, 5] },

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
  console.log('Seleccione la fecha');
}

}//lis
}


}


