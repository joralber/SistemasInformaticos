import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { BitacoraService } from '../services/bitacora.service';
import { Bitacora } from '../bitacora';
import { Subject } from 'rxjs';
import { DetalleBitacora } from '../detalleBitacora';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
   @ViewChild(DataTableDirective, {static: false})

 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
    dtOptions: any = {};
  dtTrigger = new Subject();

bitacora: Bitacora[]=[];
detBit: DetalleBitacora[]=[];
fechaI:Date;
  fechaF:Date;
    listB:any[]=[];



  constructor(private bitacoraS: BitacoraService, private datePipe: DatePipe) { }

  ngOnInit(): void {

 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
            destroy:true,

        "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },
  processing: true,
  
        dom: 'Bfrtip',
        buttons: [
        ]
    };

      this.getAll();
  }


getAll():void{
  this.bitacoraS.getAll().subscribe((data: Bitacora[])=>{
      this.bitacora = data;
           console.log(this.bitacora);
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();

          }
    });

}


ver(id_bitacora){
this.bitacoraS.getAllDetalle(id_bitacora).subscribe((data: DetalleBitacora[])=>{
this.detBit=data;

});

}

salir(){
  this.detBit=[];
  
}



verReporte()  {
  ///tabla

    this.bitacoraS.getReporteB(this.fechaI, this.fechaF).subscribe((data: any[]) => {
      this.listB = data;
if (this.listB.length === 0) {
              swal.fire('No existen datos!!');
}else{

const tableHeaders =  ['Nombre del Usuario', 'Correo Electrónicos', 'Hora de Inicio', 'Hora de Salida', 'Acciones del Usuario']; 


  const tableRows =this.listB.map(usuario => [
            usuario.name,
            usuario.email,
            this.formatDate(usuario.inicio),
            this.formatDate(usuario.salida),
              usuario.detalles.length > 0
              ? { ul: usuario.detalles.map(accion => `${accion.acciones} - ${this.formatDate(accion.hora)}`) }
              : 'Sin acciones',
          ]);

  const table = {
  table: {
    headerRows: 1,
    widths: ['auto', 'auto','auto', 'auto', '*'], // Ajusta los anchos de las columnas según tus necesidades
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
  const reporte= 'INFORME DE BITÁCORA.';
 const currentDate = new Date();
 const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = currentDate.toLocaleDateString('es-ES', options);
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
            { text: 'Informe Bitácora Del '+fechaI2+' Al '+fechaF2, fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },
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

 formatDate(fechaHoraOriginal) {
      if (fechaHoraOriginal) {

  const fechaHora = new Date(fechaHoraOriginal);
  const dia = fechaHora.getDate().toString().padStart(2, '0');
  const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaHora.getFullYear();
  const hora = fechaHora.toLocaleTimeString();
  return `${dia}/${mes}/${anio} ${hora}`;
  
    } else {
      return '';
    }
}




}
