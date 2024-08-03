import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Usuarios } from '../../pages/administracion/usuarios';

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

  constructor(private loginS: LoginService) { }

  ngOnInit(): void {
$(document).ready(function(){
        
       $('#submenu li a').on('click', function(e){
          // $('#submenu').removeClass('in');
         $('#submenu').toggleClass();
       });
       
    });
    this.usuario=this.loginS.userValue;

    this.usuario2=this.usuario['user']
    this.role=this.usuario2['role'];
    this.user=this.usuario2['name'];



  }

}
