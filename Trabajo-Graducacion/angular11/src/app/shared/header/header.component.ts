import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MateriaprimaService } from '../../pages/inventarios/materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../pages/inventarios/materiaprima/materiaprima';

import { NavServiceService } from './nav-service.service';

import { toArray } from 'rxjs/operators';

import { LoginService } from '../../auth/services/login.service';
import { BitacoraService } from '../../pages/administracion/services/bitacora.service';
import { Bitacora } from '../../pages/administracion/bitacora';
import { Usuarios } from '../../pages/administracion/usuarios';
//pTN
import { ProductosTerminadosService } from '../../pages/inventario_prod_final/producto_final/services/productos-terminados.service';
import { ProductosTerminados } from '../../pages/inventario_prod_final/producto_final/productos_terminados';
import { NotificacionPTSService } from './notificacion-pts.service';
import { CodigoEstiloService } from '../../pages/inventarios/estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../pages/inventarios/estilos/codigo-estilo';
import { ColorptService } from '../../pages/inventario_prod_final/color_prod_final/registro-color-prod/services/colorpt.service';
import { Colorpt } from '../../pages/inventario_prod_final/color_prod_final/registro-color-prod/colorpt';
import { TallaptService } from '../../pages/inventario_prod_final/tallas_prod_final/registro-tallas-prod/services/tallapt.service';
import { Tallapt } from '../../pages/inventario_prod_final/tallas_prod_final/registro-tallas-prod/tallapt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private intervalId: number;

mp:Materiaprima []= [];
 n:Materiaprima [] =[];
materiaprima:Materiaprima;
contador:number=0;
  public notifications: Materiaprima[] = [];
  public listSize: number = 0;

pt:ProductosTerminados []= [];
 p:ProductosTerminados [] =[];
   public notificationsPT: ProductosTerminados[] = [];
productoT:ProductosTerminados;
codigoEs:CodigoEstilo;
color:Colorpt;
talla:Tallapt;

bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
constructor(private toastr: ToastrService, private service: MateriaprimaService,private servicept: ProductosTerminadosService,
           private notificationService: NavServiceService, 
           private notificacionPT: NotificacionPTSService, private loginS: LoginService, private bitacoraS: BitacoraService, 
           private codS: CodigoEstiloService, private colS: ColorptService, private tallS: TallaptService) { 
this.materiaprima=new Materiaprima();
this.productoT=new ProductosTerminados();
this.codigoEs=new CodigoEstilo();
this.color= new Colorpt();
this.talla=new Tallapt();
}

  ngOnInit(): void {


   this.notificationService.getNotifications().subscribe(mp => {
      this.notifications = mp;

          });
  this.mostrarNotificacion();
    this.cotadorNotificaciones();


//nPT

   this.notificacionPT.getNotificationsPT().subscribe(pt => {
      this.notificationsPT = pt;

          });
  this.mostrarNotificacionPT();
    this.cotadorNotificacionesPT();

 
  }



    cotadorNotificaciones() {
this.n=[];
  this.service.getAll().subscribe((data: Materiaprima[])=>{
      this.mp = data;

      for(const m of this.mp){
        
             if(m.cantidad <= m.stock_minimo){
                      this.n.push(m);

              //this.contador++;
    //this.toastr.info(`El producto "${m.nombre_producto}" ha alcanzado el stock mínimo`, 'Stock actual "'+m.cantidad+'"');
        }
      }
});
    //this.notificationService.clearProducts();      

    this.notificationService.addNotification(this.n);






  }




mostrarNotificacion(){
this.service.getAll().subscribe((data: Materiaprima[])=>{
      this.mp = data;
      for(const m of this.mp){
             if(m.cantidad <= m.stock_minimo){

    this.toastr.info(`El material: "${m.nombre_producto}" ha llegado al stock mínimo`, 'Stock actual: "'+m.cantidad+'"');
        }
      }
});
}


ver(id_mp){
      this.service.find(id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;
    this.toastr.info(`El material: "${this.materiaprima.nombre_producto}" ha llegado al stock mínimo`, 'Stock actual: "'+this.materiaprima.cantidad+'"');


    });
}

/*
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
*/


 logout() {

        this.loginS.logout2().subscribe(
      response => {
        this.modificarBitacora();

        this.loginS.logout();

      },
      error => {
console.log('error');
      }
    );

    }


    modificarBitacora(){

          this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

this.bitacoraS.update(this.id_bitacora).subscribe(res => {
  });

    }

    //notificacion pt

        cotadorNotificacionesPT() {
this.p=[];
  this.servicept.getAll().subscribe((data2: ProductosTerminados[])=>{
      this.pt = data2;
      for(const p2 of this.pt){
     
             if(p2.cantidad <= p2.stock_minimo){
                      this.p.push(p2);
                   

              //this.contador++;
    //this.toastr.info(`El producto "${m.nombre_producto}" ha alcanzado el stock mínimo`, 'Stock actual "'+m.cantidad+'"');
        }
      }
});
    this.notificacionPT.addNotificationPT(this.p);
  }

mostrarNotificacionPT(){
this.servicept.getAll().subscribe((data3: ProductosTerminados[])=>{
      this.pt = data3;
      for(const m of this.pt){
             if(m.cantidad <= m.stock_minimo){

    this.toastr.info(`El producto: "${m.estilo} ${m.nombre_color}" # "${m.nombre_talla}" ha llegado al stock mínimo`, 'Stock actual: "'+m.cantidad+'"');
        }
      }
});
}


verPT(id_producto){
  console.log(id_producto);
      this.servicept.find(id_producto).subscribe((data4: ProductosTerminados)=>{
      this.productoT = data4;
            this.codS.find(this.productoT.idcodigo_estilo).subscribe((data5: CodigoEstilo)=>{
              this.codigoEs=data5
                     this.colS.find(this.productoT.id_color_pt).subscribe((data6: Colorpt)=>{
              this.color=data6
                     this.tallS.find(this.productoT.id_talla_pt).subscribe((data7: Tallapt)=>{
              this.talla=data7
    this.toastr.info(`El producto: "${this.codigoEs.estilo} ${this.color.nombre_color}" # "${this.talla.nombre_talla}" ha llegado al stock mínimo`, 'Stock actual: "'+this.productoT.cantidad+'"');

    });
    });
    });
    });
}

}
