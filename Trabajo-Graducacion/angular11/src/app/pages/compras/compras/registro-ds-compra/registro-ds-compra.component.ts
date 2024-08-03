import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CompraService } from './../servicios/compra.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

///

import { MateriaprimaService } from '../../../inventarios/materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../../inventarios/materiaprima/materiaprima';

import { KardexmpService } from '../../../kardex-mat-prima/services/kardexmp.service';
import { Kardexmp } from '../../../kardex-mat-prima/kardexmp';

import { MpkardexService } from '../../../kardex-mat-prima/services/mpkardex.service';
import { Mpkardexmp } from '../../../kardex-mat-prima/mpkardexmp';
import { NavServiceService } from '../../../../shared/header/nav-service.service';
import { ToastrService } from 'ngx-toastr';
import { Compra } from '../compra';

//

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registro-ds-compra',
  templateUrl: './registro-ds-compra.component.html',
  styleUrls: ['./registro-ds-compra.component.css']
})
export class RegistroDsCompraComponent implements OnInit {
  formdevolucion: FormGroup;
  listaproveedores: any[] = [];
  listacompras: any[] = [];
  listadetallecompra: any[] = [];
  arreglodetalle: any[] = [];
  arreglotemporal: any[] = [];
  proveedor: number;
  arreglodisponible: any[] = [];
  disponiblemateria: number;

  //
  actuaStock = [];
  contador = 0;
  contador1 = 0;
  formKardex: FormGroup;
  materiaprima: Materiaprima;
  compK: Compra;
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
  materiadevolver: any = {
    idcompra: 0,
    fecha: "",
    motivo: "",
    observaciones: "",
    totalitems: 0,
    total: 0
  }
  dtOptions: any = {};
  dtTrigger = new Subject();

