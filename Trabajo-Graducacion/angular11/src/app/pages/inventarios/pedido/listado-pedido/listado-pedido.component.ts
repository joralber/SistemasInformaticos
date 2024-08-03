import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild  } from '@angular/core';
import {RegresarService} from '../../materiaprima/service/regresar.service';

import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../pedido';

import { DetalleEstiloService } from '../services/detalle-estilo.service';
import { DetalleEstilo } from '../detalle-estilo';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaprimaService } from '../../materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../materiaprima/materiaprima';

import { NavServiceService } from '../../../../shared/header/nav-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-pedido',
  templateUrl: './listado-pedido.component.html',
  styleUrls: ['./listado-pedido.component.css']
})
export class ListadoPedidoComponent implements OnInit, OnDestroy {
@ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
    dtOptions: any = {};
  dtTrigger = new Subject();

  pedido:Pedido[]=[];
  pedidos:Pedido;
  detalle:DetalleEstilo[]=[];
  bool:false;
  mp:Materiaprima[]=[];
  n:Materiaprima[]=[];
  materiaprima:Materiaprima;
  constructor(private toastr: ToastrService, public regresarService: RegresarService, private pedS: PedidoService, 
              private detalleES: DetalleEstiloService, private route: ActivatedRoute,
             private notificationService: NavServiceService, private service: MateriaprimaService) {
    this.pedidos=new Pedido();
this.materiaprima=new Materiaprima();
               }

  ngOnInit(): void {

this.route.queryParams.subscribe(params => {
      this.bool = params['id'];
    });


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
    //setInterval( ()=>{
      this.getAll();

this.getAllMP();
  }

getAllMP():void{
  this.service.getAll().subscribe((data: Materiaprima[])=>{
      this.mp = data;
      this.notificacion();
    });


}

getUpdate(idpedido){
this.detalleES.getAllupdate(idpedido).subscribe((data: DetalleEstilo[])=>{
      this.detalle = data;
 console.log(this.detalle.length);      
});  
}


getAll():void{
  this.pedS.getAll().subscribe((data: Pedido[])=>{
      this.pedido = data;

            
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

ver(idpedido){

//this.rerender2();



//       this.idpedido = this.route.snapshot.params['idpedido'];

    this.pedS.find(idpedido).subscribe((data: Pedido)=>{
      this.pedidos = data;


    });

      this.detalleES.getAllDetalle(idpedido).subscribe((data: DetalleEstilo[])=>{
      this.detalle = data;
        
});
}


salir(){
  this.pedidos=new Pedido();
  this.detalle=[];

}




public regresar(){
  this.regresarService.regresarValue(true);

}

 ngOnDestroy():void{
    this.dtTrigger.unsubscribe();



}

notificacion(){
          //  console.log(this.mp);

  if(this.bool){
    this.notificationService.clearProducts();      
  
      for(const m of this.mp){
        
             if(m.cantidad <= m.stock_minimo){
                      this.n.push(m);
                      this.verN(m.id_mp);
                  }
        }
        //console.log(this.mp);
    this.notificationService.addNotification(this.n);
}
}

verN(id_mp){
      this.service.find(id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;
    this.toastr.info(`El material: "${this.materiaprima.nombre_producto}" ha llegado al stock mínimo`, 'Stock actual: "'+this.materiaprima.cantidad+'"');


    });
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
