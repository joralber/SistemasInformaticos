import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

import { BitacoraService } from '../pages/administracion/services/bitacora.service';
//import { Bitacora } from '../../pages/administracion/bitacora';
import { Usuarios } from '../pages/administracion/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
    constructor(private authService: LoginService, private router: Router, private bitacoraS: BitacoraService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
       

        const expectedRole = route.data.expectedRole;
    
    // Obtén el rol del usuario utilizando el servicio de autenticación
        const user = this.authService.userValue;
          if (user) {
       const usuario2=user['user'];
    const userRole =usuario2['role'];
console.log(userRole);
console.log(expectedRole);
  

    if (userRole === expectedRole) {
      return true;
    } else {
      this.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }else{
      this.router.navigate(['/login']);
      return false;
  }

  }



 logout() {

        this.authService.logout2().subscribe(
      response => {
        this.modificarBitacora();

        this.authService.logout();

      },
      error => {
console.log('error');
      }
    );

    }


    modificarBitacora(){

          this.bitacora=this.authService.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

this.bitacoraS.update(this.id_bitacora).subscribe(res => {
  });

    }

  
}


