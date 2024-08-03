import {AfterViewInit, Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit, AfterViewInit {

  constructor() { }

 ngAfterViewInit(): void{



  $('#example').DataTable( {
  'pageLength': 5,

  "language": {
    "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json"
  },

        dom: 'Bfrtip',
        buttons: [
            
        ]
    } );


  }
  ngOnInit(): void {
  }

}
