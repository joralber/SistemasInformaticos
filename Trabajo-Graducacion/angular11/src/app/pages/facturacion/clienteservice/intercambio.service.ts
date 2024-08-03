import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntercambioService {
  estado : boolean=false;
  constructor() { }
  
  public intercambioValue(estados: boolean){
    this.estado = estados;
  }
}
