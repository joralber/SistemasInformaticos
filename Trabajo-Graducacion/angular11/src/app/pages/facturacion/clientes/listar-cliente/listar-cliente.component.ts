import { Component, EventEmitter, Input, Inject, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

import { ClienteService } from '../../clienteservice/cliente.service';
import { Cliente } from '../cliente';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../../ventas/utils';
import { element } from 'protractor';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {IntercambioService} from '../../clienteservice/intercambio.service';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  title = 'SIGFICEV';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  listadetallecuentas: any[] = [];
  isDtInitialized: boolean = false;
  datacuentaprint: any[] = [];
  listabonoprint: any[] = [];
  detalleabonoscuenta: any[] = [];
  clientes: any[] = [];
  ventadetalle: any[] = [];
  detalleventaprint: any[] = [];
  dtOptions: any = {};
  dtTrigger = new Subject();
    ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
logoDataUrl: string;
@Inject(DOCUMENT) document
  constructor(private clienteservice: ClienteService, private router: Router, public regresarp: IntercambioService,
    private bitacoraS:BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {
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
    this.listarclientes();
    Utils.getImageDataUrlFromLocalPath1('assets/dist/img/logo1.png').then(
      result => this.logoDataUrl = result
    )
  }

  public regresarpr(){
  this.regresarp.intercambioValue(true);
}

  listarclientes() {
    this.clienteservice.getClientes().subscribe({
      next: (respuesta) => {
        this.clientes = respuesta.listadoclientes;
        console.log(respuesta.listadoclientes);
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

  statuscliente(id_cliente) {
    swal.fire({
      title: 'Dar de baja?',
      text: "¿Estás seguro dar de baja este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteservice.consultarpendientes(id_cliente).subscribe({
          next: (respuesta) => {
            if (respuesta.clienteblock.length > 0) {
              // swal.fire("Advertencia", "El cliente tiene pagos pendientes, por lo tanto no puede darse de baja", "warning");
              swal.fire({
                title: 'Advertencia?',
                text: "El cliente tiene pagos pendientes, por lo tanto no puede darse de baja, Desea de igual manera darlo de baja?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.clienteservice.cambiarstatus(id_cliente).subscribe({
                    next: (respuesta) => {
                       //bitacora
        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];
    
   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja a un cliente'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
                      swal.fire("Exito", respuesta.mensaje, "success");
                      this.listarclientes();
                    }, error: (error) => {
                      console.log("error", error)
                    }
                  });
                }
              })
            } else {
              this.clienteservice.cambiarstatus(id_cliente).subscribe({
                next: (respuesta) => {
                                 //bitacora
        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];
    
   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Dio de baja a un cliente'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
                  swal.fire("Exito", respuesta.mensaje, "success");
                  this.listarclientes();
                }, error: (error) => {
                  console.log("error", error)
                }
              });
            }

            this.listarclientes();
          }, error: (error) => {
            console.log("error", error)
          }
        });


      }
    })
  }

  detallecuentas(id_cliente){
      this.clienteservice.cargarcuentasclientegeneral(id_cliente).subscribe({
        next: (respuesta) => {
          this.listadetallecuentas = respuesta.cuentasxccliente;
        }, error: (error) => {
          console.log("error", error)
        }
      });
  }

  imprimirec(id_cxc) {
    var data = {
      "id_cxc": id_cxc
    }
    this.clienteservice.cargardatacuenta(data).subscribe({
      next: (respuesta) => {
        this.datacuentaprint = respuesta.datacuentaespecifica;
        this.datacuentaprint.forEach(elementcuenta => {
          // Realiza las acciones necesarias con cada item de this.cuentaPorCobrar
          // codigo para detalle y muestra de ticket ------------------
          this.clienteservice.getabonoscuenta(data).subscribe({
            next: (respuesta) => {
              this.listabonoprint = respuesta.datadetalleabonos;
              this.ventadetalle = respuesta.datadetalleventa;
              console.log('lista de abonos',this.listabonoprint);
              const currentDate = new Date();
              const formattedDate = currentDate.toLocaleDateString();
              const formattedTime = currentDate.toLocaleTimeString();
              var posicion = 0;
              var textosinabonos = "";
              var textoabonos = "";
              var subtotal = 0;
              var totaliva = 0;
              var totalneto = 0;
              var cuotasabonadas = Number(elementcuenta.numero_cuotas) - Number(elementcuenta.cuotas_pendientes);
              var saldoanterior = elementcuenta.monto_credito;
              this.listabonoprint.forEach(element => {
                let filasdetalle = {
                  fecha_abono: element.fecha_cobro,
                  forma_pago: element.formapago,
                  saldo_anterior: saldoanterior,
                  cuota: element.pago,
                  saldo_fin: 0
                };
                this.detalleabonoscuenta.push(filasdetalle);
                saldoanterior = saldoanterior - Number(element.pago);
                this.detalleabonoscuenta[posicion].saldo_fin = saldoanterior.toFixed(2);
                saldoanterior = saldoanterior.toFixed(2);
                posicion++;
              });
              this.ventadetalle.forEach(element => {
                let filasdetventa = {
                  cantidad: element.cantunidad,
                  producto: element.estilo + ' / ' + element.nombre_cat + ' ' + element.nombre_color + ' #' + element.nombre_talla,
                  preciounitario: element.preciounidad,
                  subtotal: element.subtunidad,
                };
                subtotal = element.subtotal;
                totaliva = element.iva;
                totalneto = element.total;
                this.detalleventaprint.push(filasdetventa);
              });
              if (this.detalleabonoscuenta.length == 0) {
                textosinabonos = "-- Ningun abono realizado a esta cuenta --"
              } else {
                textoabonos = "Abonos Realizados:"
              }

              const documentDefinition = {
                content: [
                  {
                    alignment: 'center',
                    image: this.logoDataUrl,
                    width: 225,
                    height: 80
                  },
                  { text: 'Comprobante de estado de cuenta', margin: [80, 2, 5, 5], fontSize: 25, bold: true },
                  {
                    columns: [
                      {
                        width: 20,
                        text: '',
                        fontSize: 18
                      },
                      {
                        width: 60,
                        text: 'Cliente: ',
                        bold: true,
                        fontSize: 18
                      },
                      {
                        width: 'auto',
                        text: elementcuenta.nombre,
                        fontSize: 18
                      },
                      {
                        width: 75,
                        text: '',
                        fontSize: 18
                      }
                    ],
                    fontSize: 15,
                    columnGap: 10
                  },
                  { text: textoabonos, margin: [150, 2, 5, 20], fontSize: 20, bold: true },
                  {
                    table: {
                      headerRows: 1,
                      widths: [100, 140, 70, 70, 70],

                      body: [

                      ]
                    },
                    layout: 'noBorders',
                    fontSize: 18
                  },
                  { text: textosinabonos, margin: [50, 2, 5, 20], fontSize: 20, bold: true },
                  { text: 'Cuotas Abonadas:' + cuotasabonadas + ' / ' + elementcuenta.numero_cuotas, margin: [140, 2, 5, 20], fontSize: 20 },
                  { text: "", margin: [50, 2, 5, 20], fontSize: 20, bold: true },
                  { text: "Detalle de la compra:", margin: [150, 2, 5, 20], fontSize: 20, bold: true },
                  {
                    table: {
                      headerRows: 1,
                      widths: [50, 255, 'auto', 'auto'],

                      body: [

                      ]
                    },
                    layout: 'noBorders',
                    fontSize: 18
                  },
                  { text: "", margin: [50, 2, 5, 20], fontSize: 20, bold: true },
                  {
                    columns: [
                      {
                        width: 160,
                        text: '',
                      },
                      {
                        width: 165,
                        text: 'Sub-Total:',
                        fontSize: 18
                      },
                      {
                        width: 50,
                        text: ''
                      },
                      {
                        width: '*',
                        text: '$ ' + subtotal,
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
                        text: 'IVA:',
                        fontSize: 18
                      },
                      {
                        width: 50,
                        text: ''
                      },
                      {
                        width: '*',
                        text: '$ ' + totaliva,
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
                        text: 'Total:',
                        fontSize: 18
                      },
                      {
                        width: 50,
                        text: ''
                      },
                      {
                        width: '*',
                        text: '$ ' + totalneto,
                        fontSize: 18
                      }
                    ],
                    fontSize: 15,
                    columnGap: 10
                  },
                  { text: "", margin: [50, 2, 5, 30], fontSize: 20, bold: true },
                  { text: 'Fecha Impresión: ' + formattedDate + ' ' + formattedTime, margin: [80, 2, 5, 5], fontSize: 20 },
                  { text: ' ', margin: [140, 2, 5, 20], fontSize: 20 },
                  {
                    columns: [
                      {
                        width: 105,
                        text: '',
                      },
                      {
                        width: 'auto',
                        text: '--------------------------------------------------',
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
              // this.listaabonos = JSON.parse(localStorage.getItem("abonodetalle"));
              if (this.detalleabonoscuenta.length != 0) {
                tableRows.push(['Fecha', 'Forma Abono', 'Saldo/F', 'Cuota', 'S/Fin']);
                this.detalleabonoscuenta.forEach(elementdet => {
                  tableRows.push([elementdet.fecha_abono, elementdet.forma_pago, elementdet.saldo_anterior, elementdet.cuota, elementdet.saldo_fin]);
                });
              }
              this.detalleabonoscuenta = [];
              tableRows.push(['', '', '', '', '']);
              tableRows.push(['', '', '', '', '']);
              tableRows.push(['', '', '', '', '']);

              var tableRowsdos = [];
              tableRowsdos.push(['Cant.', 'Producto', 'Precio.U', 'Subtotal']);
              this.detalleventaprint.forEach(elementventa => {
                tableRowsdos.push([elementventa.cantidad, elementventa.producto, elementventa.preciounitario, elementventa.subtotal]);
              });
              this.detalleventaprint = [];
              // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
              documentDefinition.content[4].table.body = documentDefinition.content[4].table.body.concat(tableRows);
              documentDefinition.content[9].table.body = documentDefinition.content[9].table.body.concat(tableRowsdos);

              pdfMake.createPdf(documentDefinition).print();
            }, error: (error) => {
              console.log("error", error)
            }
          });

        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

}
