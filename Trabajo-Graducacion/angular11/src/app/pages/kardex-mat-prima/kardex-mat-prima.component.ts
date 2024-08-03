import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';

import { MateriaprimaService } from '../inventarios/materiaprima/service/materiaprima.service';
import { Materiaprima } from '../inventarios/materiaprima/materiaprima';

import { KardexmpService } from './services/kardexmp.service';
import { Kardexmp } from './kardexmp';

import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';

@Component({
  selector: 'app-kardex-mat-prima',
  templateUrl: './kardex-mat-prima.component.html',
  styleUrls: ['./kardex-mat-prima.component.css']
})
export class KardexMatPrimaComponent implements OnInit,  OnDestroy {
@ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: any = {};
  dtTrigger = new Subject();

  mp: Materiaprima[] = [];
kx: Kardexmp[]=[];
  select:number;
mprima: Materiaprima;
  constructor(private service: MateriaprimaService, private kxS: KardexmpService) { 
this.mprima=new Materiaprima();
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
    this.service.getAll().subscribe((data: Materiaprima[]) => {
      this.mp = data;


    });

  }

  changeSelect(){
       console.log(this.select);
       this.getAll2(this.select);

         this.service.find(this.select).subscribe((data: Materiaprima)=>{
      this.mprima = data;
    });


}

  getAll2(id_mp): void {
    this.kxS.getAll2(id_mp).subscribe((data: Kardexmp[]) => {
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
