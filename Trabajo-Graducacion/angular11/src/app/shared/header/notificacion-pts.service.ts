import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ProductosTerminados } from '../../pages/inventario_prod_final/producto_final/productos_terminados';
@Injectable({
  providedIn: 'root'
})
export class NotificacionPTSService {
private notificationsPT = new BehaviorSubject<ProductosTerminados[]>([]);
  public elements$ = this.notificationsPT.asObservable();





  public getNotificationsPT() {
    return this.notificationsPT.asObservable();
  }



  public getCount(): number {
    const currentProducts = this.notificationsPT.value;
    return currentProducts.length;
  }

  public addNotificationPT(notificationPT: ProductosTerminados[]) {
   // const updatedNotificationsPT = [...this.notificationsPT.value, notification];
   // this.notificationsPT.next([]);
    this.notificationsPT.next(notificationPT);
  }

 public clearProducts() {
    this.notificationsPT.next([]);
  }

}
