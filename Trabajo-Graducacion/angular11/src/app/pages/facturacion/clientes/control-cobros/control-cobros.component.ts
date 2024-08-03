import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../clienteservice/cliente.service';
import swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../../ventas/utils';
import { element } from 'protractor';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-control-cobros',
  templateUrl: './control-cobros.component.html',
  styleUrls: ['./control-cobros.component.css']
})
export class ControlCobrosComponent implements OnInit {
  listacuentascliente: any[] = [];
  arreglotemporal: any[] = [];
  abonostemporal: any[] = [];
  arregloinicial: any[] = [];
  listaabonos: any[] = [];
  listabonoprint: any[] = [];
  datacuentaprint: any[] = [];
  detalleabonostk: any[] = [];
  detalleabonoscuenta: any[] = [];
  ventadetalle: any[] = [];
  detalleventaprint: any[] = [];
  nombrecliente: "";
  formabono: FormGroup;
  formcuenta: FormGroup;
  cuotafija: 0;
  clienteid: number;
  logoDataUrl: string;
  selectedDate: string;
  data: SafeHtml;
  cuentaPorCobrar: any[];
  detalleAbonos: any;
  estadocuentabtn: boolean = true;
  cuentaselectid: number;
  someSvg = '<svg width="300" height="200" viewBox="0 0 300 200">' +
    '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />' +
    '</svg>';
  dataabono: any = {
    id_cxc: 0,
    ticket: 0,
    montopago: 0,
    fechapago: "",
    formapago: "",
    cuantospagos: 0,
    cuotaspendientes: 0
  }
  cuentainfor: any = {
    deudatotal: 0,
    formapago: 0,
    valorcuota: 0,
    saldopendiente: 0
  }
  ///bita
  bitacora: Usuarios;
  bitacora2: any;
  id_bitacora: number;
  selectedDate2: string;
  @Inject(DOCUMENT) document
  constructor(private clienteservice: ClienteService, private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer, private bitacoraS: BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {
    this.dataabono.fechapago = this.selectedDate2 = new Date().toISOString().substring(0, 10);

    this.formcuenta = new FormGroup({
      cuentaselect: new FormControl('')
    });
    this.formabono = new FormGroup({
      abonos: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      fechapago: new FormControl('', [Validators.required]),
      formapago: new FormControl('', [Validators.required])
    });
    this.clienteid = this.route.snapshot.params['id_cliente'];
    var datacli = {
      "id_cliente": this.route.snapshot.params['id_cliente']
    }
    this.clienteservice.getnombrecliente(datacli).subscribe({
      next: (respuesta) => {
        respuesta.datacliente.forEach(element => {
          this.nombrecliente = element.nombre
          console.log('cliente', this.nombrecliente);
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
    this.clienteservice.cargarcuentasporcliente(datacli).subscribe({
      next: (respuesta) => {
        this.listacuentascliente = respuesta.cuentasxccliente;
      }, error: (error) => {
        console.log("error", error)
      }
    });
    localStorage.removeItem("abonodetalle");
    Utils.getImageDataUrlFromLocalPath1('assets/dist/img/logo1.png').then(
      result => this.logoDataUrl = result
    )
    this.data = this.sanitizer.bypassSecurityTrustHtml(this.someSvg);
    localStorage.removeItem('abonosticket');
  }

  get f() {
    return this.formabono.controls;
  }

  validarcuotas(evento) {
    if (evento.target.value != 0 && evento.target.value != "") {
      if (Number(evento.target.value) <= Number(this.dataabono.cuotaspendientes)) {
        var abonoreal = 0;
        if (this.dataabono.cuotaspendientes == evento.target.value) {
          if (this.cuentainfor.saldopendiente < (this.cuotafija * evento.target.value)) {
            this.dataabono.montopago = this.cuentainfor.saldopendiente;
          } else if (this.cuentainfor.saldopendiente > (this.cuotafija * evento.target.value)) {
            this.dataabono.montopago = ((this.cuotafija * evento.target.value) + (this.cuentainfor.saldopendiente - this.cuotafija * evento.target.value))
          } else {
            abonoreal = this.cuotafija * evento.target.value;
            this.dataabono.montopago = abonoreal.toFixed(2);
          }
        } else {
          abonoreal = this.cuotafija * evento.target.value;
          this.dataabono.montopago = abonoreal.toFixed(2);
        }
      } else {
        swal.fire("Deben ser menos cuotas");
        this.dataabono.cuantospagos = "";
      }
    } else {
      this.dataabono.cuantospagos = "";
    }
  }


  realizarabono() {
    if ((this.dataabono.cuantospagos != "" || this.dataabono.cuantospagos != 0) && $("#formapago").val() != null && this.dataabono.fechapago != "") {
      this.dataabono.formapago = $("#formapago").val();

      this.clienteservice.guardarabono(this.dataabono).subscribe({
        next: (respuesta) => {
          this.actualizarcuentaxp(this.dataabono.id_cxc, this.dataabono.cuantospagos);
          localStorage.removeItem("abonodetalle");
          this.arreglotemporal = [];

          //bitacora

          this.bitacora = this.loginS.userValue;

          this.bitacora2 = this.bitacora['bitacora']
          this.id_bitacora = this.bitacora2['id_bitacora'];

          const detalle = {
            id_bitacora: this.id_bitacora,
            acciones: 'Registro un nuevo abono de cuentas por cobrar'
            // Agrega aquí otros campos si es necesario
          };

          this.bitacoraS.create(detalle).subscribe(res => {
          });
          //fin bitacora
        }, error: (error) => {
          console.log("error", error)
        }
      });
    } else {
      swal.fire("Debe completar los campos...");
    }
  }

  cambiarcuenta(cuenta, vacio) {
    console.log(cuenta.target.value);
    if (cuenta.target.value != "") {
      localStorage.removeItem("abonodetalle");
      this.arreglotemporal = [];
      if (vacio == '') {
        var data = {
          "id_cxc": cuenta.target.value
        }
        this.cuentaselectid = cuenta.target.value;
      } else {
        var data = {
          "id_cxc": vacio
        }
        this.cuentaselectid = vacio;
      }
      this.clienteservice.cargardatacuenta(data).subscribe({
        next: (respuesta) => {
          this.abonostemporal = respuesta.datacuentaespecifica;
          console.log(respuesta.datacuentaespecifica);
          this.abonostemporal.forEach(element => {
            this.cuentainfor.deudatotal = element.monto_credito;
            this.cuentainfor.formapago = element.periodopago;
            this.cuentainfor.valorcuota = element.monto_cuota;
            this.cuentainfor.saldopendiente = element.saldo;
            this.dataabono.cuotaspendientes = element.cuotas_pendientes
          });
          (vacio == '') ?
            this.mostrarabonos(cuenta.target.value, this.cuentainfor.deudatotal) :
            this.mostrarabonos(vacio, this.cuentainfor.deudatotal);
        }, error: (error) => {
          console.log("error", error)
        }
      });
      this.estadocuentabtn = false;
    } else {
      this.estadocuentabtn = true;
    }
  }

  mostrarabonos(cuentaxc, deudatotal) {

    this.dataabono.id_cxc = cuentaxc;
    this.cuotafija = this.cuentainfor.valorcuota;

    var data = {
      "id_cxc": cuentaxc
    }
    this.clienteservice.getabonoscuenta(data).subscribe({
      next: (respuesta) => {
        var saldoanterior = deudatotal;
        var posicion = 0;
        this.arregloinicial = respuesta.datadetalleabonos;
        this.arregloinicial.forEach(element => {
          let fila = {
            fecha_abono: element.fecha_cobro,
            forma_pago: element.formapago,
            saldo_anterior: saldoanterior,
            cuota: element.pago,
            saldo_fin: 0
          };
          this.arreglotemporal.push(fila);
          localStorage.setItem("abonodetalle", JSON.stringify(this.arreglotemporal));
          this.arreglotemporal = JSON.parse(localStorage.getItem("abonodetalle"));
          saldoanterior = saldoanterior - Number(element.pago);
          this.arreglotemporal[posicion].saldo_fin = saldoanterior.toFixed(2);
          saldoanterior = saldoanterior.toFixed(2);
          localStorage.setItem("abonodetalle", JSON.stringify(this.arreglotemporal));
          posicion++;
        });
        this.listaabonos = JSON.parse(localStorage.getItem("abonodetalle"));
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  actualizarcuentaxp(idcxc, cuantospagos) {
    var dataup = {
      "id_cxc": idcxc
    }
    var saldoactualizado = 0
    var cuotasactualizado = 0;
    var valorcuotapagada = 0;
    this.clienteservice.cargardatacuenta(dataup).subscribe({
      next: (respuesta) => {
        this.abonostemporal = respuesta.datacuentaespecifica;
        console.log('data cuenta: ', respuesta.datacuentaespecifica);
        this.abonostemporal.forEach(element => {
          valorcuotapagada = Number(cuantospagos) * Number(element.monto_credito);
          saldoactualizado = element.saldo - this.dataabono.montopago;
          cuotasactualizado = element.cuotas_pendientes - cuantospagos;
          var actualizar = {
            "id_cxc": idcxc,
            "saldo": saldoactualizado,
            "cuotaspendientes": cuotasactualizado
          }
          console.log('data actuali:', actualizar);
          this.clienteservice.actualizarcuentaxc(actualizar).subscribe({
            next: (respuesta) => {
              swal.fire("Exito", "El abono ha sido realizado", "success");
              this.imprimirabono(idcxc);
              this.router.navigateByUrl('dashboard/control-cobros/' + this.clienteid);
              this.cargarcuentas(this.clienteid);
              this.cambiarcuenta('', idcxc);
              localStorage.removeItem("abonodetalle");
              this.dataabono.cuantospagos = "";
              this.dataabono.fechapago = "";
              this.formabono.get('formapago').reset();
              this.arreglotemporal = [];
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

  cargarcuentas(idcliente) {
    this.formcuenta.get('cuentaselect').reset();
    var data = {
      "id_cliente": idcliente
    }
    this.clienteservice.cargarcuentasporcliente(data).subscribe({
      next: (respuesta) => {
        this.listacuentascliente = respuesta.cuentasxccliente;
        this.listacuentascliente.forEach(element => {
          this.nombrecliente = element.nombre;
          this.dataabono.id_cxc = element.id_cxc;
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  imprimirabono(idcuenta) {
    var data = {
      "id_cxc": idcuenta
    }

    //--------------------------------
    this.clienteservice.cargardatacuenta(data).subscribe({
      next: (respuesta) => {
        this.datacuentaprint = respuesta.datacuentaespecifica;
        this.datacuentaprint.forEach(elementcuenta => {
          // Realiza las acciones necesarias con cada item de this.cuentaPorCobrar
          this.selectedDate = new Date().toISOString().substring(0, 10)
          // codigo para detalle y muestra de ticket ------------------
          this.clienteservice.getabonoscuenta(data).subscribe({
            next: (respuesta) => {
              this.listabonoprint = respuesta.datadetalleabonos;
              const currentDate = new Date();
              const formattedDate = currentDate.toLocaleDateString();
              const formattedTime = currentDate.toLocaleTimeString();
              var cuotasporabono = 0;
              var ultimoabono = 0;
              var saldoanterior = 0;
              var formapago = "";
              var fechapago = "";
              var saldofinal = elementcuenta.monto_credito;
              this.listabonoprint.forEach(element => {
                // saldofinal = saldofinal - Number(element.pago);
                saldofinal = elementcuenta.saldo;
                cuotasporabono = Math.floor(element.pago / this.cuentainfor.valorcuota);
                ultimoabono = element.pago;
                formapago = element.formapago;
                fechapago = element.fecha_cobro;
              });
              var cuotasabonadas = Number(elementcuenta.numero_cuotas) - Number(elementcuenta.cuotas_pendientes);
              saldoanterior = Number(saldofinal) + Number(ultimoabono);
              saldoanterior = Number(saldoanterior.toFixed(2));
              let fila = {
                'saldoinicial': elementcuenta.monto_credito,
                'saldoanterior': saldoanterior,
                'cuotaspagadas': cuotasporabono,
                'montoabono': ultimoabono,
                'saldoactual': saldofinal,
                'formapago': formapago,
                'fechapago': fechapago
              };
              this.detalleabonostk.push(fila);

              const documentDefinition = {
                content: [
                  {
                    alignment: 'center',
                    image: this.logoDataUrl,
                    width: 225,
                    height: 80
                  },
                  { text: 'Comprobante de abono a credito', margin: [80, 2, 5, 5], fontSize: 25, bold: true },
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
                  {
                    table: {
                      headerRows: 1,
                      widths: [20, 200, 70, 200],

                      body: [

                      ]
                    },
                    layout: 'noBorders',
                    fontSize: 18
                  },
                  { text: 'Cuotas Abonadas:' + cuotasabonadas + ' / ' + elementcuenta.numero_cuotas, margin: [140, 2, 5, 20], fontSize: 20 },
                  { text: 'Fecha Impresión: ' + formattedDate + ' ' + formattedTime, margin: [140, 2, 5, 5], fontSize: 20 },
                  { text: ' ', margin: [140, 2, 5, 20], fontSize: 20 },
                  {
                    columns: [
                      {
                        width: 120,
                        text: '',
                      },
                      {
                        width: 'auto',
                        text: '----------',
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
              this.detalleabonostk.forEach(elementdet => {
                tableRows.push([' ', 'SALDO INICIAL:', ' ', '$ ' + elementdet.saldoinicial]);
                tableRows.push([' ', 'SALDO ANTERIOR:', ' ', '$ ' + elementdet.saldoanterior]);
                tableRows.push([' ', 'CUOTAS PAGADAS:', ' ', elementdet.cuotaspagadas]);
                tableRows.push([' ', 'ABONO REALIZADO:', ' ', '$ ' + elementdet.montoabono]);
                tableRows.push([' ', 'SALDO ACTUAL:', ' ', '$ ' + elementdet.saldoactual]);
                tableRows.push([' ', 'FORMA PAGO:', ' ', elementdet.formapago]);
                tableRows.push([' ', 'FECHA PAGO:', ' ', elementdet.fechapago]);
              });
              this.detalleabonostk = [];
              tableRows.push(['', '', '', '']);
              tableRows.push(['', '', '', '']);
              tableRows.push(['', '', '', '']);
              // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
              documentDefinition.content[3].table.body = documentDefinition.content[3].table.body.concat(tableRows);

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
  imprimirec() {
    var data = {
      "id_cxc": this.cuentaselectid
    }
    this.clienteservice.cargardatacuenta(data).subscribe({
      next: (respuesta) => {
        this.datacuentaprint = respuesta.datacuentaespecifica;
        this.datacuentaprint.forEach(elementcuenta => {
          // Realiza las acciones necesarias con cada item de this.cuentaPorCobrar
          this.selectedDate = new Date().toISOString().substring(0, 10)
          // codigo para detalle y muestra de ticket ------------------
          this.clienteservice.getabonoscuenta(data).subscribe({
            next: (respuesta) => {
              this.listabonoprint = respuesta.datadetalleabonos;
              this.ventadetalle = respuesta.datadetalleventa;
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
              // arreglo de detalle de venta
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
              if (JSON.parse(localStorage.getItem("abonodetalle")) == null) {
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
              this.listaabonos = JSON.parse(localStorage.getItem("abonodetalle"));
              if (JSON.parse(localStorage.getItem("abonodetalle")) != null) {
                tableRows.push(['Fecha', 'Forma Abono', 'Saldo/A', 'Cuota', 'S/Fin']);
                this.listaabonos.forEach(elementdet => {
                  tableRows.push([elementdet.fecha_abono, elementdet.forma_pago, elementdet.saldo_anterior, elementdet.cuota, elementdet.saldo_fin]);
                });
              }
              tableRows.push(['', '', '', '', '']);
              tableRows.push(['', '', '', '', '']);
              tableRows.push(['', '', '', '', '']);

              var tableRowsdos = [];
              tableRowsdos.push(['Cant.', 'Producto', 'Precio.U', 'Subtotal']);
              this.detalleventaprint.forEach(elementventa => {
                tableRowsdos.push([elementventa.cantidad, elementventa.producto, elementventa.preciounitario, elementventa.subtotal]);
              });
              this.detalleabonoscuenta = [];
              this.detalleventaprint = [];
              // this.listaabonos = JSON.parse(localStorage.getItem("abonodetalle"));
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
