import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { VentaService } from '../ventaservice/venta.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../utils';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { NotificacionPTSService } from '../../../../shared/header/notificacion-pts.service';
import { ProductosTerminadosService } from '../../../inventario_prod_final/producto_final/services/productos-terminados.service';
import { ProductosTerminados } from '../../../inventario_prod_final/producto_final/productos_terminados';
import { CodigoEstiloService } from '../../../inventarios/estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../../inventarios/estilos/codigo-estilo';
import { ColorptService } from '../../../inventario_prod_final/color_prod_final/registro-color-prod/services/colorpt.service';
import { Colorpt } from '../../../inventario_prod_final/color_prod_final/registro-color-prod/colorpt';
import { TallaptService } from '../../../inventario_prod_final/tallas_prod_final/registro-tallas-prod/services/tallapt.service';
import { Tallapt } from '../../../inventario_prod_final/tallas_prod_final/registro-tallas-prod/tallapt';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();
  listaventas: any[] = [];
  listadetalleventa: any[] = [];
  logoDataUrl: string;
  fechaimpresion: "";
  tipocompra: "";
  ticketno: "";
  listdetalle: any[] = [];
  listprevia: any[] = [];
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
  bool: false;

  prod: ProductosTerminados[] = [];
  pr: ProductosTerminados[] = [];
  productoT: ProductosTerminados;
  codigoEs: CodigoEstilo;
  color: Colorpt;
  talla: Tallapt;
  @Inject(DOCUMENT) document
  constructor(private ventaservice: VentaService, private route: ActivatedRoute,
    private notificationService: NotificacionPTSService, private prodS: ProductosTerminadosService,
    private toastr: ToastrService, private codS: CodigoEstiloService, private colS: ColorptService,
    private tallS: TallaptService) {
    this.productoT = new ProductosTerminados();
    this.codigoEs = new CodigoEstilo();
    this.color = new Colorpt();
    this.talla = new Tallapt();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bool = params['id'];
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
      },
      processing: true,

      dom: 'Bfrtip',
      buttons: [
        'copy', 'excel', 'pdf', 'print'
      ]
    };
    Utils.getImageDataUrlFromLocalPath1('assets/dist/img/logo1.png').then(
      result => this.logoDataUrl = result
    )
    this.getlistaventas();
    this.getAllP();
    localStorage.removeItem('detalle');

  }

  getlistaventas() {
    this.ventaservice.listarventas().subscribe({
      next: (respuesta) => {
        console.log("respuesta", respuesta)
        this.listaventas = respuesta.listaventas;
        ///paginacion
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  detalleventa(id_venta) {
    this.ventaservice.detalleventa(id_venta).subscribe({
      next: (respuesta) => {
        this.listadetalleventa = respuesta.detalleventa;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  printcomprobante(id_venta) {
    var dataprint = {
      'id_venta': id_venta
    }
    this.ventaservice.ventaparaimpresion(dataprint).subscribe({
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


          const letras = numero.split('.');

          if (element.id_tipodocumento == 1) {
            // inicio de impresion de credito fiscal ---------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ventaservice.ventadetalleimpresion(dataprint).subscribe({
              next: (respuesta) => {
                console.log("respuesta detalle", respuesta.detalleimpresionrows);
                respuesta.detalleimpresionrows.forEach(element => {
                  var dataset = {
                    'estilo': element.estilo + ' / ' + element.nombre_cat + ' ' + element.nombre_color + ' #' + element.nombre_talla,
                    'cantidad': element.cantdetalle,
                    'precio': element.preciodetalle,
                    'subtotal': element.subdetalle
                  }
                  this.listprevia.push(dataset);
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
                        widths: [20, 190, 15, 30, 43, 50],

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
                          width: 38,
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
                          width: 138,
                          text: ''
                        },
                        {
                          width: '*',
                          text: '$ ' + element.iva,
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
                          width: 38,
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
                    { text: '', margin: [30, 2, 5, 57], fontSize: 9 },
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
                          width: 38,
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
                var rowsum = 0;
                var rowadicional = 0;
                this.listprevia.forEach(element => {
                  tableRows.push(['', '', '', '', '', '']);
                  tableRows.push([element.cantidad, element.estilo, '', '$ ' + element.precio, '', '$ ' + element.subtotal]);
                  rowsum++;
                });
                this.listprevia = [];
                if (rowsum <= 2) {
                  rowadicional = rowadicional + 1;
                }
                // if (rowsum > 2 && rowsum <= 4) {
                //   rowadicional = rowadicional + 1;
                // }
                var recorrido = 9 - rowsum + rowadicional;
                for (var l = 0; l <= recorrido; l++) {
                  tableRows.push(['  ', '  ', '  ', '  ', '  ', '  ']);
                }
                // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
                documentDefinition.content[11].table.body = documentDefinition.content[11].table.body.concat(tableRows);

                pdfMake.createPdf(documentDefinition).print();
              }, error: (error) => {
                console.log("error", error)
              }
            });


            // fin de impresion de credito fiscal ------------------------------------------------------------------------------------
          } else if (element.id_tipodocumento == 2) {
            // inicio de impresion de factura ----------------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ventaservice.ventadetalleimpresion(dataprint).subscribe({
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
                });
                //-----------------impresion de documento de factura consumidor final
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
                        widths: [20, 190, 15, 30, 57, 50],

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
                          width: 50,
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
                          width: 50,
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
                var rowsum = 0;
                var rowadicional = 0;
                this.listprevia.forEach(element => {
                  tableRows.push(['', '', '', '', '', '']);
                  tableRows.push([element.cantidad, element.estilo, '', '$ ' + element.precio, '', '$ ' + element.subtotal]);
                  rowsum++;
                });
                this.listprevia = [];
                if (rowsum <= 4) {
                  rowadicional = rowadicional + 2;
                }
                if (rowsum > 4 && rowsum < 10) {
                  rowadicional = rowadicional + 1;
                }
                var recorrido = 12 - rowsum + rowadicional;
                for (var l = 0; l <= recorrido; l++) {
                  tableRows.push(['  ', '  ', '  ', '  ', '  ', '  ']);
                }
                // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
                documentDefinition.content[9].table.body = documentDefinition.content[9].table.body.concat(tableRows);

                pdfMake.createPdf(documentDefinition).print();
                //-----------------fin de impresion----------------------------------
              }, error: (error) => {
                console.log("error", error)
              }
            });

            // fin de impresion de factura -------------------------------------------------------------------------------------------
          } else if (element.id_tipodocumento == 3) {
            // inicio de impresion de ticket -----------------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ticketno = element.n_factura
            this.ventaservice.ventadetalleimpresion(dataprint).subscribe({
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
                });
                // impresion de ticket de venta
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
                    { text: 'Ticket No.: ' + this.ticketno, margin: [140, 2, 5, 5], fontSize: 20 },
                    { text: 'Tipo Compra: ' + this.tipocompra, margin: [155, 2, 5, 30], fontSize: 20 },
                    {
                      table: {
                        headerRows: 1,
                        widths: [235, 35, 40, 80, 80],

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
                tableRows.push(['Descripcion', '', 'Cant.', 'Precio.U', 'Subtotal']);
                this.listprevia.forEach(element => {
                  tableRows.push([element.estilo, '', element.cantidad, '$ ' + element.precio, '$ ' + element.subtotal]);
                });
                this.listprevia = [];
                tableRows.push(['', '', '', '', '']);
                tableRows.push(['', '', '', '', '']);
                tableRows.push(['', '', '', '', '']);
                tableRows.push(['', '', '', '', '']);
                tableRows.push(['', '', '', '', '']);
                tableRows.push(['', '', '', '', '']);
                // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
                documentDefinition.content[13].table.body = documentDefinition.content[13].table.body.concat(tableRows);

                // const generator = pdfMake.createPdf(documentDefinition);
                pdfMake.createPdf(documentDefinition).print();
                
              }, error: (error) => {
                console.log("error", error)
              }
            });

          }
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  determinePrinterType(): string {
    // Lógica para determinar si es factura o ticket y retornar el tipo de impresora
    // Puedes usar tus propios criterios o reglas para determinar esto.
    return 'nombre_impresora_matricial'; // 'nombre_impresora_matricial' o 'nombre_impresora_ticketera'
  }

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

  getAllP(): void {
    this.prodS.getAll().subscribe((data: ProductosTerminados[]) => {
      this.prod = data;
      console.log(this.prod);
      this.notificacion();

    });
  }
  notificacion() {
    if (this.bool) {

      //console.log(this.mp);
      this.notificationService.clearProducts();
      //this.n=[];
      for (const m of this.prod) {
        if (m.cantidad <= m.stock_minimo) {
          this.pr.push(m);
          this.verPT(m.id_producto);
        }
      }
      //  console.log(this.n);
      this.notificationService.addNotificationPT(this.pr);
    }
  }
  verPT(id_producto) {
    console.log(id_producto);
    this.prodS.find(id_producto).subscribe((data4: ProductosTerminados) => {
      this.productoT = data4;
      this.codS.find(this.productoT.idcodigo_estilo).subscribe((data5: CodigoEstilo) => {
        this.codigoEs = data5
        this.colS.find(this.productoT.id_color_pt).subscribe((data6: Colorpt) => {
          this.color = data6
          this.tallS.find(this.productoT.id_talla_pt).subscribe((data7: Tallapt) => {
            this.talla = data7
            this.toastr.info(`El producto: "${this.codigoEs.estilo} ${this.color.nombre_color}" # "${this.talla.nombre_talla}" ha llegado al stock mínimo`, 'Stock actual: "' + this.productoT.cantidad + '"');

          });
        });
      });
    });
  }

}
