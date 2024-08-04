import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../validator';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../usuarios'
import {ActivatedRoute, Router } from '@angular/router';
import {IntercambioService} from '../../services/intercambio.service';
import swal from'sweetalert2';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit, OnDestroy {

    form: FormGroup;
    loading:boolean;
    cantidad:any;
       ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;

  constructor(public regresarp: IntercambioService, private usuarioS: UsuariosService, private router: Router,
              private bitacoraS:BitacoraService, private loginS: LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.maxLength(100)]),
      email: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(100)]),
       role:  new FormControl('', [ Validators.required]),
        password:  new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
         password2:  new FormControl('', [ Validators.required]),

    }, {
            validators: MustMatch('password', 'password2')
        });
  }


   get f(){
    return this.form.controls;
  }

  submit(){
    this.loading=true;
    this.usuarioS.repetido(this.form.get('email').value).subscribe((data: Usuarios[])=>{
         this.cantidad = data;
           if(this.cantidad>0){
           this.loading=false;
            swal.fire('El email: "'+ this.form.get('email').value + '" ya existe ')

           }else{

this.usuarioS.create(this.form.value).subscribe(res => {
 //bitacora
        this.bitacora=this.loginS.userValue;
    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo usuario'
    };
this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
 swal.fire('Exito...', 'Usuario registrado con exito!!', 'success');
this.loading=false;
      this.router.navigateByUrl('dashboard/listado-usuarios');
    });
           }
  });  
  }

  ngOnDestroy(){
      this.regresarp.intercambioValue(false);

  }
}
