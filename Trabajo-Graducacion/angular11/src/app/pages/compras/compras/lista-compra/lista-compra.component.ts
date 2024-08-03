import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CompraService } from '../servicios/compra.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css']
})
export class ListaCompraComponent implements OnInit, OnDestroy {
  listacompras: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  listadetallecompra:any[] = [];
  dtOptions: any = {};
  dtTrigger = new Subject();
  constructor(private compraservice: CompraService, private router: Router) { }

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
    this.getListaCompras();
  }
  getListaCompras() {
    this.compraservice.getcompras().subscribe({
      next: (respuesta) => {
        console.log("respuesta", respuesta)
        this.listacompras = respuesta.listadecompras;
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

  verdetallecompra(id_compra) {
    this.compraservice.cargarcompradetalle(id_compra).subscribe({
      next: (respuesta) => {
        this.listadetallecompra = respuesta.detallecompras;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }


}
