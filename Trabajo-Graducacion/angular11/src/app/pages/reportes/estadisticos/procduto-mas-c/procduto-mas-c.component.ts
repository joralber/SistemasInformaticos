import { Component, OnInit } from '@angular/core';
import{ ReportesService } from '../../services/reportes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import swal from'sweetalert2';
import { CodigoEstiloService } from '../../../inventarios/estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../../inventarios/estilos/codigo-estilo';
@Component({
  selector: 'app-procduto-mas-c',
  templateUrl: './procduto-mas-c.component.html',
  styleUrls: ['./procduto-mas-c.component.css']
})
export class ProcdutoMasCComponent implements OnInit {


 fechaI:Date;
  fechaF:Date;
  select:number=5;
listPF:any[]=[];
 codigoE:CodigoEstilo[]=[];
 productosRango:any[]=[];
  constructor(private repS: ReportesService, private codS: CodigoEstiloService) { }

  ngOnInit(): void {
    this.getCodigoAll();
  }

getCodigoAll():void{
    //this.detalleForm.reset();  

  this.listPF=[];
  this.codS.getAll().subscribe((data: CodigoEstilo[])=>{
      this.codigoE = data;


    });


}


  generateReportEgresos(){
    const arre={
"fechaInicio": this.fechaI,
"fechaFin":this.fechaF
    };

    console.log(arre);
            this.repS.getProductoMasCol(arre).subscribe((data: any[]) => {
      this.listPF = data;
if (this.listPF.length === 0) {
              swal.fire('No existen Datos!!');

}else{
const tableHeaders = ['Códigos','Estilos','Color', '# de Ventas'];
//    const productosRango = this.listPF.slice(0, this.select); // Obtener los primeros 5 proveedores

if(this.select==25){
this.productosRango=this.listPF;
}else if(this.select==5 || this.select==10 ||this.select==15 ||this.select==20){

    this.productosRango = this.listPF.slice(0, this.select); // Obtener los primeros 5 proveedores
}

  const tableRows = this.productosRango.map(item => [item.codigo.toString().padStart(4, '0'), item.estilo, item.nombre_color, item.total_vendido]);

  const table = {
  table: {
    headerRows: 1,
    widths: ['auto',210,135, 85], // Ajusta los anchos de las columnas según tus necesidades
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
  const reporte= 'COLORES DE ZAPATOS MÁS DEMANDADOS POR ESTILOS.';
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
            { text: 'Colores de Zapatos más Demandados del '+this.fechaI+' al '+this.fechaF ,fontSize: 16, bold: true, margin: [0, 0, 0, 10], alignment: 'center' },

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
