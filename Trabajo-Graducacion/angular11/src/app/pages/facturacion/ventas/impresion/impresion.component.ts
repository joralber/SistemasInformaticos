import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../ventaservice/venta.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../utils';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-impresion',
  templateUrl: './impresion.component.html',
  styleUrls: ['./impresion.component.css']
})
export class ImpresionComponent implements OnInit {
  @Inject(DOCUMENT) document
  id_venta: number;
  someSvg = '<svg width="300" height="200" viewBox="0 0 300 200">' +
    '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />' +
    '</svg>';
  data: SafeHtml;
  fechaimpresion: "";
  tipocompra: "";
  listdetalle: any[] = [];
  listprevia: any[] = [];
  logoDataUrl: string;
  nombrecliente: "";
  duicliente: "";
  unidad = '';
  NumeroALetra = '';
  decena = '';
  cientos = '';
  miles = '';
  millarvalor = '';
  decenass = '';
  unidadvalor = '';
  unidadess = '';

  constructor(private ventaservice: VentaService, private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    Utils.getImageDataUrlFromLocalPath1('assets/dist/img/logo1.png').then(
      result => this.logoDataUrl = result
    )
    this.data = this.sanitizer.bypassSecurityTrustHtml(this.someSvg);
    this.id_venta = this.route.snapshot.params['id_venta'];
    this.imprimir(this.id_venta);
  }

  efectuado() {
    localStorage.removeItem("detalleventa");
    localStorage.removeItem("posicion");
    localStorage.removeItem('detalle');
    this.router.navigateByUrl('dashboard/lista-ventas');
  }

