import { Component, OnInit, OnDestroy } from '@angular/core';


import { LoginService } from '../../auth/services/login.service';
import { BitacoraService } from '../../pages/administracion/services/bitacora.service';
import { Bitacora } from '../../pages/administracion/bitacora';
import { Usuarios } from '../../pages/administracion/usuarios';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private intervalId: number;

bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
constructor( private loginS: LoginService, private bitacoraS: BitacoraService, 
          ) { 

}

  ngOnInit(): void {




 
  }










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


}
