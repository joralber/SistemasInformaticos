import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from '../compras/servicios/compra.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-dev-sob-compra',
  templateUrl: './dev-sob-compra.component.html',
  styleUrls: ['./dev-sob-compra.component.css']
})
export class DevSobCompraComponent implements OnInit {
  listadevcompra: any[] = [];
  listadetalledevolucion: any[] = [];
  isDtInitialized: boolean = false;
  totalmodal: number;
  dtOptions: any = {};
  dtTrigger = new Subject();
  constructor(private compraservice: CompraService, private router: Router) { }
  title = 'SIGFICEV';
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
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
    this.getListaDevoluciones();
  }

  getListaDevoluciones() {
    this.compraservice.getDevoluciones().subscribe({
      next: (respuesta) => {
        this.listadevcompra = respuesta.listadevoluciones;
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
  verdetalle(id_dcompra){
    this.compraservice.verdetalledev(id_dcompra).subscribe({
      next: (respuesta) => {
        this.listadetalledevolucion = respuesta.listadetalledev;
        this.listadetalledevolucion.forEach(element => {
          this.totalmodal = element.total;
      });
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

}
