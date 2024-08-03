import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CompraService } from './../servicios/compra.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

declare const $: any;
@Component({
  selector: 'app-registrar-orden-compra',
  templateUrl: './registrar-orden-compra.component.html',
  styleUrls: ['./registrar-orden-compra.component.css']
})
export class RegistrarOrdenCompraComponent implements OnInit {
  listaproveedores: any[] = [];
  listamateriaprima: any[] = [];
  arreglodetalle: any[] = [];
  arreglostorage: any[] = [];
  arreglodetalleoc: any[] = [];
  form: FormGroup;
  countfilas: number;

  proveedor: null;
  materiaprima: null;
  descripcion: "";
  subtotal: number;
  nombremateria: "";
  precio: number;
  cantidad: number;
  datostotal: any = {
    totalorden: 0,
    fecha: "",
    proveedorid: ""
  };

  datosvariables: any = {
    sumacolumna: 0,
    totalitems: 0,
    totalmoney: 0,
    posiciones: 0
  }

  items: number;
  dtOptions: any = {};
  dtTrigger = new Subject();
  selectedDate: string;
  ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(public compraservice: CompraService, private router: Router,  private bitacoraS:BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      fechaform: new FormControl('', [Validators.required]),
      proveedorform: new FormControl('', [Validators.required]),
      materiaform: new FormControl('', [Validators.required]),
      cantidadform: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      descripcionform: new FormControl('', [Validators.required]),
      preciounit: new FormControl('', [Validators.required, Validators.pattern("^[0-9-.]*$")]),
    });
    this.listarProveedores();
    this.listarMPrima();
    this.dibujardetalle(1);
    localStorage.removeItem("storagedetcompras");
    if (JSON.parse(localStorage.getItem("detallecompra")) != null) {
      this.arreglodetalle = JSON.parse(localStorage.getItem("detallecompra"));
    }
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
    this.datostotal.fecha = this.selectedDate = new Date().toISOString().substring(0, 10);
  }

  dibujardetalle(evento) {
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
    this.datostotal.totalorden = 0;
    this.items = 0;
    var datamoney = 0;
    if (JSON.parse(localStorage.getItem("detallecompra")) != null) {
      this.arreglodetalleoc = JSON.parse(localStorage.getItem("detallecompra"));
      if (evento == 2) {
        this.arreglodetalle = [];
        this.arreglodetalleoc = [];
        localStorage.removeItem("detallecompra");
      } else {
        this.arreglodetalleoc.forEach(element => {
          this.items = this.items + Number(element['cantidad']);
          datamoney = datamoney + Number(element['subtotal']);
          this.datostotal.totalorden = datamoney.toFixed(2);
        });
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  listarProveedores() {
    this.compraservice.getProveedores().subscribe({
      next: (respuesta) => {
        this.listaproveedores = respuesta.proveedores;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }


  listarMPrima() {
    this.compraservice.getMateriaPrima().subscribe({
      next: (respuesta) => {
        this.listamateriaprima = respuesta.materiaprima;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }




  anadirProducto() {
    this.items = 0;
    this.datostotal.totalorden = 0;
    if (localStorage.getItem("detallecompra")) {

      this.arreglodetalle = JSON.parse(localStorage.getItem("detallecompra"));
      var posicion = 0;
      var repetido = 0;
      this.arreglodetalle.forEach(element => {
        var subtotalmoney = 0;
        if (element['materiaid'] == $("#mtp").val()) {
          // this.subtotal = this.precio * this.cantidad;
          subtotalmoney = this.precio * this.cantidad;
          subtotalmoney = Number(subtotalmoney.toFixed(2));
          this.arreglodetalle[posicion].cantidad = Number(element['cantidad']) + this.cantidad;
          var totaldup = Number(element['subtotal']) + subtotalmoney;
          this.arreglodetalle[posicion].subtotal = totaldup.toFixed(2);
          localStorage.setItem("detallecompra", JSON.stringify(this.arreglodetalle));
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
        this.listamateriaprima.forEach(element => {
          if (element['id_mp'] == $("#mtp").val()) {
            this.nombremateria = element['nombre_producto'];
          }
        });
        this.subtotal = this.precio * this.cantidad;
        let fila = {
          posicion: localStorage.getItem("posicion"),
          nombrematerial: this.nombremateria,
          materiaid: $("#mtp").val(),
          precio: this.precio,
          cantidad: this.cantidad,
          descripcion: this.descripcion,
          subtotal: this.subtotal.toFixed(2)
        };

        this.arreglodetalle.push(fila);
        localStorage.setItem("detallecompra", JSON.stringify(this.arreglodetalle));
      }
      var money = 0;
      this.arreglodetalleoc = JSON.parse(localStorage.getItem("detallecompra"));
      this.arreglodetalleoc.forEach(element => {
        this.items = this.items + Number(element['cantidad']);
        money = money + Number(element['subtotal']);
        this.datostotal.totalorden = money.toFixed(2);
      });
    } else {
      localStorage.setItem("posicion", JSON.stringify(0));
      this.listamateriaprima.forEach(element => {
        if (element['id_mp'] == $("#mtp").val()) {
          this.nombremateria = element['nombre_producto'];
        }
      });
      this.subtotal = Number(this.precio * this.cantidad);
      var subtt = this.subtotal.toFixed(2);
      let fila = {
        posicion: localStorage.getItem("posicion"),
        nombrematerial: this.nombremateria,
        materiaid: $("#mtp").val(),
        precio: this.precio,
        cantidad: this.cantidad,
        descripcion: this.descripcion,
        subtotal: subtt
      };

      this.arreglodetalle.push(fila);
      localStorage.setItem("detallecompra", JSON.stringify(this.arreglodetalle));
      this.arreglodetalleoc = JSON.parse(localStorage.getItem("detallecompra"));
      this.items = this.items + this.cantidad;
      this.datostotal.totalorden = subtt;
    }
    this.cantidad = 0;
  }

  borrarfila(posicion) {
    this.arreglodetalle = JSON.parse(localStorage.getItem("detallecompra"));
    this.arreglodetalle.splice(posicion, 1);
    localStorage.setItem("detallecompra", JSON.stringify(this.arreglodetalle));
    this.arreglodetalle = JSON.parse(localStorage.getItem("detallecompra"));
    var indice = 0;
    this.items = 0;
    this.datostotal.totalorden = 0;
    this.arreglodetalle.forEach(element => {
      this.arreglodetalle[indice].posicion = indice;
      localStorage.setItem("detallecompra", JSON.stringify(this.arreglodetalle));
      this.items = this.items + Number(element['cantidad']);
      this.datostotal.totalorden = this.datostotal.totalorden + Number(element['subtotal']);
      indice++;
    });
    if (this.arreglodetalle.length == 0) {
      this.arreglodetalle = [];
      this.arreglodetalleoc = [];
      localStorage.removeItem("detallecompra");
    }
    this.arreglodetalleoc = JSON.parse(localStorage.getItem("detallecompra"));
  }

  agregarprecio(selectmaterial) {
    var id_mp = selectmaterial.target.value;
    var dataid = {
      "id_mp": id_mp,
    }
    console.log(id_mp);
    this.compraservice.buscarprecio(dataid).subscribe({
      next: (respuesta) => {
        this.precio = respuesta.precioresult.precio_unitario;
      }, error: (error) => {
        console.log("error", error)
      }

    });
  }

  guardarOrdenCompra() {
    if (JSON.parse(localStorage.getItem("detallecompra")) != null && this.datostotal.fecha != "" && this.datostotal.proveedorid != "") {
      this.datostotal.proveedorid = $("#idproveedor").val();
      console.log(this.arreglodetalle);
      console.log(this.datostotal);
      this.compraservice.guardarOrdeCompra(this.datostotal).subscribe({
        next: (respuesta) => {
          this.guardarDetalleOC(respuesta["idorden"]);

//bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva orden de compra'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

          this.router.navigateByUrl('dashboard/lista-orden-compra');
        }, error: (error) => {
          console.log("error", error)
        }

      });
    } else {
      swal.fire("Debe ingresar datos para la orden de compra");
    }
  }
  guardarDetalleOC(idorden) {
    this.datostotal.proveedorid = $("#idproveedor").val();
    this.arreglodetalle.forEach(element => {
      var detalleoc = {
        "idorden": idorden,
        "materiaid": element['materiaid'],
        "cantidad": element['cantidad'],
        "precio": element['precio'],
        "descripcion": element['descripcion'],
        "subtotal": element['subtotal']
      }

      this.compraservice.guardarDetalleOC(detalleoc).subscribe({
        next: (respuesta) => {
          swal.fire("Exito", respuesta['mensaje'], "success");
          localStorage.removeItem("detallecompra");
          localStorage.removeItem("posicion");
          this.router.navigateByUrl('dashboard/lista-orden-compra');
        }, error: (error) => {
          console.log("error", error)
        }
      });
    });

  }
  eliminadetalle() {
    if (JSON.parse(localStorage.getItem("detallecompra")) != null) {
      this.dibujardetalle(2);
      this.arreglodetalle.splice(0);
    } else {
      swal.fire("Debe existir al menos un detalle!");
    }
  }
  // public intercambio(){
  //   this.compraservice.intercambioValue(true);
  // }
}
