import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import swal from'sweetalert2';
import { Usuarios } from '../../pages/administracion/usuarios'
import { MustMatch } from '../../pages/administracion/usuarios/validator';
import {ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  form: FormGroup;
    codigo: FormGroup;
    passw: FormGroup;

loading:boolean;
cantidad:any;
  resetCode: string;
mensaje:boolean;
mensaje2:boolean;
verificacion:boolean=true;
modificar:boolean=true;
user:Usuarios;
id:number;
  constructor(private loginS: LoginService, private router:Router) { 
this.user=new Usuarios();
  }

  ngOnInit(): void {



     this.form = new FormGroup({
      email: new FormControl('',[Validators.required]),
      codigo: new FormControl(''),

    });

     this.codigo = new FormGroup({
      codigo2: new FormControl('', [Validators.required]),

    });


this.passw= new FormGroup({
        password:  new FormControl('', [ Validators.required, Validators.minLength(6)]),
         password2:  new FormControl('', [ Validators.required]),

    }, {
            validators: MustMatch('password', 'password2')

});

    this.resetCode = this.loginS.generateResetCode(8);

  }

     get f(){
    return this.form.controls;
  }

   get ff(){
    return this.passw.controls;
  }


  submit(){
    this.mensaje=false;
              this.form.patchValue({codigo: this.resetCode});

    this.loading=true;
    this.loginS.repetido(this.form.get('email').value).subscribe((data: Usuarios[])=>{
         this.cantidad = data;



           if(this.cantidad<=0){
           this.loading=false;
           this.mensaje=true;
           // swal.fire('El email: "'+ this.form.get('email').value + '" no existe ')

           }else{
                    this.loginS.enviarCodigo(this.form.value).subscribe(res => {
this.mensaje=false;
           this.loading=false;
           this.verificacion=false;
//obtener id
                   this.loginS.find(this.form.get('email').value).subscribe((data: Usuarios)=>{
                  this.user = data;
                  this.id=this.user.id;
                  console.log(this.id);
    
    });

                   //fin


         });

           }

         });

  }

  verifi(){
this.loading=true;
if(this.resetCode===this.codigo.get('codigo2').value){
  this.modificar=false;
  this.mensaje2=false;
  this.loading=false;
  }else{
this.mensaje2=true;
this.loading=false;
  }

}

pass(){
  this.loading=true;
   this.loginS.update(this.id, this.passw.get('password').value).subscribe(res => {
          swal.fire('Exito...', 'Contraseña actualizada con exito!!', 'success');
this.loading=false;
         this.router.navigateByUrl('/login');
    });

}


}
