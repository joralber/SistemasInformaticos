import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VentaService } from '../ventaservice/venta.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Utils } from '../utils';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//
//import { NavServiceService } from '../../../../shared/header/nav-service.service';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit {
  @Inject(DOCUMENT) document
  formcliente: FormGroup;
  clientes: any[] = [];
  productos: any[] = [];
  arreglodetalle: any[] = [];
  detalleventavista: any[] = [];
  listnuevoprecio: any[] = [];
  precionuevo: number;
  limitecredito: number;
  disponible: boolean = true;
  visible: boolean = false;
  selectedDate: string;
  busqueda: any = {
    busq: ""
  };
  ticketno: "";
  campofactura: boolean = true;
  busquedacliente: "";
  datosventa: any = {
    fecha: "",
    tipo_documento: "",
    tipocompra: "",
    tipoprecio: "",
    n_documento: "",
    subtotal: 0,
    iva: 0,
    total: 0,
    cliente: 0
  }

  idsfiltro: any = {
    idcat: 0,
    idcolor: 0,
    idtalla: 0
  }

  datoscuentasxc: any = {
    id_venta: 0,
    montocredito: 0,
    montocuota: 0,
    saldo: 0,
    numero_cuotas: 0,
    cuotaspendientes: 0,
    periodo: "MENSUAL"
  }

  campocuotas: boolean = true;

  itemsprod: number;
  nombredet: string;
  preciodet: number;
  cantidaddet: number;
  descripciondet: "";
  subtotaldet: number;

  precioconsumidor: number;
  preciomayoreo: number;

  categoriafield: boolean = false;
  colorfield: boolean = false;
  tallafield: boolean = false;
  arreglodetcompra: any[] = [];
  tipodoclist: any[] = [];
  clientelist: any[] = [];
  productolist: any[] = [];

  categoriafilter: any[] = [];
  colorfilter: any[] = [];
  tallafilter: any[] = [];

  precioproducto: number = 0;
  cantidadproducto: number;
  descripcion: "";
  ventacredito: "CREDITO";
  ventacontado: "CONTADO";
  bloquearbtn: boolean = true;
  dtOptions: any = {};
  dtTrigger = new Subject();

  bandera3: number = 0;
  bandera4: number = 0;
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
  ///bita
  bitacora: Usuarios;
  bitacora2: any;
  id_bitacora: number;
  nuevoCB: string = "";
  myControl: FormControl;
  constructor(private ventaservice: VentaService, private router: Router, private bitacoraS: BitacoraService, private loginS: LoginService) {
  }

  ngOnInit(): void {
    this.myControl = new FormControl({ value: '', disabled: true });
    this.formcliente = new FormGroup({
      fechaform: new FormControl('', [Validators.required]),
      tipodocform: new FormControl('', [Validators.required]),
      tipocompraform: new FormControl('', [Validators.required]),
      productoform: new FormControl('', [Validators.required]),
      cantidadform: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      clienteform: new FormControl('', [Validators.required]),
      // ndocumentoform: new FormControl('', [Validators.required]),
      selectcategoria: new FormControl(''),
      selectcolor: new FormControl(''),
      selecttalla: new FormControl(''),
      tipoprecio: new FormControl('', [Validators.required]),
      descripcionform: new FormControl(''),
      ndocumentoform: this.myControl
    });
    Utils.getImageDataUrlFromLocalPath1('assets/dist/img/logo1.png').then(
      result => this.logoDataUrl = result
    )
    this.gettpdocumento();
    this.pintardetalle(1);
    if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
      this.arreglodetalle = JSON.parse(localStorage.getItem("detalleventa"));
    }
    localStorage.removeItem('detalle');
    this.datosventa.fecha = this.selectedDate = new Date().toISOString().substring(0, 10);
  }

  pintardetalle(evento) {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
      },
      processing: true,

      dom: 'Bfrtip',
      buttons: [
        'copy', 'excel', 'pdf', 'print'
      ]
    };
    this.datosventa.subtotal = 0;
    this.itemsprod = 0;
    var datamoney = 0;
    if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
      this.detalleventavista = JSON.parse(localStorage.getItem("detalleventa"));
      if (evento == 2) {
        this.arreglodetalle = [];
        this.detalleventavista = [];
        this.datosventa.iva = 0;
        this.datosventa.total = 0;
        localStorage.removeItem("detalleventa");
      } else {
        this.detalleventavista.forEach(element => {
          this.itemsprod = this.itemsprod + Number(element['cantidad']);
          datamoney = datamoney + Number(element['subtotal']);
          this.datosventa.subtotal = datamoney.toFixed(2);
        });
      }
    }
  }

  get f() {
    return this.formcliente.controls;
  }

  gettpdocumento() {
    this.ventaservice.gettipodocumento().subscribe({
      next: (respuesta) => {
        this.tipodoclist = respuesta.tipodocumento;
        console.log(this.tipodoclist);
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  documentoemitir(tipodoc) {
    var preciomodificado = 0;
    var nuevoticket = "";
    var numericoval: number;
    console.log(tipodoc.target.value);
    if (this.precioproducto != 0) {
      if (tipodoc.target.value != "" && this.formcliente.get('productoform').value != "") {
        var dataprod = {
          id_producto: this.formcliente.get('productoform').value
        }
        this.ventaservice.getprecioproducto(dataprod).subscribe({
          next: (respuesta) => {
            if (this.formcliente.get('tipoprecio').value == "") {
              this.precioproducto = respuesta.precioproducto.total_iva_consumidorf;
            } else {
              (this.formcliente.get('tipoprecio').value == "CONSUMIDORFINAL") ? this.precioproducto = respuesta.precioproducto.total_iva_consumidorf :
                this.precioproducto = respuesta.precioproducto.total_iva_mayoreo;
            }
          }, error: (error) => {
            console.log("error", error)
          }
        });
        //actualizando precios para el arreglo en storage y la vista de visualizacion
        var datamoney = 0;
        var totalreal = 0
        var ivacalculado = 0;
        if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
          this.arreglodetalle = JSON.parse(localStorage.getItem("detalleventa"));
          var subindice = 0;
          this.arreglodetalle.forEach(element => {
            var dataprod = {
              id_producto: element['productoid']
            }
            if (this.formcliente.get('tipoprecio').value == "") {
              this.precionuevo = element['precioconsumidor'];
            } else {
              (this.formcliente.get('tipoprecio').value == "CONSUMIDORFINAL") ? this.precionuevo = element['precioconsumidor'] :
                this.precionuevo = element['preciomayoreo'];
            }
            this.arreglodetalle[subindice].precio = this.precionuevo;

            this.arreglodetalle[subindice].subtotal = (this.precionuevo * element['cantidad']).toFixed(2);
            localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));

            subindice++;
            this.precionuevo = 0;
          });

          //sumando para hacer el nuevo total debido a los nuevos precios
          this.detalleventavista = JSON.parse(localStorage.getItem("detalleventa"));
          this.detalleventavista.forEach(element => {
            this.itemsprod = this.itemsprod + Number(element['cantidad']);
            datamoney = datamoney + Number(element['subtotal']);
          });
          // calculando nuevos totales
          if (this.formcliente.get('tipodocform').value == 1) {
            this.myControl.enable();
            totalreal = Number(datamoney / 1.13);
            this.datosventa.subtotal = totalreal.toFixed(2);
            ivacalculado = Number(datamoney) - Number(totalreal);
            this.datosventa.iva = ivacalculado.toFixed(2);
            this.datosventa.total = datamoney;
            this.datosventa.n_documento = "";
          } else if (this.formcliente.get('tipodocform').value == 2) {
            this.myControl.enable();
            this.datosventa.iva = 0
            this.datosventa.subtotal = datamoney;
            this.datosventa.total = this.datosventa.subtotal;
            this.datosventa.n_documento = "";
          } else if (this.formcliente.get('tipodocform').value == 3) {
            this.myControl.disable();
            this.datosventa.iva = 0;
            this.datosventa.subtotal = datamoney;
            this.datosventa.total = this.datosventa.subtotal;
            this.ventaservice.verificartickets().subscribe({
              next: (respuesta) => {
                // this.clientelist = respuesta.tickets;
                console.log('count: ' + respuesta.tickets);
                if (respuesta.tickets == null) {
                  this.datosventa.n_documento = "TCK-001000";
                } else {
                  const ticket = respuesta.tickets;
                  const separadores = ticket.split('-');
                  const numerico = separadores[1];

                  console.log("contiene", numerico.length);
                  numericoval = Number(numerico) + 1;
                  nuevoticket = "TCK-" + numericoval;
                  const separadords = nuevoticket.split('-');
                  const nuevonumero = separadords[1];
                  console.log("nueva longitud de:", nuevonumero.length);
                  if (nuevonumero.length == 4) {
                    nuevoticket = "TCK-" + "00" + nuevonumero;
                  } else if (nuevonumero.length == 5) {
                    nuevoticket = "TCK-" + "0" + nuevonumero;
                  } else if (nuevonumero.length == 6) {
                    nuevoticket = "TCK-" + nuevonumero;
                  }
                  this.datosventa.n_documento = nuevoticket;
                }
              }, error: (error) => {
                console.log("error", error)
              }
            });
          }
          // calculando nuevos totales fin
          if (this.datoscuentasxc.numero_cuotas > 0 && this.datoscuentasxc.numero_cuotas != 0 && this.datoscuentasxc.numero_cuotas != "") {
            var valorcuota = this.datosventa.subtotal / this.datoscuentasxc.numero_cuotas;
            this.datoscuentasxc.montocuota = valorcuota.toFixed(2);
            this.datoscuentasxc.saldo = this.datosventa.subtotal;
            this.datoscuentasxc.montocredito = this.datosventa.subtotal;
          }
        }
        //finalizado de actualizacion
      } else if (this.formcliente.get('productoform').value == "") {
        if (this.formcliente.get('tipodocform').value == 1) {
          this.myControl.enable();
          this.datosventa.n_documento = "";
        } else if (this.formcliente.get('tipodocform').value == 2) {
          this.myControl.enable();
          this.datosventa.n_documento = "";
        } else if (this.formcliente.get('tipodocform').value == 3) {
          this.myControl.disable();
          this.ventaservice.verificartickets().subscribe({
            next: (respuesta) => {
              console.log('count: ' + respuesta.tickets);
              if (respuesta.tickets == null) {
                this.datosventa.n_documento = "TCK-001000";
              } else {
                const ticket = respuesta.tickets;
                const separadores = ticket.split('-');
                const numerico = separadores[1];

                console.log("contiene", numerico.length);
                numericoval = Number(numerico) + 1;
                nuevoticket = "TCK-" + numericoval;
                const separadords = nuevoticket.split('-');
                const nuevonumero = separadords[1];
                console.log("nueva longitud de:", nuevonumero.length);
                if (nuevonumero.length == 4) {
                  nuevoticket = "TCK-" + "00" + nuevonumero;
                } else if (nuevonumero.length == 5) {
                  nuevoticket = "TCK-" + "0" + nuevonumero;
                } else if (nuevonumero.length == 6) {
                  nuevoticket = "TCK-" + nuevonumero;
                }
                this.datosventa.n_documento = nuevoticket;
              }
            }, error: (error) => {
              console.log("error", error)
            }
          });
        }
      }
    } else {
      if (this.formcliente.get('tipodocform').value == 1) {
        this.myControl.enable();
        this.datosventa.n_documento = "";
      } else if (this.formcliente.get('tipodocform').value == 2) {
        this.myControl.enable();
        this.datosventa.n_documento = "";
      } else if (this.formcliente.get('tipodocform').value == 3) {
        this.myControl.disable();
        this.ventaservice.verificartickets().subscribe({
          next: (respuesta) => {
            console.log('count: ' + respuesta.tickets);
            if (respuesta.tickets == null) {
              this.datosventa.n_documento = "TCK-001000";
            } else {
              const ticket = respuesta.tickets;
              const separadores = ticket.split('-');
              const numerico = separadores[1];

              console.log("contiene", numerico.length);
              numericoval = Number(numerico) + 1;
              nuevoticket = "TCK-" + numericoval;
              const separadords = nuevoticket.split('-');
              const nuevonumero = separadords[1];
              console.log("nueva longitud de:", nuevonumero.length);
              if (nuevonumero.length == 4) {
                nuevoticket = "TCK-" + "00" + nuevonumero;
              } else if (nuevonumero.length == 5) {
                nuevoticket = "TCK-" + "0" + nuevonumero;
              } else if (nuevonumero.length == 6) {
                nuevoticket = "TCK-" + nuevonumero;
              }
              this.datosventa.n_documento = nuevoticket;
            }
          }, error: (error) => {
            console.log("error", error)
          }
        });
      }
    }
  }

  incluirfiltro(incluir) {
    if (incluir.target.checked) {
      this.categoriafield = true;
      this.colorfield = true;
      this.tallafield = true;
      this.getcategoriaf();
      if (this.formcliente.get('selectcategoria').value != "") {
        this.getcolorf(0, this.formcliente.get('selectcategoria').value);
      }
      if (this.formcliente.get('selectcolor').value != "") {
        this.gettallaf(0, this.formcliente.get('selectcolor').value);
      }
      if (this.formcliente.get('selectcategoria').value != "" && this.formcliente.get('selectcolor').value != ""
        && this.formcliente.get('selecttalla').value != "") {
        this.ventaservice.buscarproductofiltro(this.idsfiltro).subscribe({
          next: (respuesta) => {
            this.productolist = respuesta.productosdispfiltro;
            console.log(this.productolist);
          }, error: (error) => {
            console.log("error", error)
          }
        });
      }
      this.busqueda.busq = "";
      this.productolist = [];
    } else {
      this.categoriafield = false;
      this.colorfield = false;
      this.tallafield = false;
      this.categoriafilter = [];
      this.colorfilter = [];
      this.tallafilter = [];
      this.productolist = [];
    }
  }


  buscarcliente(clibusqueda) {
    var search = {
      'search': clibusqueda.target.value
    }
    this.formcliente.get('clienteform').reset();
    this.ventaservice.buscandocliente(search).subscribe({
      next: (respuesta) => {
        this.clientelist = respuesta.clientesactivos;
        console.log('clientes encontrados: ' + this.clientelist);
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }
  buscarproducto(buscando) {
    if (buscando.target.value != "") {
      this.nuevoCB = buscando.target.value;
      var search = {
        'search': this.nuevoCB
      }
      this.ventaservice.buscandoproducto(search).subscribe({
        next: (respuesta) => {
          this.productolist = respuesta.productosdisponibles;
          this.busqueda.busq = "";
        }, error: (error) => {
          console.log("error", error)
        }
      });
    } else {
      this.productolist = [];
      // this.bloquearbtn = true;
      this.formcliente.get('productoform').reset();
      if (this.formcliente.get('selectcategoria').value != "" && this.formcliente.get('selectcolor').value != ""
        && this.formcliente.get('selecttalla').value != "") {
        this.ventaservice.buscarproductofiltro(this.idsfiltro).subscribe({
          next: (respuesta) => {
            this.productolist = respuesta.productosdispfiltro;
            console.log(this.productolist);
          }, error: (error) => {
            console.log("error", error)
          }
        });
      }
    }
  }

  getcategoriaf() {
    this.ventaservice.getcategoriapt().subscribe({
      next: (respuesta) => {
        this.categoriafilter = respuesta.categorias;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  getcolorf(evento, direct) {
    if (direct == 0) {
      if (evento.target.value != "") {
        var datasearch = {
          id_cat_pt: evento.target.value
        }
        this.ventaservice.getcolorpt(datasearch).subscribe({
          next: (respuesta) => {
            this.colorfilter = respuesta.colores;
            this.tallafilter = [];
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else {
        this.colorfilter = [];
        this.tallafilter = [];
        this.productolist = [];
      }
    } else {
      if (direct != "") {
        var datasearch = {
          id_cat_pt: direct
        }
        this.ventaservice.getcolorpt(datasearch).subscribe({
          next: (respuesta) => {
            this.colorfilter = respuesta.colores;
            this.tallafilter = [];
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else {
        this.colorfilter = [];
        this.tallafilter = [];
        this.productolist = [];
      }
    }
  }

  gettallaf(evento, directs) {
    if (directs == 0) {
      if (evento.target.value != "") {
        var datasearch = {
          id_color_pt: evento.target.value
        }
        this.ventaservice.gettallapt(datasearch).subscribe({
          next: (respuesta) => {
            this.tallafilter = respuesta.tallas;
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else {
        this.tallafilter = [];
        this.productolist = [];
      }
    } else {
      if (directs != "") {
        var datasearch = {
          id_color_pt: directs
        }
        this.ventaservice.gettallapt(datasearch).subscribe({
          next: (respuesta) => {
            this.tallafilter = respuesta.tallas;
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else {
        this.tallafilter = [];
        this.productolist = [];
      }
    }
  }

  addtipoprecio(tipoprecio) {
    if (tipoprecio.target.value != "") {
      if (this.formcliente.get('productoform').value != "") {
        var dataprod = {
          id_producto: this.formcliente.get('productoform').value
        }
        this.ventaservice.getprecioproducto(dataprod).subscribe({
          next: (respuesta) => {
            (this.formcliente.get('tipoprecio').value == "CONSUMIDORFINAL") ? this.precioproducto = respuesta.precioproducto.total_iva_consumidorf :
              this.precioproducto = respuesta.precioproducto.total_iva_mayoreo;

            // if (this.formcliente.get('tipodocform').value == 1) {
            //   preciomodificado = this.precioproducto / 1.13;
            //   this.precioproducto = Number(preciomodificado.toFixed(3));
            // } else if (this.formcliente.get('tipodocform').value == 2) {
            //   this.precioproducto = this.precioproducto;
            // } else if (this.formcliente.get('tipodocform').value == 3) {
            //   this.precioproducto = this.precioproducto;
            // }

          }, error: (error) => {
            console.log("error", error)
          }
        });
      }

      var datamoney = 0;
      var preciomodificado = 0;
      var totalreal = 0
      var ivacalculado = 0;
      if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
        this.arreglodetalle = JSON.parse(localStorage.getItem("detalleventa"));
        var subindice = 0;
        this.arreglodetalle.forEach(element => {
          // var dataprod = {
          //   id_producto: element['productoid']
          // }
          if (this.formcliente.get('tipoprecio').value == "") {
            this.precionuevo = element['precioconsumidor'];
            // if (this.formcliente.get('tipodocform').value == 1) {

            //   preciomodificado = this.precionuevo / 1.13;
            //   this.precionuevo = Number(preciomodificado.toFixed(3));
            // } else if (this.formcliente.get('tipodocform').value == 2) {
            //   this.precionuevo = this.precionuevo;
            // } else if (this.formcliente.get('tipodocform').value == 3) {
            //   this.precionuevo = this.precionuevo;
            // }
          } else {
            (this.formcliente.get('tipoprecio').value == "CONSUMIDORFINAL") ? this.precionuevo = element['precioconsumidor'] :
              this.precionuevo = element['preciomayoreo'];
            // if (this.formcliente.get('tipodocform').value == 1) {

            //   preciomodificado = this.precionuevo / 1.13;
            //   this.precionuevo = Number(preciomodificado.toFixed(3));
            // } else if (this.formcliente.get('tipodocform').value == 2) {
            //   this.precionuevo = this.precionuevo;
            // } else if (this.formcliente.get('tipodocform').value == 3) {
            //   this.precionuevo = this.precionuevo;
            // }
          }
          console.log('precio nuevo afuera: ', this.precionuevo);
          this.arreglodetalle[subindice].precio = this.precionuevo;

          this.arreglodetalle[subindice].subtotal = (this.precionuevo * element['cantidad']).toFixed(2);
          localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));

          subindice++;
          this.precionuevo = 0;
        });

        //sumando para hacer el nuevo total debido a los nuevos precios
        this.detalleventavista = JSON.parse(localStorage.getItem("detalleventa"));
        this.detalleventavista.forEach(element => {
          this.itemsprod = this.itemsprod + Number(element['cantidad']);
          datamoney = datamoney + Number(element['subtotal']);
          // this.datosventa.subtotal = datamoney.toFixed(2);
        });
        // calculando nuevos totales
        if (this.formcliente.get('tipodocform').value == 1) {

          totalreal = Number(datamoney / 1.13);
          this.datosventa.subtotal = totalreal.toFixed(2);
          ivacalculado = Number(datamoney) - Number(totalreal);
          this.datosventa.iva = ivacalculado.toFixed(2);
          this.datosventa.total = datamoney.toFixed(2);
        } else if (this.formcliente.get('tipodocform').value == 2) {
          this.datosventa.iva = 0
          this.datosventa.subtotal = datamoney.toFixed(2);
          this.datosventa.total = this.datosventa.subtotal;
        } else if (this.formcliente.get('tipodocform').value == 3) {
          this.datosventa.iva = 0;
          this.datosventa.subtotal = datamoney.toFixed(2);
          this.datosventa.total = this.datosventa.subtotal;
        }
        // calculando nuevos totales fin
        if (this.datoscuentasxc.numero_cuotas > 0 && this.datoscuentasxc.numero_cuotas != 0 && this.datoscuentasxc.numero_cuotas != "") {
          var valorcuota = this.datosventa.subtotal / this.datoscuentasxc.numero_cuotas;
          this.datoscuentasxc.montocuota = valorcuota.toFixed(2);
          this.datoscuentasxc.saldo = this.datosventa.subtotal;
          this.datoscuentasxc.montocredito = this.datosventa.subtotal;
        }
      }
    }
  }

  creditosdisponible(tipoventa) {
    if (this.formcliente.get('clienteform').value != "") {
      if (tipoventa.target.value == "CREDITO") {
        var dataid = {
          "id_cliente": this.formcliente.get('clienteform').value
        }
        this.ventaservice.creditosdisponibles(dataid).subscribe({
          next: (respuesta) => {
            console.log("creditoscon cxp:", respuesta.creditos.length, "cred sin cxp:", respuesta.creditosincxc.length);
            if (this.limitecredito > 0) {
              if (respuesta.creditos.length == this.limitecredito || (respuesta.creditos.length + respuesta.creditosincxc.length) == this.limitecredito) {
                swal.fire("No tiene creditos disponibles");
                this.disponible = true;
                this.visible = false;
                this.datoscuentasxc.numero_cuotas = "";
                this.datoscuentasxc.montocuota = 0;
              } else {
                if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
                  this.campocuotas = false;
                }
                this.visible = true;
                this.disponible = false;
              }
            } else {
              if ((respuesta.creditos.length + respuesta.creditosincxc.length) == this.limitecredito) {
                swal.fire("No tiene creditos disponibles");
                this.visible = false;
                this.disponible = true;
                this.datoscuentasxc.numero_cuotas = "";
                this.datoscuentasxc.montocuota = 0;
              } else {
                if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
                  this.campocuotas = false;
                }
                this.visible = true;
                this.disponible = false;
              }
            }
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else if (tipoventa.target.value == "CONTADO") {
        this.disponible = false;
        this.visible = false;
        this.datoscuentasxc.numero_cuotas = "";
        this.datoscuentasxc.montocuota = 0;
      }
    }
  }

  addverificar(evento) {
    this.clientelist.forEach(element => {
      if (element.id_cliente == evento.target.value) {
        this.limitecredito = element.limite_credito;
      }
    });

    if (evento.target.value != "") {
      if (this.formcliente.get('tipocompraform').value != "") {
        if (this.formcliente.get('tipocompraform').value == "CREDITO") {
          var dataid = {
            "id_cliente": evento.target.value
          }
          this.ventaservice.creditosdisponibles(dataid).subscribe({
            next: (respuesta) => {
              console.log("creditoscon cxp:", respuesta.creditos.length, "cred sin cxp:", respuesta.creditosincxc.length);
              if (this.limitecredito > 0) {
                if (respuesta.creditos.length == this.limitecredito || (respuesta.creditos.length + respuesta.creditosincxc.length) == this.limitecredito) {
                  swal.fire("No tiene creditos disponibles");
                  this.disponible = true;
                  this.visible = false;
                  this.datoscuentasxc.numero_cuotas = "";
                  this.datoscuentasxc.montocuota = 0;
                } else {
                  if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
                    this.campocuotas = false;
                  }
                  this.visible = true;
                  this.disponible = false;
                }
              } else {
                if ((respuesta.creditos.length + respuesta.creditosincxc.length) == this.limitecredito) {
                  swal.fire("No tiene creditos disponibles");
                  this.visible = false;
                  this.disponible = true;
                  this.datoscuentasxc.numero_cuotas = "";
                  this.datoscuentasxc.montocuota = 0;
                } else {
                  if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
                    this.campocuotas = false;
                  }
                  this.visible = true;
                  this.disponible = false;
                }
              }
            }, error: (error) => {
              console.log("error", error)
            }
          });
        } else {
          this.visible = false;
          this.disponible = false;
          this.datoscuentasxc.montocuota = 0;
          this.datoscuentasxc.numero_cuotas = "";
        }
      }
    }
  }

  calcularcuota(cantidad) {
    if (cantidad.target.value != "" && cantidad.target.value != 0 && cantidad.target.value > 0) {
      var valorcuota = this.datosventa.total / cantidad.target.value;
      this.datoscuentasxc.montocuota = valorcuota.toFixed(2);
      this.datoscuentasxc.numero_cuotas = cantidad.target.value;
      this.datoscuentasxc.cuotaspendientes = cantidad.target.value;
      this.datoscuentasxc.saldo = this.datosventa.total;
      this.datoscuentasxc.montocredito = this.datosventa.total;
    } else {
      this.datoscuentasxc.montocuota = 0;
      this.datoscuentasxc.numero_cuotas = 0;
      this.datoscuentasxc.cuotaspendientes = 0;
      this.datoscuentasxc.saldo = 0;
      this.datoscuentasxc.montocredito = 0;
    }
  }

  addperiodo(periodo) {
    this.datoscuentasxc.periodo = periodo.target.value;
  }

  getproductofilter(evento) {
    if (evento.target.value != "") {
      this.idsfiltro.idcat = this.formcliente.get('selectcategoria').value;
      this.idsfiltro.idcolor = this.formcliente.get('selectcolor').value;
      this.idsfiltro.idtalla = this.formcliente.get('selecttalla').value;
      console.log(this.idsfiltro);
      this.ventaservice.buscarproductofiltro(this.idsfiltro).subscribe({
        next: (respuesta) => {
          this.productolist = respuesta.productosdispfiltro;
          console.log(this.productolist);
        }, error: (error) => {
          console.log("error", error)
        }
      });
    } else {
      this.productolist = [];
      this.formcliente.get('productoform').reset();
    }
  }

  detalleproducto(producto) {
    var preciomodificado = 0;
    if (producto.target.value == "") {
      this.precioproducto = 0;
    } else {

      var dataprod = {
        id_producto: producto.target.value
      }
      this.ventaservice.getprecioproducto(dataprod).subscribe({
        next: (respuesta) => {
          if (this.formcliente.get('tipoprecio').value == "") {
            this.precioproducto = respuesta.precioproducto.total_iva_consumidorf;
            // if (this.formcliente.get('tipodocform').value == 1) {
            //   preciomodificado = this.precioproducto / 1.13;
            //   this.precioproducto = Number(preciomodificado.toFixed(3));
            // } else if (this.formcliente.get('tipodocform').value == 2) {
            //   this.precioproducto = this.precioproducto;
            // } else if (this.formcliente.get('tipodocform').value == 3) {
            //   this.precioproducto = this.precioproducto;
            // }
          } else {
            (this.formcliente.get('tipoprecio').value == "CONSUMIDORFINAL") ? this.precioproducto = respuesta.precioproducto.total_iva_consumidorf :
              this.precioproducto = respuesta.precioproducto.total_iva_mayoreo;
            // if (this.formcliente.get('tipodocform').value == 1) {
            //   preciomodificado = this.precioproducto / 1.13;
            //   this.precioproducto = Number(preciomodificado.toFixed(3));
            // } else if (this.formcliente.get('tipodocform').value == 2) {
            //   this.precioproducto = this.precioproducto;
            // } else if (this.formcliente.get('tipodocform').value == 3) {
            //   this.precioproducto = this.precioproducto;
            // }
          }
          console.log(this.formcliente.get('tipoprecio').value);
          console.log(this.precioproducto);
        }, error: (error) => {
          console.log("error", error)
        }
      });
    }
  }

  agregardetalle() {
    if (this.cantidadproducto > 0) {
      this.itemsprod = 0;
      this.datosventa.subtotal = 0;
      var totalreal = 0;
      var cantidadexistente = 0;
      var aprobar = 0;
      if (localStorage.getItem("detalleventa")) {

        this.arreglodetalle = JSON.parse(localStorage.getItem("detalleventa"));
        var posicion = 0;
        var repetido = 0;
        this.arreglodetalle.forEach(element => {
          var subtotalmoney = 0;
          if (element['productoid'] == this.formcliente.get('productoform').value) {
            this.productolist.forEach(products => {
              if (products['id_producto'] == this.formcliente.get('productoform').value) {
                cantidadexistente = products['cantidad'];
              }
            });
            if ((element['cantidad'] + this.cantidadproducto) <= cantidadexistente) {
              subtotalmoney = this.precioproducto * this.cantidadproducto;
              subtotalmoney = Number(subtotalmoney.toFixed(3));
              this.arreglodetalle[posicion].cantidad = Number(element['cantidad']) + this.cantidadproducto;
              var totaldup = Number(element['subtotal']) + subtotalmoney;
              this.arreglodetalle[posicion].subtotal = totaldup.toFixed(3);
              this.arreglodetalle[posicion].descripcion = this.formcliente.get('descripcionform').value;
              localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));
            } else {
              swal.fire("Advertencia", "No existe la cantidad solicitada en stock!", "warning");
            }
            repetido = 1;
          }
          posicion++;
        });
        if (repetido == 0) {
          var many = 0;
          this.arreglodetalle.forEach(element => {
            many++;
          });

          localStorage.setItem("posicion", JSON.stringify(many));
          this.productolist.forEach(element => {
            if (element['id_producto'] == this.formcliente.get('productoform').value) {
              if (this.cantidadproducto <= element.cantidad) {
                this.nombredet = element['estilo'] + " / " + element['nombre_cat'] + " " + element['nombre_color'] + " #" + element['nombre_talla'];
                this.precioconsumidor = element['total_iva_consumidorf'];
                this.preciomayoreo = element['total_iva_mayoreo'];
                aprobar = 1;
              } else {
                swal.fire("Advertencia", "No existe la cantidad solicitada en stock!", "warning");
                this.cantidadproducto = 0;
              }
            }
          });
          if (aprobar == 1) {
            this.subtotaldet = this.precioproducto * this.cantidadproducto;
            var subtt = this.subtotaldet.toFixed(3);
            var ivacalculado = 0;
            let fila = {
              idventa: 0,
              posicion: localStorage.getItem("posicion"),
              nombreproducto: this.nombredet,
              productoid: this.formcliente.get('productoform').value,
              precio: this.precioproducto,
              cantidad: this.cantidadproducto,
              descripcion: this.formcliente.get('descripcionform').value,
              subtotal: subtt,
              precioconsumidor: this.precioconsumidor,
              preciomayoreo: this.preciomayoreo
            };

            this.arreglodetalle.push(fila);
            localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));
          }
        }
        var money = 0;
        this.detalleventavista = JSON.parse(localStorage.getItem("detalleventa"));
        this.detalleventavista.forEach(element => {
          this.itemsprod = this.itemsprod + Number(element['cantidad']);
          money = money + Number(element['subtotal']);
          money = Number(money.toFixed(2));
          // this.datosventa.subtotal = money.toFixed(2);
        });
        //sumando
        if (this.formcliente.get('tipodocform').value == 1) {
          totalreal = Number(money / 1.13);
          this.datosventa.subtotal = totalreal.toFixed(2);

          ivacalculado = Number(money) - Number(totalreal);
          this.datosventa.iva = ivacalculado.toFixed(2);
          this.datosventa.total = money;
        } else if (this.formcliente.get('tipodocform').value == 2) {
          this.datosventa.iva = 0
          this.datosventa.subtotal = money;
          this.datosventa.total = this.datosventa.subtotal;
        } else if (this.formcliente.get('tipodocform').value == 3) {
          this.datosventa.iva = 0;
          this.datosventa.subtotal = money;
          this.datosventa.total = this.datosventa.subtotal;
        }
        //termina sumando
      } else {
        localStorage.setItem("posicion", JSON.stringify(0));
        this.productolist.forEach(element => {
          if (element['id_producto'] == this.formcliente.get('productoform').value) {
            if (this.cantidadproducto <= element.cantidad) {
              this.nombredet = element['estilo'] + " / " + element['nombre_cat'] + " " + element['nombre_color'] + " #" + element['nombre_talla'];
              this.precioconsumidor = element['total_iva_consumidorf'];
              this.preciomayoreo = element['total_iva_mayoreo'];
              aprobar = 1;
            } else {
              swal.fire("Advertencia", "No existe la cantidad solicitada en stock!", "warning");
              this.cantidadproducto = 0;
            }
          }
        });

        if (aprobar == 1) {
          this.subtotaldet = Number(this.precioproducto * this.cantidadproducto);

          var subtt = this.subtotaldet.toFixed(2);
          var subtotalinicial = 0;
          var ivacalculado = 0;
          let fila = {
            idventa: 0,
            posicion: localStorage.getItem("posicion"),
            nombreproducto: this.nombredet,
            productoid: this.formcliente.get('productoform').value,
            precio: this.precioproducto,
            cantidad: this.cantidadproducto,
            descripcion: this.formcliente.get('descripcionform').value,
            subtotal: subtt,
            precioconsumidor: this.precioconsumidor,
            preciomayoreo: this.preciomayoreo
          };

          this.arreglodetalle.push(fila);
          localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));
          this.detalleventavista = JSON.parse(localStorage.getItem("detalleventa"));
          this.itemsprod = this.itemsprod + this.cantidadproducto;
          if (this.formcliente.get('tipodocform').value == 1) {
            // swal.fire("Verificar", "Credito Fiscal!", "warning");
            subtotalinicial = Number(subtt) / 1.13;
            this.datosventa.subtotal = subtotalinicial.toFixed(2);
            // totalreal = Number(this.datosventa.subtotal * 1.13);
            ivacalculado = Number(subtt) - Number(subtotalinicial);
            this.datosventa.iva = ivacalculado.toFixed(2);
            this.datosventa.total = subtt;
          } else if (this.formcliente.get('tipodocform').value == 2) {
            // swal.fire("Verificar", "Factura!", "warning");
            this.datosventa.iva = 0
            this.datosventa.subtotal = subtt;
            this.datosventa.total = this.datosventa.subtotal;
          } else if (this.formcliente.get('tipodocform').value == 3) {
            // swal.fire("Verificar", "Ticket!", "warning");
            this.datosventa.iva = 0;
            this.datosventa.subtotal = subtt;
            this.datosventa.total = this.datosventa.subtotal;
          }
        }
        // this.datosventa.subtotal = subtt;
        this.campocuotas = false;
        this.disponible = false;
      }
      this.cantidadproducto = 0;
    }
  }

  save() {
    console.log(this.precioproducto);
  }


  borrarfila(posicion) {
    this.arreglodetalle = JSON.parse(localStorage.getItem("detalleventa"));
    this.arreglodetalle.splice(posicion, 1);
    localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));
    this.arreglodetalle = JSON.parse(localStorage.getItem("detalleventa"));
    var indice = 0;
    this.itemsprod = 0;
    this.datosventa.subtotal = 0;
    this.arreglodetalle.forEach(element => {
      this.arreglodetalle[indice].posicion = indice;
      localStorage.setItem("detalleventa", JSON.stringify(this.arreglodetalle));
      this.itemsprod = this.itemsprod + Number(element['cantidad']);
      this.datosventa.subtotal = this.datosventa.subtotal + Number(element['subtotal']);
      indice++;
    });
    if (this.arreglodetalle.length == 0) {
      this.arreglodetalle = [];
      this.detalleventavista = [];
      localStorage.removeItem("detalleventa");
      this.campocuotas = true;
      this.datoscuentasxc.numero_cuotas = "";
      this.datoscuentasxc.montocuota = 0;
      this.disponible = true;
    }
    this.detalleventavista = JSON.parse(localStorage.getItem("detalleventa"));
  }

  eliminadetalle() {
    if (JSON.parse(localStorage.getItem("detalleventa")) != null) {
      this.pintardetalle(2);
      this.arreglodetalle.splice(0);
      this.campocuotas = true;
      this.datoscuentasxc.numero_cuotas = "";
      this.datoscuentasxc.montocuota = 0;
      this.disponible = true;
    } else {
      swal.fire("Verificar", "Debe existir al menos un detalle!", "warning");
    }
  }

  guardarventa() {
    console.log(this.formcliente.value);
    console.log(this.datoscuentasxc);
    console.log(this.datoscuentasxc);
    console.log('datos vent: ', this.datosventa);

    if (this.datosventa.fecha != "" && this.datosventa.tipoprecio != "" && this.datosventa.cliente != "" && this.datosventa.n_documento != "" &&
      ((this.datosventa.tipocompra == "CREDITO" && this.datoscuentasxc.montocuota != ""
        && this.datoscuentasxc.montocuota != 0) || (this.datosventa.tipocompra == "CONTADO")) && JSON.parse(localStorage.getItem("detalleventa")) != null) {
      // this.nF = this.datosventa.numerofactura;
      this.ventaservice.registrarventa(this.datosventa).subscribe({
        next: (respuesta) => {
          if (this.datoscuentasxc.montocuota != 0) {
            console.log("si hay cxc");
            this.datoscuentasxc.id_venta = respuesta.id_venta;
            this.guardarcxc();
          }
          this.guardarDetalleVenta(respuesta.id_venta);
        }, error: (error) => {
          console.log("error", error)
        }
      });
    } else {
      swal.fire("Debe ingresar los datos obligatorios para registrar la venta");
    }
  }

  guardarcxc() {
    console.log('datos de cxc: ', this.datoscuentasxc);
    this.ventaservice.registrarcxc(this.datoscuentasxc).subscribe({
      next: (respuesta) => {
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  guardarDetalleVenta(idventa) {
    var cantregis = this.arreglodetalle.length;
    var recorridoreg = 0;
    var cantidadactual = 0;
    var idkardex = 0;
    this.arreglodetalle.forEach(element => {
      recorridoreg++;
      var detallevnt = {
        "cantidad": element['cantidad'],
        "precio_unitario": element['precio'],
        "subtotal": element['subtotal'],
        "descripcion": element['descripcion'],
        "idventa": idventa,
        "idproducto": element['productoid']
      }

      this.ventaservice.registrardetalleventa(detallevnt).subscribe({
        next: (respuesta) => {
          this.ventaservice.consultarstock(detallevnt).subscribe({
            next: (respuesta) => {
              respuesta.dataproducto.forEach(element => {
                cantidadactual = element.cantidad;
              });
              var invfinal = cantidadactual - element['cantidad'];
              var arreglokardex = {
                "descripcion": "Salida de la venta #" + this.datosventa.n_documento,
                "fecha": this.datosventa.fecha,
                "salida": element['cantidad'],
                "inv_final": invfinal
              }
              // guardando datos en kardexprod
              this.ventaservice.registrakardex(arreglokardex).subscribe({
                next: (respuesta) => {
                  idkardex = respuesta.idkardex;
                  console.log('kardex now', idkardex);
                  // guardando tabla intermedia
                  var arreglointer = {
                    "idproducto": element['productoid'],
                    "idkardexprod": idkardex
                  }
                  console.log('arreglo inter:', arreglointer);
                  this.ventaservice.interkardxproducto(arreglointer).subscribe({
                    next: (respuesta) => {
                      console.log(respuesta.mensaje);
                      //     this.notificacion();
                    }, error: (error) => {
                      console.log("error", error)
                    }
                  });
                }, error: (error) => {
                  console.log("error", error)
                }
              });

              // actualizando stock de prod term
              var arreglostock = {
                "idproducto": element['productoid'],
                "cantidad": invfinal
              }
              // this.bandera3=Object.keys(arreglostock).length;
              this.ventaservice.actualizarstpt(arreglostock).subscribe({
                next: (respuesta) => {
                  this.bandera3++;
                  console.log(this.bandera3);
                  console.log(cantregis);
                  if (cantregis == this.bandera3) {
                    //bitacora
                    this.bitacora = this.loginS.userValue;
                    this.bitacora2 = this.bitacora['bitacora']
                    this.id_bitacora = this.bitacora2['id_bitacora'];

                    const detalle = {
                      id_bitacora: this.id_bitacora,
                      acciones: 'Registro una nueva venta'
                      // Agrega aquí otros campos si es necesario
                    };

                    this.bitacoraS.create(detalle).subscribe(res => {
                    });
                    //fin bitacora
                    //                  swal.fire("Exito", respuesta.mensaje, "success");
                    localStorage.removeItem("detalleventa");
                    localStorage.removeItem("posicion");
                    this.router.navigateByUrl('dashboard/lista-ventas?id=true');

                  }
                }, error: (error) => {
                  console.log("error", error)
                }
              });

            }, error: (error) => {
              console.log("error", error)
            }
          });
          this.bandera4++;

          if (cantregis == this.bandera4) {
            swal.fire("Exito", respuesta.mensaje, "success");
            // borrar localstorage de detalle y posicion
            console.log(idventa);
            this.imprimir(idventa);
            //   this.router.navigateByUrl('dashboard/registrar-venta');
            // localStorage.removeItem("detalleventa");
            // localStorage.removeItem("posicion");
            // this.formcliente.reset();
            // this.router.navigateByUrl('dashboard/impresion/' + idventa);


          }

        }, error: (error) => {
          console.log("error", error)
        }
      });
    });
  }

  actualizarstockpt() {

  }



  // para impresion de documentos -------------------------------------------------------------
  imprimir(venta) {
    console.log('idventa rec: ', venta);
    var dataprinter = {
      'id_venta': venta
    }
    this.ventaservice.ventaparaimpresion(dataprinter).subscribe({
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
          console.log('letras: ', this.NumeroALetra);

          if (element.id_tipodocumento == 1) {
            // inicio de impresion de credito fiscal ---------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;

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
            this.listdetalle = JSON.parse(localStorage.getItem('detalleventa'))
            console.log('detalle actual', this.listdetalle)
            var rowsum = 0;
            var rowadicional = 0;
            this.listdetalle.forEach(element => {
              tableRows.push(['', '', '', '', '', '']);
              tableRows.push([element.cantidad, element.nombreproducto, '', '$ ' + element.precio, '', '$ ' + element.subtotal]);
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
            this.eliminadetalle();
            // localStorage.removeItem("detalleventa");
            localStorage.removeItem("posicion");
            this.formcliente.reset();
            pdfMake.createPdf(documentDefinition).print();
            // localStorage.removeItem('detalle');
            // fin de impresion de credito fiscal ------------------------------------------------------------------------------------
          } else if (element.id_tipodocumento == 2) {
            // inicio de impresion de factura ----------------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;

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
            this.listdetalle = JSON.parse(localStorage.getItem('detalleventa'))
            // console.log('detalle actual', this.listdetalle)
            var rowsum = 0;
            var rowadicional = 0;
            this.listdetalle.forEach(element => {
              tableRows.push(['', '', '', '', '', '']);
              tableRows.push([element.cantidad, element.nombreproducto, '', '$ ' + element.precio, '', '$ ' + element.subtotal]);
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
            this.eliminadetalle();
            localStorage.removeItem("posicion");
            this.formcliente.reset();
            pdfMake.createPdf(documentDefinition).print();
            // fin de impresion de factura -------------------------------------------------------------------------------------------
          } else if (element.id_tipodocumento == 3) {
            // inicio de impresion de ticket -----------------------------------------------------------------------------------------
            console.log(element.id_tipodocumento);
            this.fechaimpresion = element.created_at;
            this.tipocompra = element.tipocompra;
            this.ticketno = element.n_factura
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
            this.listdetalle = JSON.parse(localStorage.getItem('detalleventa'))
            // console.log('detalle actual', this.listdetalle)
            tableRows.push(['Descripcion', '', 'Cant.', 'Precio.U', 'Subtotal']);
            this.listdetalle.forEach(element => {
              tableRows.push([element.nombreproducto, '', element.cantidad, '$ '+element.precio, '$ ' + element.subtotal]);
            });
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            tableRows.push(['', '', '', '', '']);
            // indica la posicion en la que se encuentra definido el elemento de la tabla y sus propiedades para poder asignar las filas correspondientes
            documentDefinition.content[13].table.body = documentDefinition.content[13].table.body.concat(tableRows);
            this.eliminadetalle();
            localStorage.removeItem("posicion");
            this.formcliente.reset();
            pdfMake.createPdf(documentDefinition).print();
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
