import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Materiaprima } from '../../pages/inventarios/materiaprima/materiaprima';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

private notifications = new BehaviorSubject<Materiaprima[]>([]);
  public elements$ = this.notifications.asObservable();





  public getNotifications() {
    return this.notifications.asObservable();
  }



  public getCount(): number {
    const currentProducts = this.notifications.value;
    return currentProducts.length;
  }

  public addNotification(notification: Materiaprima[]) {
   // const updatedNotifications = [...this.notifications.value, notification];
   // this.notifications.next([]);
    this.notifications.next(notification);
  }

 public clearProducts() {
    this.notifications.next([]);
  }

}
