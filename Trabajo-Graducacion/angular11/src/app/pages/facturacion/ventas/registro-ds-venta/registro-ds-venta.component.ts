import { Component, OnInit } from '@angular/core';
import { VentaService } from '../ventaservice/venta.service';
import { ClienteService } from '../../clienteservice/cliente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NotificacionPTSService } from '../../../../shared/header/notificacion-pts.service';
import { ProductosTerminadosService } from '../../../inventario_prod_final/producto_final/services/productos-terminados.service';
import { ProductosTerminados } from '../../../inventario_prod_final/producto_final/productos_terminados';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registro-ds-venta',
  templateUrl: './registro-ds-venta.component.html',
  styleUrls: ['./registro-ds-venta.component.css']
})
export class RegistroDsVentaComponent implements OnInit {
  formdevolucion: FormGroup;
  listaclientes: any[] = [];
  listaventas: any[] = [];
  listadetalleventa: any[] = [];
  arreglodetalle: any[] = [];
  arreglotemporal: any[] = [];
  cliente: number;
  arreglodisponible: any[] = [];
  disponibleproducto: number;
  numerofactura: "";

  productodevolver: any = {
    idventa: 0,
    fecha: "",
    motivo: "",
    observaciones: "",
    totalitems: 0,
    total: 0
  }
  prod: ProductosTerminados[] = [];
  pr: ProductosTerminados[] = [];
  bandera3: number = 0;
  bandera4: number = 0;
  selectedDate: string;
  ///bita
  bitacora: Usuarios;
  bitacora2: any;
  id_bitacora: number;
  arr: any[] = [];
  constructor(public ventaservice: VentaService, private router: Router, private notificationService: NotificacionPTSService,
    private prodS: ProductosTerminadosService, public clienteservice: ClienteService,
    private bitacoraS: BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {
    this.formdevolucion = new FormGroup({
      fechadev: new FormControl('', [Validators.required]),
      motivo: new FormControl('', [Validators.required])
    });
    this.listarclientes();
    localStorage.removeItem("ventacheck");
    localStorage.removeItem("detalleproducto");
    this.productodevolver.fecha = this.selectedDate = new Date().toISOString().substring(0, 10);
  }

  get f() {
    return this.formdevolucion.controls;
  }

  listarclientes() {
    this.clienteservice.getClientes().subscribe({
      next: (respuesta) => {
        this.listaclientes = respuesta.listadoclientes;
        // console.log("respuesta", this.listaproveedores)
      }, error: (error) => {
        console.log("error", error)
      }

    });
  }

  cargarventas(evento) {
    var dataid = {
      "id_cliente": evento.target.value
    }
    this.ventaservice.cargarventacliente(dataid).subscribe({
      next: (respuesta) => {
        this.listaventas = respuesta.ventascliente;
      }, error: (error) => {
        console.log("error", error)
      }
    });
    this.listadetalleventa = [];
    localStorage.removeItem("detalleproducto");
    localStorage.removeItem("ventacheck");
  }
  cargardetalleventa(evento, posicion) {
    if (evento.target.checked) {
      if (localStorage.getItem("ventacheck")) {
        $("#checkcompra" + posicion).prop("checked", false);
      } else {
        var dataid = {
          "id_venta": evento.target.value
        }
        // this.n_facturaC(evento.target.value);
        this.listadetalleventa = [];
        this.arreglotemporal = [];
        this.ventaservice.cargarventadetalledev(dataid).subscribe({
          next: (respuesta) => {
            // console.log("respuesta", respuesta)
            this.listadetalleventa = respuesta.detalleventas;
            this.listadetalleventa.forEach(element => {
              this.numerofactura = element.n_factura;
              this.productodevolver.idventa = element.id_venta;
              let fila = {
                id_producto: element.id_producto,
                cantidad: 0,
                cantidadhabil: element.dvdisponible,
                preciounitario: 0,
                subtotal: 0
              };
              this.arreglotemporal.push(fila);
              localStorage.setItem("detalleproducto", JSON.stringify(this.arreglotemporal));
              this.productodevolver.idventa = element.id_venta;
            });
          }, error: (error) => {
            console.log("error", error)
          }
        });
        localStorage.setItem("ventacheck", JSON.stringify(1));
      }
    } else {
      this.productodevolver.idventa = 0;
      localStorage.removeItem("productocheck");
      localStorage.removeItem("ventacheck");
      this.arreglotemporal = [];
      this.listadetalleventa = [];
      this.productodevolver.totalitems = 0;
      this.productodevolver.total = 0;
      localStorage.removeItem("detalleproducto");
    }
  }
  checkproducto(evento, posicion) {
    var cantidaditems = 0;
    var subtotal = 0;
    var total = 0;
    if (evento.target.checked) {
      $("#cant_devolver" + posicion).prop("disabled", false);
      // volviendo a sumar el detalle de los productos
      this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
      this.arreglotemporal.forEach(element => {
        if (element['cantidad'] != 0) {
          cantidaditems = cantidaditems + Number(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);
        }
      });
      total = total + subtotal;
      this.productodevolver.totalitems = cantidaditems;
      this.productodevolver.total = total.toFixed(2);
    } else {
      this.productodevolver.totalitems = 0;
      this.productodevolver.total = 0;
      this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
      this.arreglotemporal[posicion].cantidad = 0;
      this.arreglotemporal[posicion].preciounitario = 0;
      this.arreglotemporal[posicion].subtotal = 0;
      localStorage.setItem("detalleproducto", JSON.stringify(this.arreglotemporal));
      $("#cant_devolver" + posicion).val("");
      $("#cant_devolver" + posicion).prop("disabled", true);
      // volviendo a sumar el detalle de los productos
      this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
      this.arreglotemporal.forEach(element => {
        if (element['cantidad'] != 0) {
          cantidaditems = cantidaditems + Number(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);
        }
      });
      total = total + subtotal;
      this.productodevolver.totalitems = cantidaditems;
      this.productodevolver.total = total.toFixed(2);
    }

  }
  cantidadevolver(evento, posicion) {
    this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
    var dataid = {
      "id_producto": this.arreglotemporal[posicion].id_producto
    }
    this.ventaservice.getprecioproducto(dataid).subscribe({
      next: (respuesta) => {
        this.disponibleproducto = respuesta.precioproducto.cantidad;
      }, error: (error) => {
        console.log("error", error)
      }
    });
    var cantidaditems = 0;
    var subtotal = 0;
    var total = 0;
    if (evento.target.value <= this.arreglotemporal[posicion].cantidadhabil && evento.target.value > 0) {
      this.productodevolver.totalitems = 0;
      this.productodevolver.total = 0;
      if (evento.target.value != "" || evento.target.value != 0) {
        this.arreglotemporal[posicion].cantidad = evento.target.value;
        this.arreglotemporal[posicion].preciounitario = Number($("#precioproducto" + posicion).val());
        var subttemp = evento.target.value * Number($("#precioproducto" + posicion).val());
        this.arreglotemporal[posicion].subtotal = subttemp.toFixed(2);
        $("#subtotal" + posicion).val(this.arreglotemporal[posicion].subtotal);
        localStorage.setItem("detalleproducto", JSON.stringify(this.arreglotemporal));
        this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
        this.arreglotemporal.forEach(element => {
          cantidaditems = cantidaditems + parseInt(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);

        });
        total = total + subtotal;
        this.productodevolver.totalitems = cantidaditems;
        this.productodevolver.total = total.toFixed(2);
      } else {
        this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
        this.arreglotemporal[posicion].cantidad = 0;
        localStorage.setItem("detalleproducto", JSON.stringify(this.arreglotemporal));
      }
    } else {
      swal.fire("Advertencia!", "No debe sobrepasar la cantidad correspondiente a la venta de este producto para poder devolver", "warning");
      $("#cant_devolver" + posicion).val("");
      this.arreglotemporal[posicion].cantidad = 0;
      this.arreglotemporal[posicion].subtotal = 0;
      $("#subtotal" + posicion).val(0);
      localStorage.setItem("detalleproducto", JSON.stringify(this.arreglotemporal));
      this.productodevolver.totalitems = 0;
      this.productodevolver.total = 0;
      // volviendo a sumar el detalle de los productos
      this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
      this.arreglotemporal.forEach(element => {
        if (element['cantidad'] != 0) {
          cantidaditems = cantidaditems + Number(element['cantidad']);
          subtotal = subtotal + Number(element['subtotal']);
        }
      });
      total = total + subtotal;
      this.productodevolver.totalitems = cantidaditems;
      this.productodevolver.total = total.toFixed(2);
    }
  }

  guardardevolucion() {
    // this.productodevolver.observaciones = $("#observaciones").val();
    this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
    if (this.arreglotemporal != null) {
      var items = 0
      var subtotal = 0
      // this.productodevolver.observaciones = $("#observaciones").val();
      this.arreglotemporal = JSON.parse(localStorage.getItem("detalleproducto"));
      this.arreglotemporal.forEach(element => {
        items = items + Number(element['cantidad']);
        subtotal = subtotal + Number(element['subtotal']);
      });
      if (subtotal != 0 && this.productodevolver.fecha != "" && this.productodevolver.motivo != "") {
        this.ventaservice.guardardevolucion(this.productodevolver).subscribe({
          next: (respuesta) => {
            // console.log("respuesta", respuesta)
            this.guardarDevolucionVenta(respuesta["iddetdventa"]);
          }, error: (error) => {
            console.log("error", error)
          }
        });
      } else {
        swal.fire("Advertencia", "Debe Completar los campos para registrar la devolución", "warning");
      }
    } else {
      swal.fire("Advertencia", "Debe Completar los campos para registrar la devolución", "warning");
    }
  }
  guardarDevolucionVenta(devolucion) {
    var cantregistros = this.arreglotemporal.length;
    var idkardex = 0;
    var recorridoreg = 0;
    var cantidadactual = 0;
    this.arreglotemporal.forEach(element => {
      recorridoreg++;
      if (element['cantidad'] > 0 && element['preciounitario'] > 0 && element['subtotal'] > 0) {

        var detalleve = {
          "iddventa": devolucion,
          "idproducto": element['id_producto'],
          "cantidad": element['cantidad'],
          "precio_unitario": element['preciounitario'],
          "subtotal": element['subtotal']
        }
        this.ventaservice.guardarDetDevVenta(detalleve).subscribe({
          next: (respuesta) => {
            ///////
            this.ventaservice.consultarstock(detalleve).subscribe({
              next: (respuesta) => {
                respuesta.dataproducto.forEach(element => {
                  cantidadactual = element.cantidad;
                });
                var invfinal = cantidadactual + Number(element['cantidad']);
                var arreglokardex = {
                  "descripcion": "Entrada por Devolucion de venta factura #" + this.numerofactura,
                  "fecha": this.productodevolver.fecha,
                  "entrada": element['cantidad'],
                  "inv_final": invfinal
                }
                // guardando datos en kardexprod
                this.ventaservice.registrakardexin(arreglokardex).subscribe({
                  next: (respuesta) => {
                    idkardex = respuesta.idkardex;
                    console.log('kardex now', idkardex);
                    // guardando tabla intermedia
                    var arreglointer = {
                      "idproducto": element['id_producto'],
                      "idkardexprod": idkardex
                    }
                    console.log('arreglo inter:', arreglointer);
                    this.ventaservice.interkardxproducto(arreglointer).subscribe({
                      next: (respuesta) => {
                        console.log(respuesta.mensaje);
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
                  "idproducto": element['id_producto'],
                  "cantidad": invfinal
                }

                this.arr.push(arreglostock);
                this.bandera3 = this.arr.length;
                this.ventaservice.actualizarstpt(arreglostock).subscribe({
                  next: (respuesta) => {
                    this.bandera4++;
                    console.log(this.bandera4);
                    console.log(this.bandera3);
                    if (this.bandera3 === this.bandera4) {
                      this.getAll();
                      //bitacora

                      this.bitacora = this.loginS.userValue;

                      this.bitacora2 = this.bitacora['bitacora']
                      this.id_bitacora = this.bitacora2['id_bitacora'];

                      const detalle = {
                        id_bitacora: this.id_bitacora,
                        acciones: 'Realizo una nueva dev. s/ venta'
                        // Agrega aquí otros campos si es necesario
                      };

                      this.bitacoraS.create(detalle).subscribe(res => {
                      });
                      //fin bitacora
                    }


                  }, error: (error) => {
                    console.log("error", error)
                  }
                });

              }, error: (error) => {
                console.log("error", error)
              }
            });
            ///////
            if (cantregistros == recorridoreg) {
              swal.fire("Exito", "La devolucion de venta ha sido realizada", "success");
            }

            // swal.fire("Exito", "La devolucion de venta ha sido realizada", "success");
            localStorage.removeItem("detalleproducto");
            localStorage.removeItem("ventacheck");
            localStorage.removeItem("productocheck");
            this.router.navigateByUrl('dashboard/lista-ds-venta');
          }, error: (error) => {
            console.log("error", error)
          }
        });
      }
    });
  }

  getAll(): void {
    this.prodS.getAll().subscribe((data: ProductosTerminados[]) => {
      this.prod = data;
      this.notificacion();
    });
  }
  notificacion() {
    //console.log(this.mp);
    this.notificationService.clearProducts();
    //this.n=[];
    for (const m of this.prod) {
      if (m.cantidad <= m.stock_minimo) {
        this.pr.push(m);
      }
    }
    //  console.log(this.n);
    this.notificationService.addNotificationPT(this.pr);

  }

}
