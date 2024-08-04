import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../validator';

import {ActivatedRoute, Router } from '@angular/router';

import swal from'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../usuarios';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';

@Component({
  selector: 'app-nuevos-password',
  templateUrl: './nuevos-password.component.html',
  styleUrls: ['./nuevos-password.component.css']
})
export class NuevosPasswordComponent implements OnInit {

 form: FormGroup;
    loading:boolean;
    cantidad:any;
    id:number;
    user:Usuarios;
correo:string;


usuario:Usuarios;
usuario2:any

bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
  constructor(private route: ActivatedRoute, private usuarioS: UsuariosService, 
              private router: Router, private bitacoraS:BitacoraService, private loginS: LoginService) {
this.user=new Usuarios();
   }

  ngOnInit(): void {
     this.usuario=this.loginS.userValue;
    this.usuario2=this.usuario['user']
    this.id=this.usuario2['id'];

//          this.id = this.route.snapshot.params['id'];

    this.usuarioS.find(this.id).subscribe((data: Usuarios)=>{
      this.user = data;
console.log(this.user.email);
this.correo=this.user.email;
    });


     this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.maxLength(100)]),
      email: new FormControl('',[Validators.required, Validators.email, Validators.maxLength(100)]),
       role:  new FormControl('', [ Validators.required]),
       // password:  new FormControl('', [ Validators.required,  Validators.minLength(6)]),
                    password: new FormControl('', [Validators.minLength(6), Validators.maxLength(60), ...(!this.id ? [Validators.required] : [])]),

         password2:  new FormControl('', ...(!this.id ? [Validators.required] : []))

    }, {
            validators: MustMatch('password', 'password2')
        });



  
  }


     get f(){
    return this.form.controls;
  }

  submit(){
this.loading=true;
if(this.correo===this.form.get('email').value){
  this.usuarioS.update(this.id, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó su usuario'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
          swal.fire('Exito...', 'Usuario actualizado con exito!!, los cambios se reflejaran en el siguiente inicio de sesión', 'success');
this.loading=false;

   //      this.router.navigateByUrl('dashboard/listado-usuarios');
    });
}else
{
      this.usuarioS.repetido(this.form.get('email').value).subscribe((data: Usuarios[])=>{
         this.cantidad = data;



           if(this.cantidad>0){
            this.loading=false;

            swal.fire('El email: "'+ this.form.get('email').value + '" ya existe ')

           }else{


  this.usuarioS.update(this.id, this.form.value).subscribe(res => {
     //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó su usuario'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
          swal.fire('Exito...', 'Usuario actualizado con exito!!, los cambios se reflejaran en el siguiente inicio de sesión', 'success');
            this.loading=false;
//         this.router.navigateByUrl('dashboard/listado-usuarios');
    });

}

});
}
    
  }

}
