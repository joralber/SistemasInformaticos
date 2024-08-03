import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompraService } from '../servicios/compra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaspagarService } from '../../cuentas-pagar/servicios/cuentaspagar.service';
import { SimpleChanges } from '@angular/core';
import swal from 'sweetalert2';

///

import { MateriaprimaService } from '../../../inventarios/materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../../inventarios/materiaprima/materiaprima';

import { KardexmpService } from '../../../kardex-mat-prima/services/kardexmp.service';
import { Kardexmp } from '../../../kardex-mat-prima/kardexmp';

import { MpkardexService } from '../../../kardex-mat-prima/services/mpkardex.service';
import { Mpkardexmp } from '../../../kardex-mat-prima/mpkardexmp';
import { NavServiceService } from '../../../../shared/header/nav-service.service';

//

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registro-compra',
  templateUrl: './registro-compra.component.html',
  styleUrls: ['./registro-compra.component.css']
})
export class RegistroCompraComponent implements OnInit {
  formcompra: FormGroup;
  ordendata: any[] = [];
  detalledata: any[] = [];
  id_ordencompra: number;
  compracredito = "CREDITO";
  compracontado = "CONTADO";
  subtotalmateria: any;
  visible: boolean = false;

  //
  actuaStock = [];
  contador = 0;
  contador1 = 0;
  formKardex: FormGroup;
  formMpKar: FormGroup;
  materiaprima: Materiaprima;
  kardexmp: Kardexmp;
  idk: number = 0;
  idm: number = 0;
  exis: number = 0;
  idMAP: number;
  numeroK: number = 0;
  numeroK2: number = 0;
  datos2 = [];
  mp: Materiaprima[] = [];
  n: Materiaprima[] = [];
  contadorArreglo = [];
  selectedDate: string;
  nF: string;

