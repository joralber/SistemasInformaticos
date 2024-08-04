import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';

import { ProductosService } from '../../productos/services/productos.service';
import { Productos } from '../../productos/productos';

import { KardexpfService } from '../services/kardexpf.service';
import { Kardexpf } from '../kardexpf';



import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit,  OnDestroy {
@ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();

  pf: Productos[] = [];
kx: Kardexpf[]=[];
  select:number;
productot: Productos;
  constructor(private service: ProductosService, private kxS: KardexpfService,
    ) { 
this.productot=new Productos();

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
        ]
    };

   }

  getAll(): void {
    this.service.getAll().subscribe((data: Productos[]) => {
      this.pf = data;


    });

  }

  changeSelect(){
       console.log(this.select);
       this.getAll2(this.select);

         this.service.find(this.select).subscribe((data: Productos)=>{
      this.productot = data;

      
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

