import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Usuarios } from '../../pages/administracion/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
usuario:Usuarios;
usuario2:any;
role:string;
user:string;


usuario3:Usuarios;
nombre:string;
  constructor(private loginS: LoginService, private router: Router) { }

  ngOnInit(): void {
$(document).ready(function(){
        
       $('#submenu li a').on('click', function(e){
          // $('#submenu').removeClass('in');
         $('#submenu').toggleClass();
       });
       
    });

    this.usuario=this.loginS.userValue;
if (this.usuario === null ) {
        this.router.navigate(['/login']);

}else{
    this.usuario2=this.usuario['user']
    this.role=this.usuario2['role'];
    console.log(this.role);
    this.user=this.usuario2['name'];

// Divide el texto en palabras utilizando el espacio como separador
const palabras = this.user.split(' ');

// Obtén el primer nombre (índice 0 del array)
 this.nombre = palabras[0];
}
  }

}
