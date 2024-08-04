import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegresarService {
  estado : boolean=false;
  mp :boolean=false;

  constructor() { }
  public regresarValue(estados: boolean){
    this.estado=estados;
  }
    public regresarmp(mp: boolean){
    this.mp=mp;
  }
}
