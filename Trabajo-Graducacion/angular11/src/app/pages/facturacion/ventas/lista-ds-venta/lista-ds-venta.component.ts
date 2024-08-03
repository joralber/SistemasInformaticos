import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { VentaService } from '../ventaservice/venta.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-lista-ds-venta',
  templateUrl: './lista-ds-venta.component.html',
  styleUrls: ['./lista-ds-venta.component.css']
})
export class ListaDsVentaComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();
  listadevolucionventa: any[] = [];
  listadetdevventa: any[] = [];
  totalmodal: number;
  constructor(public ventaservice: VentaService) { }

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
    this.getdevolucionventa();
  }

  getdevolucionventa() {
    this.ventaservice.listardevolucionventas().subscribe({
      next: (respuesta) => {
        console.log("respuesta", respuesta)
        this.listadevolucionventa = respuesta.listadevolucionventa;
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

  detalledevventa(id_dventa) {
    this.listadetdevventa = [];
    var subtotalreal = 0;
    var total = 0;
    this.ventaservice.detalledevolucionventa(id_dventa).subscribe({
      next: (respuesta) => {
        respuesta.listadetalledev.forEach(element => {
          subtotalreal = element.cantidad * element.costoreal;
          var detalleventa = {
            nombreproducto: element.estilo + ' / ' + element.nombre_cat + ' ' + element.nombre_color + ' # ' + element.nombre_talla,
            cantidad: element.cantidad,
            costoreal: element.costoreal,
            subtotal: subtotalreal
          }
          this.listadetdevventa.push(detalleventa);
          total = total + subtotalreal;
        });
        this.totalmodal = total;
      }, error: (error) => {
        console.log("error", error)
      }
    });
  }

}
