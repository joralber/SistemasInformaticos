import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CompraService } from '../servicios/compra.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-lista-orden-compra',
  templateUrl: './lista-orden-compra.component.html',
  styleUrls: ['./lista-orden-compra.component.css']
})
export class ListaOrdenCompraComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  listaordencompra: any[] = [];
  listaproveedores: any[] = [];
  listadetalleordenc: any[] = [];
  dtOptions: any = {};
  dtTrigger = new Subject();
  constructor(private compraservice: CompraService, private router: Router) { }
  ngAfterViewInit(): void {

  }
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
    localStorage.removeItem("storagedetcompras");
    this.getOrdenCompra();
  }
  /* funcion extraer datos de orden de compra */
  getOrdenCompra() {
    this.compraservice.getAppOrdenCompra().subscribe({
      next: (respuesta) => {
        this.listaordencompra = respuesta.listaOCompras;
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();



  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  finalizar(id_ordencompra) {

    swal.fire({
      title: 'Finalizar Orden?',
      text: "¿Estás seguro de finalizar esta orden de compra?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraservice.finalizarorden(id_ordencompra).subscribe({
          next: (respuesta) => {
            swal.fire(
              'Exito!',
              'La orden de compra ha cambiado a efectuada.',
              'success'
            )
            this.router.navigateByUrl('dashboard/lista-orden-compra');
            this.getOrdenCompra();
          }, error: (error) => {
            console.log("error", error)
          }
        });
      }
    })
  }

  verdetalleoc(id_ordencompra) {
    this.compraservice.verdetalleodc(id_ordencompra).subscribe({
      next: (respuesta) => {
        this.listadetalleordenc = respuesta.detalleordencompras;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }
}