  //
  datoscompra: any = {
    idproveedor: "",
    fecha: "",
    numerofactura: "",
    tipocompra: "",
    totalitems: 0,
    subtotal: 0,
    iva: 0,
    total: 0
  }
  datoscuentasxp: any = {
    id_compra: 0,
    deuda: 0,
    montocuota: 0,
    saldo: 0,
    numero_cuotas: 0,
    cuotaspendientes: 0,
    fecha_factura: "",
    periodo: "MENSUAL"
  }
  idordencompra: number;
  detallecompras: any[] = [];
  idproveedor: number;
  limitecredito: number;
  disponible: boolean = false;
    ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private compraservice: CompraService,
    private route: ActivatedRoute,
    private router: Router, private service: MateriaprimaService,
    private kardexmpS: KardexmpService, private mpKS: MpkardexService, private notificationService: NavServiceService,
    private cuentasservice: CuentaspagarService,  private bitacoraS:BitacoraService, private loginS: LoginService) {
    this.materiaprima = new Materiaprima();
    this.kardexmp = new Kardexmp();
  }

  ngOnInit(): void {
    this.formcompra = new FormGroup({
      fechacompra: new FormControl('', [Validators.required]),
      numerofactura: new FormControl('', [Validators.required]),
      tipocompra: new FormControl('', [Validators.required])
    });


    //kardex
    this.formKardex = new FormGroup({
      descripcion: new FormControl(''),
      fecha: new FormControl(''),
      inv_inicial: new FormControl(''),
      entradas: new FormControl(''),
      salida: new FormControl(''),
      inv_final: new FormControl(''),
    });
    //

    this.id_ordencompra = this.route.snapshot.params['id_ordencompra'];

    this.compraservice.cargarOrdenEspecifica(this.id_ordencompra).subscribe({
      next: (respuesta) => {
        this.ordendata = respuesta.ordenespecifica;
        this.ordendata.forEach(element => {
          this.idproveedor = element.id_proveedor;
          this.limitecredito = element.limite_credito;
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
    this.compraservice.cargarDetalleEspecifica(this.id_ordencompra).subscribe({
      next: (respuesta) => {
        this.detalledata = respuesta.detalleespecifico;
        this.detalledata.forEach(element => {
          let fila = {
            cantidadsoli: element.cantidaddetalle,
            idmateria: element.id_mp,
            cantidad: 0,
            preciounitario: 0,
            subtotal: 0
          };
          this.detallecompras.push(fila);
          localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
          this.idordencompra = element['id_ordencompra'];
          // console.log("extract orden compra: ", element.id_ordencompra);
        });

        // console.log("lista ordenes: " + respuesta['mensaje']);
      }, error: (error) => {
        console.log("error", error)
      }
    });

    this.datoscompra.fecha = this.selectedDate = new Date().toISOString().substring(0, 10);

  }
  get f() {
    return this.formcompra.controls;
  }
  onChangeFirst(tipocambio, posicion) {

    if (tipocambio.target.value == "Completa") {
      $("#unidades" + posicion).prop("disabled", true);
      $("#costoreal" + posicion).prop("disabled", false);

      if (localStorage.getItem("storagedetcompras")) {
        this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
      }
      // this.detallecompras.splice(posicion, 1);
      // localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      // $("#costoreal" + posicion).val($("#cantidadcompleta" + posicion).val());
      // console.log("tomando el campo: ",$("#cantidadcompleta" + posicion).val());
      // let fila = {
      //   idmateria: $("#idmateriaprima" + posicion).val(),
      //   cantidad: $("#cantidadcompleta" + posicion).val(),
      //   preciounitario: 0,
      //   subtotal: 0
      // };
      this.detallecompras[posicion].cantidad = Number($("#cantidadcompleta" + posicion).val());
      // this.detallecompras.push(fila);
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      console.log(this.detallecompras);
      $("#unidades" + posicion).val("");
      $("#costoreal" + posicion).val("");
    } else if (tipocambio.target.value == "Otra") {

      $("#unidades" + posicion).prop("disabled", false);
      $("#costoreal" + posicion).prop("disabled", false);
      if (localStorage.getItem("storagedetcompras")) {
        this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
      }
      // this.detallecompras.splice(posicion, 1);
      // localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      // let fila = {
      //   idmateria: $("#idmateriaprima" + posicion).val(),
      //   cantidad: 0,
      //   preciounitario: 0,
      //   subtotal: 0
      // };
      this.detallecompras[posicion].cantidad = 0;
      this.detallecompras[posicion].preciounitario = 0;
      this.detallecompras[posicion].subtotal = 0;
      // this.detallecompras.push(fila);
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));

    } else {
      // this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
      // this.detallecompras.splice(posicion, 1);
      this.detallecompras[posicion].cantidad = 0;
      this.detallecompras[posicion].preciounitario = 0;
      this.detallecompras[posicion].subtotal = 0;
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      $("#unidades" + posicion).val("");
      $("#costoreal" + posicion).val("");
      $("#unidades" + posicion).prop("disabled", true);
      $("#costoreal" + posicion).prop("disabled", true);
    }
  }

  verificarcreditos(tipocompra) {

    if (tipocompra.target.value == "CREDITO") {
      var dataid = {
        "id_proveedor": this.idproveedor,
      }
      this.compraservice.creditodisponible(dataid).subscribe({
        next: (respuesta) => {
          console.log("creditoscon cxp:", respuesta.creditos.length, "cred sin cxp:", respuesta.creditosincxp.length);
          if (this.limitecredito > 0) {
            if (respuesta.creditos.length == this.limitecredito || (respuesta.creditos.length + respuesta.creditosincxp.length) == this.limitecredito) {
              swal.fire("No tiene creditos disponibles");
              this.disponible = true;
              this.visible = false;
              this.datoscuentasxp.numero_cuotas = "";
              this.datoscuentasxp.montocuota = "";
            } else {
              this.visible = true;
            }
          } else {
            if ((respuesta.creditos.length + respuesta.creditosincxp.length) == this.limitecredito) {
              swal.fire("No tiene creditos disponibles");
              this.visible = false;
              this.disponible = false;
              this.datoscuentasxp.numero_cuotas = "";
              this.datoscuentasxp.montocuota = "";
            } else {
              this.visible = true;
            }
          }
        }, error: (error) => {
          console.log("error", error)
        }
      });
    } else if (tipocompra.target.value == "CONTADO") {
      this.disponible = false;
      this.visible = false;
      this.datoscuentasxp.numero_cuotas = "";
      this.datoscuentasxp.montocuota = "";
    }
  }

  setctrecibida(evento, posicion) {
    this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
    if (evento.target.value <= this.detallecompras[posicion].cantidadsoli) {
      var cantidaitems = 0;
      var subtotalcompra = 0;
      var iva = 0;
      var totalcompra = 0;
      this.datoscompra.totalitems = 0;
      this.datoscompra.subtotal = 0;
      this.datoscompra.iva = 0;
      this.datoscompra.subtotal = 0;
      if (evento.target.value != "" || evento.target.value != 0) {
        this.detallecompras[posicion].preciounitario = 0;
        localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      }
      var subtotaltemp = 0;
      if (localStorage.getItem("storagedetcompras")) {
        this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
      }
      this.detallecompras[posicion].cantidad = evento.target.value;
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      // console.log(this.detallecompras);
      if ($("#costoreal" + posicion).val() != "" && $("#costoreal" + posicion).val() != 0) {
        subtotaltemp = evento.target.value * Number($("#costoreal" + posicion).val());
        this.subtotalmateria = subtotaltemp;
        this.detallecompras[posicion].subtotal = subtotaltemp;
        this.detallecompras[posicion].preciounitario = $("#costoreal" + posicion).val();
        localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
        // console.log(subtotaltemp);
      } else {
        this.detallecompras[posicion].subtotal = 0;
        localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      }
      // console.log("costo fila: ", $("#costoreal" + posicion).val());

      this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
      this.detallecompras.forEach(element => {
        cantidaitems = cantidaitems + parseInt(element['cantidad']);
        subtotalcompra = subtotalcompra + element['subtotal'];
      });
      this.datoscompra.totalitems = cantidaitems;
      this.datoscompra.subtotal = subtotalcompra.toFixed(2);
      iva = subtotalcompra * 0.13;
      this.datoscompra.iva = iva.toFixed(2);
      totalcompra = subtotalcompra + (subtotalcompra * 0.13);
      this.datoscompra.total = totalcompra.toFixed(2);
      this.datoscuentasxp.montocuota = 0;
      this.datoscuentasxp.numero_cuotas = 0;
      this.datoscuentasxp.cuotaspendientes = 0;
      this.datoscuentasxp.saldo = 0;
    } else {
      swal.fire("No puede ser mayor a la cantidad solicitada");
      $("#unidades" + posicion).val("");
      this.detallecompras[posicion].cantidad = 0;
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      this.datoscuentasxp.montocuota = 0;
      this.datoscuentasxp.numero_cuotas = 0;
      this.datoscuentasxp.cuotaspendientes = 0;
      this.datoscuentasxp.saldo = 0;
    }

  }

  setcostoreal(evento, posicion) {
    this.datoscompra.totalitems = 0;
    this.datoscompra.subtotal = 0;
    this.datoscompra.iva = 0;
    this.datoscompra.subtotal = 0;
    var cantidaitems = 0;
    var subtotalcompra = 0;
    var iva = 0;
    var totalcompra = 0;
    if (evento.target.value != "" || evento.target.value != 0) {
      this.detallecompras[posicion].preciounitario = 0;
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
    }
    var subtotaltemp = 0;
    if (localStorage.getItem("storagedetcompras")) {
      this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
    }
    this.detallecompras[posicion].preciounitario = parseFloat(evento.target.value);
    localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
    // console.log(this.detallecompras);
    if ($("#selectrecibida" + posicion).val() == "Completa") {
      this.subtotalmateria = Number($("#cantidadcompleta" + posicion).val()) * evento.target.value;
      this.detallecompras[posicion].subtotal = this.subtotalmateria;
      localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
    } else {
      if ($("#unidades" + posicion).val() != "" && $("#unidades" + posicion).val() != 0) {
        subtotaltemp = evento.target.value * Number($("#unidades" + posicion).val());
        this.subtotalmateria = subtotaltemp;
        this.detallecompras[posicion].subtotal = subtotaltemp;
        localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      } else {
        this.detallecompras[posicion].subtotal = 0;
        localStorage.setItem("storagedetcompras", JSON.stringify(this.detallecompras));
      }
    }

    this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
    this.detallecompras.forEach(element => {
      cantidaitems = cantidaitems + parseInt(element['cantidad']);
      subtotalcompra = subtotalcompra + element['subtotal'];
    });
    this.datoscompra.totalitems = cantidaitems;
    this.datoscompra.subtotal = subtotalcompra.toFixed(2);
    iva = subtotalcompra * 0.13;
    this.datoscompra.iva = iva.toFixed(2);
    totalcompra = subtotalcompra + (subtotalcompra * 0.13);
    this.datoscompra.total = totalcompra.toFixed(2);
    this.datoscuentasxp.montocuota = 0;
    this.datoscuentasxp.numero_cuotas = 0;
    this.datoscuentasxp.cuotaspendientes = 0;
    this.datoscuentasxp.saldo = 0;
  }

  calcularcuota(cantidad) {
    if (cantidad.target.value != "" && cantidad.target.value != 0 && this.datoscompra.total != 0) {
      var valorcuota = this.datoscompra.total / cantidad.target.value;
      this.datoscuentasxp.montocuota = valorcuota.toFixed(2);
      this.datoscuentasxp.numero_cuotas = cantidad.target.value;
      this.datoscuentasxp.cuotaspendientes = cantidad.target.value;
      this.datoscuentasxp.saldo = this.datoscompra.total;
      this.datoscuentasxp.deuda = this.datoscompra.total;
      this.datoscuentasxp.fecha_factura = this.datoscompra.fecha;
    } else {
      this.datoscuentasxp.montocuota = 0;
      this.datoscuentasxp.numero_cuotas = 0;
      this.datoscuentasxp.cuotaspendientes = 0;
      this.datoscuentasxp.saldo = 0;
      this.datoscuentasxp.deuda = 0;
      this.datoscuentasxp.fecha_factura = "";
    }
  }

  addperiodo(periodo) {
    this.datoscuentasxp.periodo = periodo.target.value;
  }

  guardarcompra() {
    console.log(this.datoscuentasxp);
    var items = 0
    var preciounit = 0
    var subtotal = 0
    this.detallecompras = JSON.parse(localStorage.getItem("storagedetcompras"));
    this.datoscompra.idproveedor = $("#idproveedor").val();
    this.datoscompra.tipocompra = $("#tipocompra").val();
    this.detallecompras.forEach(element => {
      items = items + Number(element['cantidad']);
      preciounit = preciounit + Number(element['preciounitario']);
      subtotal = subtotal + Number(element['subtotal']);
    });

    if (items != 0 && preciounit != 0 && subtotal != 0 && this.datoscompra.fecha != "" && this.datoscompra.numerofactura != ""
      && this.datoscompra.tipocompra != null && ((this.datoscompra.tipocompra == "CREDITO" && this.datoscuentasxp.numero_cuotas != 0 && this.datoscuentasxp.montocuota != 0) || (this.datoscompra.tipocompra == "CONTADO" || this.visible == false))) {
      this.nF = this.datoscompra.numerofactura;
      this.compraservice.guardarCompra(this.datoscompra).subscribe({
        next: (respuesta) => {
          if (this.datoscuentasxp.montocuota != 0 && this.datoscuentasxp.deuda != 0) {
            this.datoscuentasxp.id_compra = respuesta["idcompra"];
            this.guardarcxp();

          }
          this.guardarDetalleCompra(respuesta["idcompra"]);
        }, error: (error) => {
          console.log("error", error)
        }

      });
    } else {
      swal.fire("Debe ingresar datos para registrar la compra");
    }
  }
  guardarcxp() {
    this.cuentasservice.guardarCuentaPagar(this.datoscuentasxp).subscribe({
      next: (respuesta) => {
        swal.fire(respuesta.mensaje);
        this.datoscuentasxp.fecha_factura = "";
        this.datoscuentasxp.numero_cuotas = 0;
        this.datoscuentasxp.montocuota = 0;
        this.datoscuentasxp.deuda = 0;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }
  guardarDetalleCompra(idcompra) {
    var finalizada = 0;
    var controlalert = 0;
    this.detallecompras.forEach(element => {
      if (element['cantidad'] > 0 && (element['preciounitario'] > 0 || element['preciounitario'] != null) && element['subtotal'] > 0) {
        controlalert++;
        this.detalledata.forEach(elementorg => {
          if (element['idmateria'] == elementorg['id_mp'] && element['cantidad'] == elementorg['cantidaddetalle']) {
            finalizada++;
          }
        });
      }
    });
    // console.log("tamanio de arr:", this.detalledata.length);
    // console.log("tamanio de final:", finalizada);
    var recorrido = 0;
    this.detallecompras.forEach(element => {
      if (element['cantidad'] > 0 && (element['preciounitario'] > 0 || element['preciounitario'] != null) && element['subtotal'] > 0) {
        recorrido++;
        this.contadorArreglo.push(element['cantidad']);
        var detalleco = {
          "id_compra": idcompra,
          "id_mp": element['idmateria'],
          "descripcion": "sin descripcion",
          "cantidad": element['cantidad'],
          "precio_unitario": element['preciounitario'],
          "subtotal": element['subtotal']
        }

        this.compraservice.guardarDetalleCompra(detalleco).subscribe({
          next: (respuesta) => {

            //actualizar stok
            this.actuaStock.push(detalleco)
            this.contador = this.contadorArreglo.length;
            this.contador1++;
             console.log(this.contador);
             console.log(this.contador1);
            if (this.contador === this.contador1) {
              this.actualizarStock();

            }
            var dataupdate = {
              "id_ordencompra": this.idordencompra,
              "cantidad": element['cantidad'],
              "idmateria": element['idmateria']
            }
            this.actualizarorden(dataupdate, finalizada, controlalert, recorrido);
            //fin
            // swal.fire(respuesta['mensaje']);
            localStorage.removeItem("storagedetcompras");
            // this.router.navigateByUrl('dashboard/lista-orden-compra');
          }, error: (error) => {
            console.log("error", error)
          }
        });

      }

    });
    if (this.detalledata.length == finalizada) {
      // console.log("entrando en finalizar-> valor de contador final:", finalizada);
      var datafin = {
        "id_ordencompra": this.idordencompra
      }
      this.finalizarorden(datafin);
    }

  }
  actualizarorden(dataupdate, finalizada, controlalert, recorrido) {
    this.compraservice.actualizardetalleoc(dataupdate).subscribe({
      next: (respuesta) => {
        // console.log(":",this.detalledata.length, ":", finalizada, ":",controlalert, ":", recorrido);
        if (this.detalledata.length > finalizada && controlalert == recorrido) {
          swal.fire("Exito", "La compra ha sido guardada", "success");
          this.router.navigateByUrl('dashboard/lista-orden-compra');
        }
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }


  finalizarorden(datafin) {
    this.compraservice.finalizarorden(datafin).subscribe({
      next: (respuesta) => {
        swal.fire("Exito", "La compra ha sido guardada", "success");
        this.router.navigateByUrl('dashboard/lista-orden-compra');
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }



  //actualizar stok
  actualizarStock() {//fin
    // console.log(this.actuaStock);

    this.numeroK = this.actuaStock.length;
    // console.log(this.numeroK);

    for (const a of this.actuaStock) {
      this.ultimoid();
      // console.log(a['cantidad']);

      this.idMAP = a['id_mp'];

      this.service.find(this.idMAP).subscribe((data: Materiaprima) => {

        this.materiaprima = data;
        // console.log(this.materiaprima);



        this.formKardex.patchValue({ entradas: a['cantidad'] });
        this.exis = parseFloat(a['cantidad']) + this.materiaprima.cantidad;
        this.formKardex.patchValue({ inv_final: this.exis });
        this.formKardex.patchValue({ descripcion: 'Entrada de la compra # ' + this.nF })

        const id_kardex = this.idk++;

        const id_mp = this.materiaprima.id_mp;

        // Crear un objeto con ambos datos
        const datosCombinados = { id_kardex, id_mp };

        // Agregar el objeto al arreglo
        this.datos2.push(datosCombinados);

        //console.log(this.formKardex.value);
        this.service.agregarStock(this.materiaprima.id_mp, this.exis).subscribe(res => {

        });

        this.kardexmpS.create(this.formKardex.value).subscribe(res => {
          this.numeroK2++;
        
          if (this.numeroK === this.numeroK2) {
            this.getAll();
            this.mpkardex();
            
              //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva compra'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

          }

        });






      });

    }

  }


  mpkardex() {
    this.notificacion();

    for (const m of this.datos2) {
      //console.log(m);


      //this.formMpKar.patchValue({id_kardex: m['id_kardex']});
      //     this.formMpKar.patchValue({id_mp: m['id_mp']});

      //console.log(this.formMpKar.value);
      this.mpKS.create(m).subscribe(res => {
      });
    }
  }

  ultimoid() {

    //ultimo id
    this.kardexmpS.ultimo_id().subscribe((data: Kardexmp) => {
      this.kardexmp = data;

      this.idk = this.kardexmp.id_kardex + 1;

    });
  }


  getAll(): void {
    this.service.getAll().subscribe((data: Materiaprima[]) => {
      this.mp = data;


    });


  }



  notificacion() {
    //console.log(this.mp);
    this.notificationService.clearProducts();
    //this.n=[];
    for (const m of this.mp) {

      if (m.cantidad <= m.stock_minimo) {
        this.n.push(m);
      }
    }
    //  console.log(this.n);
    this.notificationService.addNotification(this.n);

  }




}
