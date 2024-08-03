import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaspagarService } from '../servicios/cuentaspagar.service';
import { ProveedorService } from '../../proveedor/services/proveedor.service';
import { Proveedor } from '../../proveedor/proveedor';
import swal from 'sweetalert2';


import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
declare const $: any;

@Component({
  selector: 'app-reportespagos',
  templateUrl: './reportespagos.component.html',

  styleUrls: ['./reportespagos.component.css']
})
export class ReportespagosComponent implements OnInit, AfterViewInit {
  alerta: boolean;

  listacomprasadd: any[] = [];
  id_proveedor: number;
  listacuentasproveedor: any[] = [];
  listaabonos: any[] = [];
  arreglotemporal: any[] = [];
  arregloinicial: any[] = [];
  abonostemporal: any[] = [];
  arreglocompraselect: any[] = [];
  arrcomprascompare: any[] = [];
  arrcuentascompare: any[] = [];
  nombreproveedor: "";
  cuotafija: 0;

  datoscuentasxp: any = {
    id_compra: 0,
    deuda: 0,
    montocuota: 0,
    saldo: 0,
    numero_cuotas: 0,
    cuotaspendientes: 0,
    fecha_factura: "",
    aplicamora: false,
    interes: 0,
    periodo: "MENSUAL"
  }
  cuentainfor: any = {
    deudatotal: 0,
    formapago: 0,
    valorcuota: 0,
    saldopendiente: 0
  }

  dataabono: any = {
    id_cxp: 0,
    ticket: 0,
    montopago: 0,
    fechapago: "",
    formapago: "",
    cuantospagos: 0,
    cuotaspendientes: 0
  }