  ///bita
  bitacora: Usuarios;
  bitacora2: any;
  id_bitacora: number;
  constructor(public compraservice: CompraService, private router: Router, private service: MateriaprimaService,
    private kardexmpS: KardexmpService, private mpKS: MpkardexService, private notificationService: NavServiceService, private toastr: ToastrService,
    private bitacoraS: BitacoraService, private loginS: LoginService) {
    this.materiaprima = new Materiaprima();
    this.kardexmp = new Kardexmp();
    this.compK = new Compra();
  }
  ngOnInit(): void {
    this.formdevolucion = new FormGroup({
      fechadev: new FormControl('', [Validators.required]),
      motivo: new FormControl('', [Validators.required])
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

    this.dtOptions = {
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
    this.listarProveedores();
    localStorage.removeItem("pedidoCarrito");
    localStorage.removeItem("compracheck");
    localStorage.removeItem("materiacheck");
    localStorage.removeItem("detallemateria");
    localStorage.removeItem("storagedetcompras");
    this.materiadevolver.fecha = this.selectedDate = new Date().toISOString().substring(0, 10);

  }
  get f() {
    return this.formdevolucion.controls;
  }
  listarProveedores() {
    this.compraservice.getProveedores().subscribe({
      next: (respuesta) => {
        this.listaproveedores = respuesta.proveedores;
        // console.log("respuesta", this.listaproveedores)
      }, error: (error) => {
        console.log("error", error)
      }

    });
  }
  cargarcompras(evento) {
    // console.log(evento.target.value);
    // console.log(evento.target.checked);
    var dataid = {
      "id_proveedor": evento.target.value
    }
    this.compraservice.cargarcompraproveedor(dataid).subscribe({
      next: (respuesta) => {
        // console.log("respuesta", respuesta)
        this.listacompras = respuesta.comprasproveedor;
        // console.log(respuesta.precioresult.precio_unitario);
      }, error: (error) => {
        console.log("error", error)
      }
    });
    this.listadetallecompra = [];
  }
  cargardetallecompra(evento, posicion) {
    // console.log(evento.target.value);
    // console.log(evento.target.checked);
    // localStorage.removeItem("compracheck");
    if (evento.target.checked) {
      if (localStorage.getItem("compracheck")) {
        $("#checkcompra" + posicion).prop("checked", false);
      } else {
        var dataid = {
          "id_compra": evento.target.value
        }
        this.n_facturaC(evento.target.value);
        this.listadetallecompra = [];
        this.arreglotemporal = [];
        this.compraservice.cargarcompradetalledev(dataid).subscribe({
          next: (respuesta) => {
            // console.log("respuesta", respuesta)
            this.listadetallecompra = respuesta.detallecompras;
            this.listadetallecompra.forEach(element => {
              this.materiadevolver.idcompra = element.id_compra;
              let fila = {
                id_materia: element.id_mp,
                cantidad: 0,
                cantidadhabil: element.dvdisponible,
                preciounitario: 0,
                subtotal: 0
              };
              this.arreglotemporal.push(fila);
              localStorage.setItem("detallemateria", JSON.stringify(this.arreglotemporal));
              this.materiadevolver.idcompra = element.id_compra;
            });
          }, error: (error) => {
            console.log("error", error)
          }
        });
        localStorage.setItem("compracheck", JSON.stringify(1));
      }
    } else {
      this.materiadevolver.idcompra = 0;
      localStorage.removeItem("materiacheck");
      localStorage.removeItem("compracheck");
      this.arreglotemporal = [];
      this.listadetallecompra = [];
      this.materiadevolver.totalitems = 0;
      this.materiadevolver.total = 0;
      localStorage.removeItem("detallemateria");
    }
  }
  checkmaterial(evento, posicion) {
    var cantidaditems = 0;
    var subtotal = 0;
    var total = 0;
    if (evento.target.checked) {
      $("#cant_devolver" + posicion).prop("disabled", false);

      // volviendo a sumar el detalle de los productos
      this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
      this.arreglotemporal.forEach(element => {
        if (element['cantidad'] != 0) {
          cantidaditems = cantidaditems + Number(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);
        }
      });
      total = total + subtotal;
      this.materiadevolver.totalitems = cantidaditems;
      this.materiadevolver.total = total.toFixed(2);
    } else {
      this.materiadevolver.totalitems = 0;
      this.materiadevolver.total = 0;
      this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
      this.arreglotemporal[posicion].cantidad = 0;
      this.arreglotemporal[posicion].preciounitario = 0;
      this.arreglotemporal[posicion].subtotal = 0;
      localStorage.setItem("detallemateria", JSON.stringify(this.arreglotemporal));
      $("#cant_devolver" + posicion).val("");
      $("#cant_devolver" + posicion).prop("disabled", true);

      // volviendo a sumar el detalle de los productos
      this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
      this.arreglotemporal.forEach(element => {
        if (element['cantidad'] != 0) {
          cantidaditems = cantidaditems + Number(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);
        }
      });
      total = total + subtotal;
      this.materiadevolver.totalitems = cantidaditems;
      this.materiadevolver.total = total.toFixed(2);
    }

  }
  cantidadevolver(evento, posicion) {
    this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
    var dataid = {
      "id_mp": this.arreglotemporal[posicion].id_materia
    }
    this.compraservice.buscarprecio(dataid).subscribe({
      next: (respuesta) => {
        this.disponiblemateria = respuesta.precioresult.cantidad;
      }, error: (error) => {
        console.log("error", error)
      }
    });
    var cantidaditems = 0;
    var subtotal = 0;
    var total = 0;
    if (evento.target.value <= this.arreglotemporal[posicion].cantidadhabil && evento.target.value <= this.disponiblemateria && evento.target.value != "") {

      this.materiadevolver.totalitems = 0;
      this.materiadevolver.total = 0;
      if (evento.target.value != "" || evento.target.value != 0) {
        this.arreglotemporal[posicion].cantidad = evento.target.value;
        this.arreglotemporal[posicion].preciounitario = Number($("#preciomateria" + posicion).val());
        var subttemp = evento.target.value * Number($("#preciomateria" + posicion).val());
        this.arreglotemporal[posicion].subtotal = subttemp.toFixed(2);
        $("#subtotal" + posicion).val(this.arreglotemporal[posicion].subtotal);
        localStorage.setItem("detallemateria", JSON.stringify(this.arreglotemporal));
        this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
        this.arreglotemporal.forEach(element => {
          cantidaditems = cantidaditems + parseInt(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);

        });
        total = total + subtotal;
        this.materiadevolver.totalitems = cantidaditems;
        this.materiadevolver.total = total.toFixed(2);
      } else {
        this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
        this.arreglotemporal[posicion].cantidad = 0;
        localStorage.setItem("detallemateria", JSON.stringify(this.arreglotemporal));
      }
    } else {
      swal.fire("Advertencia!", "No existe la cantidad necesaria en stock para devolver", "warning");
      $("#cant_devolver" + posicion).val("");
      this.arreglotemporal[posicion].cantidad = 0;
      this.arreglotemporal[posicion].subtotal = 0;
      $("#subtotal" + posicion).val(0);
      localStorage.setItem("detallemateria", JSON.stringify(this.arreglotemporal));
      this.materiadevolver.totalitems = 0;
      this.materiadevolver.total = 0;
      // volviendo a sumar el detalle de los productos
      this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
      this.arreglotemporal.forEach(element => {
        if (element['cantidad'] != 0) {
          cantidaditems = cantidaditems + Number(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);
        }
      });
      total = total + subtotal;
      this.materiadevolver.totalitems = cantidaditems;
      this.materiadevolver.total = total.toFixed(2);
    }
  }

  guardardevolucion() {
    this.materiadevolver.observaciones = $("#observaciones").val();
    this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
    if (this.arreglotemporal != null) {
      // console.log(this.materiadevolver);
      // console.log(JSON.parse(localStorage.getItem("detallemateria")));
      var items = 0
      var subtotal = 0
      this.materiadevolver.observaciones = $("#observaciones").val();
      this.arreglotemporal = JSON.parse(localStorage.getItem("detallemateria"));
      this.arreglotemporal.forEach(element => {
        items = items + Number(element['cantidad']);
        subtotal = subtotal + Number(element['subtotal']);
      });
      if (subtotal != 0 && this.materiadevolver.fecha != "" && this.materiadevolver.motivo != "") {
        this.compraservice.guardardevolucion(this.materiadevolver).subscribe({
          next: (respuesta) => {
            // console.log("respuesta", respuesta)
            this.guardarDevolucionCompra(respuesta["idddev"]);
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else {
        swal.fire("Advertencia!", "Debe ingresar datos para registrar la devolución", "warning");
      }
    } else {
      swal.fire("Advertencia!", "Debe ingresar datos para registrar la devolución", "warning");
    }
  }
  guardarDevolucionCompra(devolucion) {
    this.arreglotemporal.forEach(element => {
      if (element['cantidad'] > 0 && element['preciounitario'] > 0 && element['subtotal'] > 0) {
        this.contadorArreglo.push(element['cantidad']);

        var detalleco = {
          "id_dcompra": devolucion,
          "id_mp": element['id_materia'],
          "cantidad": element['cantidad'],
          "precio_unitario": element['preciounitario'],
          "subtotal": element['subtotal']
        }
        this.compraservice.guardarDevolucionCompra(detalleco).subscribe({
          next: (respuesta) => {

            //actualizar stok
            this.actuaStock.push(detalleco);

            this.contador = this.contadorArreglo.length;
            // console.log(this.contador);

            this.contador1++;
            // console.log(this.contador1);




            if (this.contador === this.contador1) {
              this.actualizarStock();

            }

            //fin


            swal.fire("Exito", "La devolución de compra ha sido realizada", "success");
            localStorage.removeItem("detallemateria");
            localStorage.removeItem("compracheck");
            localStorage.removeItem("materiacheck");
            localStorage.removeItem("detallemateria");
            this.router.navigateByUrl('dashboard/dev_sob_compra');
          }, error: (error) => {
            console.log("error", error)
          }



        });
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



        this.formKardex.patchValue({ salida: a['cantidad'] });
        this.exis = this.materiaprima.cantidad - parseFloat(a['cantidad']);
        this.formKardex.patchValue({ inv_final: this.exis });
        this.formKardex.patchValue({ descripcion: 'Dev. S/ Compra de la compra # ' + this.nF })

        const id_kardex = this.idk++;

        const id_mp = this.materiaprima.id_mp;

        // Crear un objeto con ambos datos
        const datosCombinados = { id_kardex, id_mp };

        // Agregar el objeto al arreglo
        this.datos2.push(datosCombinados);

        console.log(this.formKardex.value);
        this.service.agregarStock(this.materiaprima.id_mp, this.exis).subscribe(res => {

        });

        this.kardexmpS.create(this.formKardex.value).subscribe(res => {
          this.numeroK2++;
          // console.log(this.numeroK2);

          if (this.numeroK === this.numeroK2) {
            this.getAll();
            this.mpkardex();

            //bitacora
            this.bitacora = this.loginS.userValue;

            this.bitacora2 = this.bitacora['bitacora']
            this.id_bitacora = this.bitacora2['id_bitacora'];

            const detalle = {
              id_bitacora: this.id_bitacora,
              acciones: 'Realizo una nueva dev. s/ compra'
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

    for (const m of this.datos2) {
      // console.log(m);


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
      // console.log(this.mp);
      this.notificacion();

    });


  }



  notificacion() {

    // console.log(this.mp);
    this.notificationService.clearProducts();
    //this.n=[];
    for (const m of this.mp) {

      if (m.cantidad <= m.stock_minimo) {
        this.n.push(m);
        this.verN(m.id_mp);

      }
    }
    // console.log(this.mp);
    this.notificationService.addNotification(this.n);

  }

  verN(id_mp) {
    this.materiaprima = new Materiaprima();
    console.log(id_mp);
    this.service.find(id_mp).subscribe((data: Materiaprima) => {
      this.materiaprima = data;
      this.toastr.info(`El material: "${this.materiaprima.nombre_producto}" ha llegado al stock mínimo`, 'Stock actual: "' + this.materiaprima.cantidad + '"');
      // console.log(this.materiaprima);


    });
  }

  n_facturaC(id_compra) {
    this.mpKS.getCompras(id_compra).subscribe((data: Compra) => {
      this.compK = data;
      this.nF = this.compK.n_factura;
      // console.log(this.nF);

    });

  }
  /////////////////////

}
