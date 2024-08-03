import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { Ionicons } from 'ionicons';
import * as Chart from 'chart.js';
import {DashboardService} from './services/dashboard.service';
import{ ReportesService } from '../reportes/services/reportes.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
@ViewChild('grafica', {static: true}) graficaRef: ElementRef;
@ViewChild('graficac', {static: true}) graficaCRef: ElementRef;
@ViewChild('barChart', { static: true }) barChart: ElementRef;
@ViewChild('barChart2', { static: true }) barChart2: ElementRef;

venta:number;
cliente:number;
compra:number;
producto:number;
  ventasCredito: number;
  ventasContado: number;
  comprasCredito: number;
  comprasContado: number;
listPF:any[]=[];
listp:any[]=[];
lisCli:any[]=[];
  constructor(private dasbS: DashboardService) { }

  ngOnInit(): void {
    this.getVenta();
    this.getCliente();
    this.getCompra();
    this.getProducto();
    this.productoVendido();
    this.ventaCC();
    this.clienteMasF();
    this.compraCC();

  }

  ventaCC(){
  this.dasbS.graficaVCC().subscribe((data:any)=>{
     this.ventasCredito = data.ventasCredito;
      this.ventasContado = data.ventasContado;
      //
          const ctx = this.graficaRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.ventasCredito, this.ventasContado],
          backgroundColor: ['blue', 'green']
        }],
        labels: ['Crédito', 'Contado']
      },
      options: {
        responsive: true,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
              return percentage + "%";
            }
          }
        }
      }
    });
      //

  });
 
 
  }
//Compra
    compraCC(){
  this.dasbS.graficaCCC().subscribe((data:any)=>{
     this.comprasCredito = data.comprasCredito;
      this.comprasContado = data.comprasContado;
      //
      console.log(this.comprasContado)
          const ctx = this.graficaCRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.comprasContado],
          backgroundColor: ['blue', 'green']
        }],
        labels: ['Crédito', 'Contado']
      },
      options: {
        responsive: true,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
              return percentage + "%";
            }
          }
        }
      }
    });
      //

  });
 
 
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
getCompra(){
  this.dasbS.getnCompra().subscribe((data: number) => {
      this.compra = data;
    });
}
getProducto(){
  this.dasbS.getnProducto().subscribe((data: number) => {
      this.producto = data;
    });
}

productoVendido() {

       this.dasbS.productoMas().subscribe((data2: any[]) => {
      this.listPF = data2;
          const productosRango = this.listPF.slice(0, 10); // Obtener los primeros 5 proveedores
for(const p of productosRango){
const producto=p['estilo']+' '+p['nombre_color']+' '+ p['nombre_talla'] ;
this.listp.push({nombre: producto, total: p['nventa']});
}


 const canvas: HTMLCanvasElement = this.barChart.nativeElement;
    const ctx = canvas.getContext('2d')


  const data = {
    labels:  this.listp.map(producto => producto.nombre),
    datasets: [
      {
        label: 'Productos más vendidos',
        data: this.listp.map(producto => producto.total),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

const va=this.listp.map(producto => producto.total);
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
              const month = this.listp.map(producto => producto.nombre[context.dataIndex]);
              return `${label}: ${value} (${month})`;
            },
          },
        },
      },
    },
  });

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