  imprimir(venta) {
    var data = {
      'id_venta': venta
    }
    this.ventaservice.ventaparaimpresion(this.id_venta).subscribe({
      next: (respuesta) => {
        console.log('inicialmente:', respuesta.detalleimpresion);
        respuesta.detalleimpresion.forEach(element => {
          const numero = element.total;
          const separador = numero.split('.');
          const dolares = separador[0];
          var cientos = '';

          // console.log('parte: 1', letras[0]);
          if (element.total >= 200) {
            this.nombrecliente = element.nombre;
            this.duicliente = element.dui;
          }
          if (dolares.length == 1) {
            this.unidad = this.unidades(dolares[0]);
            this.NumeroALetra = this.unidad.toString();

          }
          if (dolares.length == 2) {
            this.decena = this.decenas(dolares[0], dolares[1]);
            this.NumeroALetra = this.decena.toString();

          }
          if (dolares.length == 3) {
            cientos = this.centena(dolares[0], dolares[1], dolares[2]);
            this.decena = this.decenas(dolares[1], dolares[2]);
            this.NumeroALetra = (cientos + this.decena).toString();

          }
          if (dolares.length == 4) {
            this.miles = this.millar(dolares[0]);
            cientos = this.centena(dolares[1], dolares[2], dolares[3]);
            this.decena = this.decenas(dolares[2], dolares[3]);
            this.NumeroALetra = (this.miles + cientos + this.decena).toString();

          }
          if (dolares.length == 5) {
            this.miles = this.decenamillar(dolares[0], dolares[1]);
            cientos = this.centena(dolares[2], dolares[3], dolares[4]);
            this.decena = this.decenas(dolares[3], dolares[4]);
            this.NumeroALetra = (this.miles + ' ' + cientos + this.decena).toString();

          }


          // Ejemplo de uso:
          // const numero = element.total;
          const letras = numero.split('.');
          console.log('letras: ', this.NumeroALetra);
          // console.log('parte: 2', letras[1]);

          if (element.id_tipodocumento == 1) {
            // inicio de impresion de credito fiscal ---------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ventaservice.ventadetalleimpresion(data).subscribe({
              next: (respuesta) => {
                console.log("respuesta", respuesta.detalleimpresionrows);
                respuesta.detalleimpresionrows.forEach(element => {
                  var dataset = {
                    'estilo': element.estilo + ' / ' + element.nombre_cat + ' ' + element.nombre_color + ' #' + element.nombre_talla,
                    'cantidad': element.cantdetalle,
                    'precio': element.preciodetalle,
                    'subtotal': element.subdetalle
                  }
                  this.listprevia.push(dataset);
                  localStorage.setItem('detalle', JSON.stringify(this.listprevia));
                });
                console.log(this.listprevia);
              }, error: (error) => {
                console.log("error", error)
              }
            });
            const documentDefinition = {
              content: [
                { text: '', margin: [83, 2, 5, 100], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 12,
                      text: '',
                    },
                    {
                      width: 175,
                      text: element.nombre,
                      fontSize: 9
                    },
                    {
                      width: 95,
                      text: ''
                    },
                    {
                      width: '*',
                      text: element.fecha,
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 10
                },
                { text: '', margin: [83, 2, 5, 5], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 13,
                      text: '',
                    },
                    {
                      width: 200,
                      text: element.direccion,
                      fontSize: 9
                    },
                    {
                      width: 45,
                      text: ''
                    },
                    {
                      width: '*',
                      text: element.nrc,
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 20
                },
                { text: '', margin: [83, 2, 5, 5], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 15,
                      text: '',
                    },
                    {
                      width: 185,
                      text: '',
                    },
                    {
                      width: 50,
                      text: ''
                    },
                    {
                      width: '*',
                      text: element.nit,
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 20
                },
                { text: '', margin: [83, 2, 5, 5], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 13,
                      text: '',
                    },
                    {
                      width: 150,
                      text: element.municipio,
                      fontSize: 9
                    },
                    {
                      width: 70,
                      text: ''
                    },
                    {
                      width: '*',
                      text: element.giro,
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 20
                },
                {
                  columns: [
                    {
                      width: 15,
                      text: ' ',
                    },
                    {
                      width: 275,
                      text: ' ',
                    },
                    {
                      width: '*',
                      text: ' '
                    },
                    {
                      width: '*',
                      text: ' ',
                    }
                  ],
                  fontSize: 4
                },
                {
                  columns: [
                    {
                      width: 23,
                      text: '',
                    },
                    {
                      width: 150,
                      text: element.departamento,
                      fontSize: 9
                    },
                    {
                      width: 100,
                      text: ''
                    },
                    {
                      width: '*',
                      text: element.tipocompra,
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 20
                },
                { text: '', margin: [83, 2, 5, 45], fontSize: 15, bold: true },
                {
                  table: {
                    headerRows: 1,
                    widths: [20, 190, 45, 30, 43, 50],

                    body: [

                    ]
                  },
                  layout: 'noBorders',
                  fontSize: 9
                },
                { text: '', margin: [83, 2, 5, 4], fontSize: 15 },
                {
                  columns: [
                    {
                      width: 100,
                      text: '',
                    },
                    {
                      width: 170,
                      text: '',
                      fontSize: 9
                    },
                    {
                      width: 68,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ ' + element.subtotal,
                      fontSize: 9
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                { text: '', margin: [83, 2, 5, 3], fontSize: 10 },
                {
                  columns: [
                    {
                      width: 5,
                      text: '',
                    },
                    {
                      width: 165,
                      text: this.NumeroALetra + ' ' + separador[1] + '/100',
                      fontSize: 9
                    },
                    {
                      width: 168,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ '+element.iva,
                      fontSize: 9
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                { text: '', margin: [83, 2, 5, 1], fontSize: 5 },
                {
                  columns: [
                    {
                      width: 100,
                      text: '',
                    },
                    {
                      width: 170,
                      text: '',
                      fontSize: 9
                    },
                    {
                      width: 68,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ ' + element.total,
                      fontSize: 9
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 5,
                      text: '',
                    },
                    {
                      width: 'auto',
                      text: '',
                      fontSize: 9
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: ''
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                { text: '', margin: [30, 2, 5, 62], fontSize: 9 },
                {
                  columns: [
                    {
                      width: 100,
                      text: ' ',
                    },
                    {
                      width: 170,
                      text: ' ',
                      fontSize: 9
                    },
                    {
                      width: 68,
                      text: ' '
                    },
                    {
                      width: '*',
                      text: '$ ' + element.total
                    }
                  ],
                  fontSize: 9,
                  columnGap: 10
                }
              ],
              styles: {
                tableStyle: {
                  border: 'none'
                },
                arialFont: {
                  font: 'Arial'
                }
              }
            };
            var tableRows = [];
            this.listdetalle = JSON.parse(localStorage.getItem('detalle'))
            console.log('detalle actual', this.listdetalle)
            var rowsum = 0;
            var rowadicional = 0;
            this.listdetalle.forEach(element => {
              tableRows.push(['', '', '', '', '', '']);
              tableRows.push([element.cantidad, element.estilo, '', '$ ' + element.precio, '', '$ ' + element.subtotal]);
              rowsum++;
            });
            if (rowsum <= 2) {
              rowadicional = rowadicional + 1;
            }
            // if (rowsum > 2 && rowsum <= 4) {
            //   rowadicional = rowadicional + 1;
            // }
            var recorrido = 11 - rowsum + rowadicional;
            for (var l = 0; l <= recorrido; l++) {
              tableRows.push(['  ', '  ', '  ', '  ', '  ', '  ']);
            }
            // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
            documentDefinition.content[11].table.body = documentDefinition.content[11].table.body.concat(tableRows);

            pdfMake.createPdf(documentDefinition).open();
            localStorage.removeItem('detalle');
            // fin de impresion de credito fiscal ------------------------------------------------------------------------------------
          } else if (element.id_tipodocumento == 2) {
            // inicio de impresion de factura ----------------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ventaservice.ventadetalleimpresion(data).subscribe({
              next: (respuesta) => {
                console.log("respuesta", respuesta.detalleimpresionrows);
                respuesta.detalleimpresionrows.forEach(element => {
                  var dataset = {
                    'estilo': element.estilo + ' / ' + element.nombre_cat + ' ' + element.nombre_color + ' #' + element.nombre_talla,
                    'cantidad': element.cantdetalle,
                    'precio': element.preciodetalle,
                    'subtotal': element.subdetalle
                  }
                  this.listprevia.push(dataset);
                  localStorage.setItem('detalle', JSON.stringify(this.listprevia));
                });
                console.log(this.listprevia);
              }, error: (error) => {
                console.log("error", error)
              }
            });
            const documentDefinition = {
              content: [
                { text: '', margin: [83, 2, 5, 90], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 20,
                      text: '',
                    },
                    {
                      width: 110,
                      text: '',
                      fontSize: 9
                    },
                    {
                      width: 95,
                      text: ''
                    },
                    {
                      width: '*',
                      text: element.fecha,
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 10
                },
                { text: '', margin: [83, 2, 5, 5], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 20,
                      text: '',
                    },
                    {
                      width: 200,
                      text: element.nombre,
                      fontSize: 9
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '',
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 15
                },
                {
                  columns: [
                    {
                      width: 15,
                      text: ' ',
                    },
                    {
                      width: 275,
                      text: ' ',
                    },
                    {
                      width: '*',
                      text: ' '
                    },
                    {
                      width: '*',
                      text: ' ',
                    }
                  ],
                  fontSize: 4
                },
                {
                  columns: [
                    {
                      width: 15,
                      text: '',
                    },
                    {
                      width: 275,
                      text: element.direccion,
                      fontSize: 9
                    },
                    {
                      width: '*',
                      text: ''
                    },
                    {
                      width: '*',
                      text: '',
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 20
                },
                {
                  columns: [
                    {
                      width: 15,
                      text: ' ',
                    },
                    {
                      width: 275,
                      text: ' ',
                    },
                    {
                      width: '*',
                      text: ' '
                    },
                    {
                      width: '*',
                      text: ' ',
                    }
                  ],
                  fontSize: 4
                },
                {
                  columns: [
                    {
                      width: 15,
                      text: '',
                    },
                    {
                      width: 275,
                      text: element.dui,
                      fontSize: 9
                    },
                    {
                      width: '*',
                      text: ''
                    },
                    {
                      width: '*',
                      text: '',
                      fontSize: 9
                    }
                  ],
                  fontSize: 10,
                  columnGap: 20
                },
                { text: '', margin: [83, 2, 5, 40], fontSize: 15, bold: true },
                {
                  table: {
                    headerRows: 1,
                    widths: [20, 190, 29, 30, 57, 50],

                    body: [

                    ]
                  },
                  layout: 'noBorders',
                  fontSize: 9
                },
                {
                  columns: [
                    {
                      width: 100,
                      text: '',
                    },
                    {
                      width: 170,
                      text: '',
                      fontSize: 9
                    },
                    {
                      width: 66,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ ' + element.subtotal,
                      fontSize: 9
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 5,
                      text: '',
                    },
                    {
                      width: 'auto',
                      text: this.NumeroALetra + ' ' + separador[1] + '/100',
                      fontSize: 9
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: ''
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                { text: '', margin: [83, 2, 5, 5], fontSize: 15, bold: true },
                {
                  columns: [
                    {
                      width: 160,
                      text: '',
                    },
                    {
                      width: 165,
                      text: ' '
                    },
                    {
                      width: 75,
                      text: ' '
                    },
                    {
                      width: '*',
                      text: ''
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                { text: '', margin: [30, 2, 5, 8], fontSize: 9 },
                { text: this.nombrecliente, margin: [30, 2, 5, 0], fontSize: 9 },
                { text: this.duicliente, margin: [30, 2, 5, 2], fontSize: 9 },
                {
                  columns: [
                    {
                      width: 100,
                      text: ' ',
                    },
                    {
                      width: 170,
                      text: ' ',
                      fontSize: 9
                    },
                    {
                      width: 66,
                      text: ' '
                    },
                    {
                      width: '*',
                      text: '$ ' + element.total
                    }
                  ],
                  fontSize: 9,
                  columnGap: 10
                }
              ],
              styles: {
                tableStyle: {
                  border: 'none'
                },
                arialFont: {
                  font: 'Arial'
                }
              }
            };
            var tableRows = [];
            this.listdetalle = JSON.parse(localStorage.getItem('detalle'))
            console.log('detalle actual', this.listdetalle)
            var rowsum = 0;
            var rowadicional = 0;
            this.listdetalle.forEach(element => {
              tableRows.push(['', '', '', '', '', '']);
              tableRows.push([element.cantidad, element.estilo, '', '$ ' + element.precio, '', '$ ' + element.subtotal]);
              rowsum++;
            });
            if (rowsum <= 4) {
              rowadicional = rowadicional + 2;
            }
            if (rowsum > 4 && rowsum < 10) {
              rowadicional = rowadicional + 1;
            }
            var recorrido = 14 - rowsum + rowadicional;
            for (var l = 0; l <= recorrido; l++) {
              tableRows.push(['  ', '  ', '  ', '  ', '  ', '  ']);
            }
            // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
            documentDefinition.content[9].table.body = documentDefinition.content[9].table.body.concat(tableRows);

            pdfMake.createPdf(documentDefinition).open();
            localStorage.removeItem('detalle');
            // fin de impresion de factura -------------------------------------------------------------------------------------------
          } else if (element.id_tipodocumento == 3) {
            // inicio de impresion de ticket -----------------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ventaservice.ventadetalleimpresion(data).subscribe({
              next: (respuesta) => {
                console.log("respuesta", respuesta.detalleimpresionrows);
                respuesta.detalleimpresionrows.forEach(element => {
                  var dataset = {
                    'estilo': element.estilo + ' / ' + element.nombre_cat + ' ' + element.nombre_color + ' #' + element.nombre_talla,
                    'cantidad': element.cantdetalle,
                    'subtotal': element.subdetalle
                  }
                  this.listprevia.push(dataset);
                  localStorage.setItem('detalle', JSON.stringify(this.listprevia));
                });
                console.log(this.listprevia);
              }, error: (error) => {
                console.log("error", error)
              }
            });
            const documentDefinition = {
              content: [
                {
                  alignment: 'center',
                  image: this.logoDataUrl,
                  width: 225,
                  height: 80
                },
                { text: 'INDUSTRIAS VALLE, S.A de C.V', margin: [83, 2, 5, 5], fontSize: 25, bold: true },
                { text: 'GIRO ACTIVIDAD ECONÓMICA:', margin: [120, 2, 5, 5], fontSize: 20 },
                { text: 'Fabricación de Calzado', margin: [155, 2, 5, 5], fontSize: 20, bold: true },
                { text: 'Dirección: Calle Principal, Cantón Soledad, Crio. El Calvario,', margin: [37, 2, 5, 5], fontSize: 17 },
                { text: '#58, Monte San Juan, Cuscatlán', margin: [135, 2, 5, 5], fontSize: 17 },
                { text: 'Cel: 7601-3644', margin: [185, 2, 5, 5], fontSize: 20 },
                { text: 'Email: ventasinvalle@gmail.com', margin: [125, 2, 5, 5], fontSize: 20 },
                { text: 'NIT:   0905-030621-101-3', margin: [150, 2, 5, 5], fontSize: 20 },
                { text: 'NRC:   303814-3', margin: [180, 2, 5, 5], fontSize: 20 },
                { text: 'Fecha: ' + this.fechaimpresion, margin: [143, 2, 5, 5], fontSize: 20 },
                { text: 'Tipo Compra: ' + this.tipocompra, margin: [155, 2, 5, 30], fontSize: 20 },
                {
                  table: {
                    headerRows: 1,
                    widths: [220, 75, 'auto', 95, 'auto'],

                    body: [

                    ]
                  },
                  layout: 'noBorders',
                  fontSize: 18
                },
                {
                  columns: [
                    {
                      width: 160,
                      text: '',
                    },
                    {
                      width: 165,
                      text: 'Sub-Total Exento:',
                      fontSize: 18
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ 0.00',
                      fontSize: 18
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 160,
                      text: '',
                    },
                    {
                      width: 165,
                      text: 'Sub-Total No Sujeto:',
                      fontSize: 18
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ 0.00',
                      fontSize: 18
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 160,
                      text: '',
                    },
                    {
                      width: 165,
                      text: 'Sub-Total Gravado:',
                      fontSize: 18
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ ' + element.subtotal,
                      fontSize: 18
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 160,
                      text: '',
                    },
                    {
                      width: 165,
                      text: 'Total General:',
                      fontSize: 18
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: '$ ' + element.total,
                      fontSize: 18
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 160,
                      text: '',
                    },
                    {
                      width: 165,
                      text: ' '
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: ''
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                },
                {
                  columns: [
                    {
                      width: 105,
                      text: '',
                    },
                    {
                      width: 'auto',
                      text: '*** GRACIAS POR SU COMPRA ***',
                      fontSize: 18
                    },
                    {
                      width: 75,
                      text: ''
                    },
                    {
                      width: '*',
                      text: ''
                    }
                  ],
                  fontSize: 15,
                  columnGap: 10
                }
              ],
              styles: {
                tableStyle: {
                  border: 'none'
                }
              }
            };
            var tableRows = [];
            this.listdetalle = JSON.parse(localStorage.getItem('detalle'))
            console.log('detalle actual', this.listdetalle)
            this.listdetalle.forEach(element => {
              tableRows.push([element.estilo, '', element.cantidad, '', '$ ' + element.subtotal]);
            });
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
            documentDefinition.content[12].table.body = documentDefinition.content[12].table.body.concat(tableRows);

            pdfMake.createPdf(documentDefinition).print();
            localStorage.removeItem('detalle');
          }
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }
  // funciones de conversion de numeros a letras

  unidades(dolares2) {
    if (dolares2 == "0") {
      this.unidadess = "CERO";
    }
    if (dolares2 == "1") {
      this.unidadess = "UNO";
    }
    if (dolares2 == "2") {
      this.unidadess = "DOS";
    }
    if (dolares2 == "3") {
      this.unidadess = "TRES";
    }
    if (dolares2 == "4") {
      this.unidadess = "CUATRO";
    }
    if (dolares2 == "5") {
      this.unidadess = "CINCO";
    }
    if (dolares2 == "6") {
      this.unidadess = "SEIS";
    }
    if (dolares2 == "7") {
      this.unidadess = "SIETE";
    }
    if (dolares2 == "8") {
      this.unidadess = "OCHO";
    }
    if (dolares2 == "9") {
      this.unidadess = "NUEVE";
    }

    return this.unidadess;
  }

  decenas(dolares2, unidadExist) {

    if (dolares2 == "0" && unidadExist == "0") {
      this.decenass = "";
    } else if (dolares2 == "0" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "" + this.unidadvalor;
    }

    if (dolares2 == "1" && unidadExist == "0") {
      this.decenass = "DIEZ";
    } else if (dolares2 == "1" && unidadExist != "0") {
      if (unidadExist == "1") {
        this.decenass = "ONCE";
      }
      if (unidadExist == "2") {
        this.decenass = "DOCE";
      }
      if (unidadExist == "3") {
        this.decenass = "TRECE";
      }
      if (unidadExist == "4") {
        this.decenass = "CATORCE";
      }
      if (unidadExist == "5") {
        this.decenass = "QUINCE";
      }
      if (unidadExist == "6") {
        this.decenass = "DIECISEIS";
      }
      if (unidadExist == "7") {
        this.decenass = "DIECISIETE";
      }
      if (unidadExist == "8") {
        this.decenass = "DIECIOCHO";
      }
      if (unidadExist == "9") {
        this.decenass = "DIECINUEVE";
      }

    }
    if (dolares2 == "2" && unidadExist == "0") {
      this.decenass = "VEINTE";
    } else if (dolares2 == "2" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "VEINTE Y " + this.unidadvalor;
    }
    if (dolares2 == "3" && unidadExist == "0") {
      this.decenass = "TREINTA ";
    }
    else if (dolares2 == "3" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "TREINTA Y " + this.unidadvalor;
    }
    if (dolares2 == "4" && unidadExist == "0") {
      this.decenass = "CUARENTA ";
    }
    else if (dolares2 == "4" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "CUARENTA Y " + this.unidadvalor;
    }
    if (dolares2 == "5" && unidadExist == "0") {
      this.decenass = "CINCUENTA ";
    }
    else if (dolares2 == "5" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "CINCUENTA Y " + this.unidadvalor;
    }
    if (dolares2 == "6" && unidadExist == "0") {
      this.decenass = "SESENTA ";
    }
    else if (dolares2 == "6" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "SESENTA Y " + this.unidadvalor;
    }
    if (dolares2 == "7" && unidadExist == "0") {
      this.decenass = "SETENTA ";
    }
    else if (dolares2 == "7" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "SETENTA Y " + this.unidadvalor;
    }
    if (dolares2 == "8" && unidadExist == "0") {
      this.decenass = "OCHENTA ";
    }
    else if (dolares2 == "8" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "OCHENTA Y " + this.unidadvalor;
    }
    if (dolares2 == "9" && unidadExist == "0") {
      this.decenass = "NOVENTA ";
    }
    else if (dolares2 == "9" && unidadExist != "0") {
      this.unidadvalor = this.unidades(unidadExist);
      this.decenass = "NOVENTA Y " + this.unidadvalor;
    }

    return this.decenass;
  }

  // var cientos = '';
  centena(dolares2, decenaExist, unidadExist) {
    if (dolares2 == "0") {
      this.cientos = "";
    }
    if (dolares2 == "1" && decenaExist == "0" && unidadExist == "0") {
      this.cientos = "CIEN";
    } else if (dolares2 == "1" && (decenaExist != "0" || unidadExist != "0")) {
      this.cientos = "CIENTO ";
    }
    if (dolares2 == "2") {
      this.cientos = "DOSCIENTOS ";
    }
    if (dolares2 == "3") {
      this.cientos = "TRESCIENTOS ";
    }
    if (dolares2 == "4") {
      this.cientos = "CUATROCIENTOS ";
    }
    if (dolares2 == "5") {
      this.cientos = "QUINIENTOS ";
    }
    if (dolares2 == "6") {
      this.cientos = "SEISCIENTOS ";
    }
    if (dolares2 == "7") {
      this.cientos = "SETECIENTOS ";
    }
    if (dolares2 == "8") {
      this.cientos = "OCHOCIENTOS ";
    }
    if (dolares2 == "9") {
      this.cientos = "NOVECIENTOS ";
    }

    return this.cientos;
  }

  millar(dolares2) {
    if (dolares2 == "1") {
      this.miles = "MIL ";
    }
    if (dolares2 == "2") {
      this.miles = "DOSMIL ";
    }
    if (dolares2 == "3") {
      this.miles = "TRESMIL ";
    }
    if (dolares2 == "4") {
      this.miles = "CUATROMIL ";
    }
    if (dolares2 == "5") {
      this.miles = "CINCOMIL ";
    }
    if (dolares2 == "6") {
      this.miles = "SEISMIL ";
    }
    if (dolares2 == "7") {
      this.miles = "SIETEMIL ";
    }
    if (dolares2 == "8") {
      this.miles = "OCHOMIL ";
    }
    if (dolares2 == "9") {
      this.miles = "NUEVEMIL ";
    }

    return this.miles;
  }

  decenamillar(dolares2, millarexist) {
    if (dolares2 == "1" && millarexist == "0") {
      this.miles = "DIEZ MIL";
    } else if (dolares2 == "1" && millarexist != "0") {
      if (millarexist == "1") {
        this.miles = "ONCE MIL";
      }
      if (millarexist == "2") {
        this.miles = "DOCE MIL";
      }
      if (millarexist == "3") {
        this.miles = "TRECE MIL";
      }
      if (millarexist == "4") {
        this.miles = "CATORCE MIL";
      }
      if (millarexist == "5") {
        this.miles = "QUINCE MIL";
      }
      if (millarexist == "6") {
        this.miles = "DIECISEIS MIL";
      }
      if (millarexist == "7") {
        this.miles = "DIECISIETE MIL";
      }
      if (millarexist == "8") {
        this.miles = "DIECIOCHO MIL";
      }
      if (millarexist == "9") {
        this.miles = "DIECINUEVE MIL";
      }
    }
    if (dolares2 == "2" && millarexist == "0") {
      this.miles = "VEINTE MIL ";
    } else if (dolares2 == "2" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "VEINTE Y UN MIL ";
    } else if (dolares2 == "2" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "VEINTE Y " + this.millarvalor;
    }

    if (dolares2 == "3" && millarexist == "0") {
      this.miles = "TREINTA MIL ";
    } else if (dolares2 == "3" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "TREINTA Y UN MIL ";
    } else if (dolares2 == "3" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "TREINTA Y " + this.millarvalor;
    }

    if (dolares2 == "4" && millarexist == "0") {
      this.miles = "CUARENTA MIL ";
    } else if (dolares2 == "4" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "CUARENTA Y UN MIL ";
    } else if (dolares2 == "4" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "CUARENTA Y " + this.millarvalor;
    }

    if (dolares2 == "5" && millarexist == "0") {
      this.miles = "CINCUENTA MIL ";
    } else if (dolares2 == "5" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "CINCUENTA Y UN MIL ";
    } else if (dolares2 == "5" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "CINCUENTA Y " + this.millarvalor;
    }

    if (dolares2 == "6" && millarexist == "0") {
      this.miles = "SESENTA MIL ";
    } else if (dolares2 == "6" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "SESENTA Y UN MIL ";
    } else if (dolares2 == "6" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "SESENTA Y " + this.millarvalor;
    }

    if (dolares2 == "7" && millarexist == "0") {
      this.miles = "SETENTA MIL ";
    } else if (dolares2 == "7" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "SETENTA Y UN MIL ";
    } else if (dolares2 == "7" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "SETENTA Y " + this.millarvalor;
    }

    if (dolares2 == "8" && millarexist == "0") {
      this.miles = "OCHENTA MIL ";
    } else if (dolares2 == "8" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "OCHENTA Y UN MIL ";
    } else if (dolares2 == "8" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "OCHENTA Y " + this.millarvalor;
    }

    if (dolares2 == "9" && millarexist == "0") {
      this.miles = "NOVENTA MIL ";
    } else if (dolares2 == "9" && millarexist == "1") {
      //millarvalor = millar(millarexist);
      this.miles = "NOVENTA Y UN MIL ";
    } else if (dolares2 == "9" && millarexist != "0" && millarexist != "1") {
      this.millarvalor = this.millar(millarexist);
      this.miles = "NOVENTA Y " + this.millarvalor;
    }


    return this.miles;
  }

}
