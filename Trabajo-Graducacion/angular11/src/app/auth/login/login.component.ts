import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
mensaje:boolean;
loading:boolean;
  constructor(private router: Router, private logS: LoginService) { }

  ngOnInit(): void {

     this.form = new FormGroup({
      email: new FormControl('',[Validators.required]),
        password:  new FormControl('', [ Validators.required]),

    });


  }

     get f(){
    return this.form.controls;
  }


  submit(){
    this.loading=true;
    this.logS.login(this.form.value).subscribe(res => {
            // Autenticación exitosa
           const token =localStorage.setItem('token', res.token); // Almacena el token en el almacenamiento local
         window.location.href = '/dashboard';

        },
        error => {
          this.loading=false;
          this.mensaje=true;
          // Autenticación fallida
          console.log(error);
        }
      );
  }
}
