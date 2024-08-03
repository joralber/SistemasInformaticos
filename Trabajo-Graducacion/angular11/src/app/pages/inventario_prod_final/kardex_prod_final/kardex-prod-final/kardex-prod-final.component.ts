import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';

import { ProductosTerminadosService } from '../../producto_final/services/productos-terminados.service';
import { ProductosTerminados } from '../../producto_final/productos_terminados';

import { KardexpfService } from '../services/kardexpf.service';
import { Kardexpf } from '../kardexpf';

import { CodigoEstiloService } from '../../../inventarios/estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../../inventarios/estilos/codigo-estilo';


import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-kardex-prod-final',
  templateUrl: './kardex-prod-final.component.html',
  styleUrls: ['./kardex-prod-final.component.css']
})
export class KardexProdFinalComponent implements OnInit,  OnDestroy {
@ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();

  pf: ProductosTerminados[] = [];
kx: Kardexpf[]=[];
codigo_est:CodigoEstilo;
  select:number;
productot: ProductosTerminados;
  constructor(private service: ProductosTerminadosService, private kxS: KardexpfService,
    private codS: CodigoEstiloService) { 
this.productot=new ProductosTerminados();
this.codigo_est= new CodigoEstilo();
  }

  ngOnInit(): void {
    this.getAll();


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

   }

  getAll(): void {
    this.service.getAll().subscribe((data: ProductosTerminados[]) => {
      this.pf = data;


    });

  }

  changeSelect(){
       console.log(this.select);
       this.getAll2(this.select);

         this.service.find(this.select).subscribe((data: ProductosTerminados)=>{
      this.productot = data;


        this.codS.find(this.productot.idcodigo_estilo).subscribe((data: CodigoEstilo)=>{
      this.codigo_est = data;

    });

      
    });


}

  getAll2(id_producto): void {
    this.kxS.getAll2(id_producto).subscribe((data: Kardexpf[]) => {
      this.kx = data;
console.log(this.kx);

if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();

          }

    });

  }


ngOnDestroy():void{
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

}

