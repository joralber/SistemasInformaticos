import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import swal from'sweetalert2';
//import { RespaldosService } from '../../pages/administracion/services/respaldos.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-respaldos',
  templateUrl: './respaldos.component.html',
  styleUrls: ['./respaldos.component.css']
})
export class RespaldosComponent implements OnInit {
    codigo: FormGroup;
loading:boolean;
resetCode:string;
mensaje:boolean;
cambio:boolean=true;
loading2:boolean;
form:FormGroup;
  archivoSeleccionado: any;

  constructor(private logS:LoginService) { }

  ngOnInit(): void {
        this.codigo = new FormGroup({
      codigo2: new FormControl('', [Validators.required]),

    });

  this.form = new FormGroup({
      path:  new FormControl('', [ Validators.required]),

        });


        //clave
        this.resetCode='tesis2023'
  }

   get f(){
    return this.form.controls;
  }


  verifi(){
    this.loading=true;
if(this.resetCode===this.codigo.get('codigo2').value){
  //this.modificar=false;
  this.cambio=false;
  this.loading=false;
  this.mensaje=false;
  }else{
this.mensaje=true;
this.loading=false;
  }

  }


    onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Nombre del archivo:', file.name);
    }
            this.form.patchValue({path: file.name});

  }


  submit(){
    this.loading2=true;
  console.log(this.form.get('path').value);

  this.logS.restaurarBackup(this.form.get('path').value).subscribe(
      response => {
        this.loading2=false;
         swal.fire('Exito...', 'Base de datos restaurada con éxito!!', 'success');
  this.archivoSeleccionado = null;

      },
      error => {
        this.loading2=false;
                 swal.fire('Error...', 'La restauración de la base de datos falló!!' ,'error');
  this.archivoSeleccionado = null;
        console.error('Error al enviar el respaldo', error);
      });

}


}