  form: FormGroup;
  formabono: FormGroup;
  formcxp: FormGroup;
  proveedor: Proveedor;

        ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private cuentasservice: CuentaspagarService, private route: ActivatedRoute,
    private router: Router, public proveedorService: ProveedorService, private bitacoraS:BitacoraService, private loginS: LoginService) {
    this.alerta = true;
    this.proveedor=new Proveedor();
  }

  ngAfterViewInit(): void {
    $('#examples').DataTable({
      'pageLength': 3,

      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
      },
      dom: 'Bfrtip',
      buttons: [

      ]
    });
  }

  ngOnInit(): void {
    this.id_proveedor = this.route.snapshot.params['id_proveedor'];
    this.form = new FormGroup({
      aplicar: new FormControl(''),
      compraselect: new FormControl()
    });
    this.formabono = new FormGroup({
      abonos: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      fechapago: new FormControl('', [Validators.required]),
      formapago: new FormControl('', [Validators.required])
    });
    this.formcxp = new FormGroup({
      compraid: new FormControl('', [Validators.required])
    });
    
    this.proveedorService.find(this.id_proveedor).subscribe((data: Proveedor)=>{
      this.proveedor = data;
    });

    var datapv = {
      "id_proveedor": this.id_proveedor
    }
    this.cuentasservice.cargarcuentasproveedor(datapv).subscribe({
      next: (respuesta) => {
        this.listacuentasproveedor = respuesta.datacuentaproveedor;
        // this.listacuentasproveedor.forEach(element => {
        //   this.nombreproveedor = element.nombre;
        // });
      }, error: (error) => {
        console.log("error", error)
      }
    });
    localStorage.removeItem("detalleabonos");
  }
  get f() {
    return this.formcxp.controls;
  }

  // cargarcompras() {
  //   this.listacomprasadd = []
  //   this.arreglocompraselect = [];
  //   var data = {
  //     "id_proveedor": this.id_proveedor
  //   }
  //   var existe = 0;
  //   this.cuentasservice.compraspendientescred(data).subscribe({
  //     next: (respuesta) => {
  //       this.arrcomprascompare = respuesta.comprascompare;
  //       // console.log(respuesta.comprascompare);
  //       // console.log(respuesta.cuentascompare);
  //       respuesta.comprascompare.forEach(elementcom => {
  //         respuesta.cuentascompare.forEach(elementcue => {
  //           if (elementcom.id_compra == elementcue.id_compra) { existe = 1; }
  //         });
  //         if (existe == 0) {
  //           let fila = {
  //             idcompra: elementcom.id_compra,
  //             fechacompra: elementcom.fecha,
  //             credito: elementcom.total
  //           };
  //           this.arreglocompraselect.push(fila);
  //         }
  //       });
  //       this.listacomprasadd = this.arreglocompraselect;
  //       // console.log("select:", this.listacomprasadd);
  //     }, error: (error) => {
  //       console.log("error", error)
  //     }
  //   });
  // }

  // addcamposcuenta(evento) {
  //   var data = {
  //     "id_compra": evento.target.value
  //   }
  //   // console.log(evento.target.value);
  //   this.cuentasservice.camposparacxp(data).subscribe({
  //     next: (respuesta) => {
  //       respuesta.datafieldcompra.forEach(element => {
  //         this.datoscuentasxp.id_compra = element.id_compra;
  //         this.datoscuentasxp.deuda = element.total;
  //         this.datoscuentasxp.fecha_factura = element.fecha;
  //       });
  //     }, error: (error) => {
  //       console.log("error", error)
  //     }
  //   });
  // }

  // aplicarmora(aplica) {
  //   if (aplica.target.checked) {
  //     $("#interes").prop("disabled", false); this.datoscuentasxp.aplicamora = true;
  //   } else { $("#interes").prop("disabled", true), $("#interes").val(""), this.datoscuentasxp.aplicamora = false; }
  // }

  // calcularcuota(cantidad) {
  //   if (cantidad.target.value != "" && cantidad.target.value != 0) {
  //     var valorcuota = this.datoscuentasxp.deuda / cantidad.target.value;
  //     this.datoscuentasxp.montocuota = valorcuota.toFixed(2);
  //     this.datoscuentasxp.numero_cuotas = cantidad.target.value;
  //     this.datoscuentasxp.cuotaspendientes = cantidad.target.value;
  //     this.datoscuentasxp.saldo = this.datoscuentasxp.deuda;
  //   } else {
  //     this.datoscuentasxp.montocuota = 0;
  //     this.datoscuentasxp.numero_cuotas = 0;
  //     this.datoscuentasxp.cuotaspendientes = 0;
  //   }
  // }

  // guardarcxp() {
  //   if (this.datoscuentasxp.id_compra != "" && this.datoscuentasxp.numero_cuotas != "") {
  //     // console.log(this.datoscuentasxp);
  //     this.cuentasservice.guardarCuentaPagar(this.datoscuentasxp).subscribe({
  //       next: (respuesta) => {
  //         swal.fire(respuesta.mensaje);
  //         this.datoscuentasxp.fecha_factura = "";
  //         this.datoscuentasxp.numero_cuotas = 0;
  //         this.datoscuentasxp.montocuota = 0;
  //         this.datoscuentasxp.interes = 0;
  //         this.datoscuentasxp.deuda = 0;
  //         this.router.navigateByUrl('dashboard/reportespagos/' + this.id_proveedor);
  //         this.cargarcuentas(this.id_proveedor);
  //         this.cargarcompras();
  //       }, error: (error) => {
  //         console.log("error", error)
  //       }
  //     });
  //     $("#modalcuentaxp").modal('hide');
  //   } else {
  //     swal.fire("Complete el formulario");
  //   }
  // }
  
  validarcuotas(evento) {
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
  }
  // validarinteres(interes) {
  //   if (interes.target.value < 0 || interes.target.value > 100) {
  //     this.datoscuentasxp.interes = "";
  //   }
  // }
  // addperiodo(periodo){
  //   this.datoscuentasxp.periodo = periodo.target.value;
  // }

  realizarabono() {
    if (this.dataabono.cuantospagos != "" && $("#formapago").val() != null && this.dataabono.fechapago != "") {
      this.dataabono.formapago = $("#formapago").val();

      this.cuentasservice.guardarabono(this.dataabono).subscribe({
        next: (respuesta) => {
          this.actualizarcuentaxp(this.dataabono.id_cxp, this.dataabono.cuantospagos);
          localStorage.removeItem("detalleabonos");
          this.arreglotemporal = [];

            //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo abono de cuentas por pagar'
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

  cargarcuentas(idproveedor) {
    var data = {
      "id_proveedor": idproveedor
    }
    this.cuentasservice.cargarcuentasproveedor(data).subscribe({
      next: (respuesta) => {
        this.listacuentasproveedor = respuesta.datacuentaproveedor;
        // console.log("cuentas de este proveedor", this.listacuentasproveedor);
        this.listacuentasproveedor.forEach(element => {
          this.nombreproveedor = element.nombre;
          this.dataabono.id_cxp = element.id_cxp;
        });
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }
  cambiarcuenta(cuenta, vacio) {
    localStorage.removeItem("detalleabonos");
    this.arreglotemporal = [];
    if (vacio == '') {
      var data = {
        "id_cxp": cuenta.target.value
      }
    } else {
      var data = {
        "id_cxp": vacio
      }
    }
    this.cuentasservice.cargardatacuenta(data).subscribe({
      next: (respuesta) => {
        this.abonostemporal = respuesta.datacuentaespecifica;
        this.abonostemporal.forEach(element => {
          this.cuentainfor.deudatotal = element.deuda;
          this.cuentainfor.formapago = "MENSUAL";
          this.cuentainfor.valorcuota = element.montocuota;
          this.cuentainfor.saldopendiente = element.saldo;
          this.dataabono.cuotaspendientes = element.cuotaspendientes
        });
        (vacio == '') ?
          this.mostrarabonos(cuenta.target.value, this.cuentainfor.deudatotal) :
          this.mostrarabonos(vacio, this.cuentainfor.deudatotal);
      }, error: (error) => {
        console.log("error", error)
      }
    });

  }

  mostrarabonos(cuentaxp, deudatotal) {

    this.dataabono.id_cxp = cuentaxp;
    this.cuotafija = this.cuentainfor.valorcuota;

    var data = {
      "id_cxp": cuentaxp
    }
    this.cuentasservice.getabonoscuenta(data).subscribe({
      next: (respuesta) => {
        var saldoanterior = deudatotal;
        var posicion = 0;
        this.arregloinicial = respuesta.datadetalleabonos;
        this.arregloinicial.forEach(element => {
          let fila = {
            fecha_abono: element.fecha_abono,
            forma_pago: element.formapago,
            saldo_anterior: saldoanterior,
            cuota: element.pago,
            saldo_fin: 0
          };
          this.arreglotemporal.push(fila);
          localStorage.setItem("detalleabonos", JSON.stringify(this.arreglotemporal));
          this.arreglotemporal = JSON.parse(localStorage.getItem("detalleabonos"));
          saldoanterior = saldoanterior - Number(element.pago);
          this.arreglotemporal[posicion].saldo_fin = saldoanterior.toFixed(2);
          saldoanterior = saldoanterior.toFixed(2);
          localStorage.setItem("detalleabonos", JSON.stringify(this.arreglotemporal));
          posicion++;
        });
        this.listaabonos = JSON.parse(localStorage.getItem("detalleabonos"));
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

  actualizarcuentaxp(idcxp, cuantospagos) {
    var dataup = {
      "id_cxp": idcxp
    }
    var saldoactualizado = 0
    var cuotasactualizado = 0;
    var valorcuotapagada = 0;
    this.cuentasservice.cargardatacuenta(dataup).subscribe({
      next: (respuesta) => {
        this.abonostemporal = respuesta.datacuentaespecifica;
        this.abonostemporal.forEach(element => {
          valorcuotapagada = Number(cuantospagos) * Number(element.montocuota);
          saldoactualizado = element.saldo - this.dataabono.montopago;
          cuotasactualizado = element.cuotaspendientes - cuantospagos;
          var actualizar = {
            "id_cxp": idcxp,
            "saldo": saldoactualizado,
            "cuotaspendientes": cuotasactualizado
          }
          this.cuentasservice.actualizarcuentadata(actualizar).subscribe({
            next: (respuesta) => {
              swal.fire("Exito", "El abono ha sido realizado", "success");
              this.router.navigateByUrl('dashboard/reportespagos/' + this.id_proveedor);
              this.cargarcuentas(this.id_proveedor);
              this.cambiarcuenta('', idcxp);
              // this.mostrarabonos(this.dataabono.id_cxp, this.cuentainfor.deudatotal);
              localStorage.removeItem("detalleabonos");
              this.dataabono.cuantospagos = "";
              this.dataabono.fechapago = "";
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


}
