import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { Ionicons } from 'ionicons';
import * as Chart from 'chart.js';
import {DashboardService} from './services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild('barChart', { static: true }) barChart: ElementRef;
@ViewChild('barChart2', { static: true }) barChart2: ElementRef;


cliente:number;
venta:number;
producto:number;
ventaDi:number;
lisCli:any[]=[];
  constructor(private dasbS: DashboardService) { }

  ngOnInit(): void {
    this.getCliente();
    this.getVentaD();
    this.getProducto();
        this.getVenta();
   this.clienteMasF();

  }



getVenta(){
  this.dasbS.getnVenta().subscribe((data: number) => {
      this.venta = data;
    });
}


getCliente(){
  this.dasbS.getnCliente().subscribe((data: number) => {
      this.cliente = data;
    });
}
getVentaD(){
  this.dasbS.getVentaD().subscribe((data: number) => {
      this.ventaDi = data;
    });
}
getProducto(){
  this.dasbS.getnProducto().subscribe((data: number) => {
      this.producto = data;
    });
}




clienteMasF() {

       this.dasbS.clienteMas().subscribe((data3: any[]) => {
      this.lisCli = data3;
          const clientesRango = this.lisCli.slice(0, 10); // Obtener los primeros 5 proveedores


 const canvas: HTMLCanvasElement = this.barChart2.nativeElement;
    const ctx = canvas.getContext('2d')


  const data = {
    labels:  clientesRango.map(cliente => cliente.nombre),
    datasets: [
      {
        label: 'Clientes más frecuentes',
        data: clientesRango.map(cliente => cliente.nventaC),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

const va=clientesRango.map(cliente => cliente.nventaC);
const maximoValor = Math.max(...va);

 Chart.pluginService.register({
    afterDraw: function(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach(function(dataset, index) {
        const meta = chart.getDatasetMeta(index);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            const value = dataset.data[index].toFixed(2); // Formatea el valor a 2 decimales
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            const padding = 5;
            const position = element.tooltipPosition();
            ctx.fillText(value, position.x, position.y - (padding / 2));
          });
        }
      });
    }
  });

  new Chart(ctx, {
    type: 'bar',
    data: data,
        responsive: true,
    options: {
      scales: {
        yAxes: [{
          ticks: {
                  suggestedMax: maximoValor + 1, // Establece un valor más alto que el máximo obtenido

            beginAtZero: true,
            callback: function(value) {
              if (value % 1 === 0) {
                return value;
              }
            }
          },
        }],
      },
          indexAxis: 'y', // Mostrar etiquetas en el eje vertical

      plugins: {
        datalabels: {
          display: false, // Oculta las etiquetas de datos por defecto
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.dataset.data[context.dataIndex].toFixed(2);
              const month = clientesRango.map(cliente => cliente.nombre[context.dataIndex]);
              return `${label}: ${value} (${month})`;
            },
          },
        },
      },
    },
  });

});
}

}


