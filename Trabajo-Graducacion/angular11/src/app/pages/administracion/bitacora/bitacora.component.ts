import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild } from '@angular/core';
import { BitacoraService } from '../services/bitacora.service';
import { Bitacora } from '../bitacora';
import { Subject } from 'rxjs';
import { DetalleBitacora } from '../detalleBitacora';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
   @ViewChild(DataTableDirective, {static: false})

 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
    dtOptions: any = {};
  dtTrigger = new Subject();

bitacora: Bitacora[]=[];
detBit: DetalleBitacora[]=[];

  constructor(private bitacoraS: BitacoraService) { }

  ngOnInit(): void {

 this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
            destroy:true,

        "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },
  processing: true,
  
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    };

      this.getAll();
  }


getAll():void{
  this.bitacoraS.getAll().subscribe((data: Bitacora[])=>{
      this.bitacora = data;
           console.log(this.bitacora);
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


ver(id_bitacora){
this.bitacoraS.getAllDetalle(id_bitacora).subscribe((data: DetalleBitacora[])=>{
this.detBit=data;

});

}

salir(){
  this.detBit=[];
  
}
}
