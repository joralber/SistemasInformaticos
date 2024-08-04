import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cliente';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Departamento } from '../departamento';
import { Municipio } from '../municipio';
import swal from'sweetalert2';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-modificarclientes',
  templateUrl: './modificarclientes.component.html',
  styleUrls: ['./modificarclientes.component.css']
})
export class ModificarclientesComponent implements OnInit {
 id_cliente: number;
  cliente: Cliente;
  form: FormGroup;
loading:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
dpto:Departamento[]=[];
muni:Municipio[]=[];
cantidad:any;
dui2:string;
constructor(
    public clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,  private bitacoraS:BitacoraService, private loginS: LoginService
  ) { 

this.cliente= new Cliente();
}

  ngOnInit(): void {

      this.id_cliente = this.route.snapshot.params['id_cliente'];
            console.log(this.id_cliente);

    this.clienteService.find(this.id_cliente).subscribe((data: Cliente)=>{
      this.cliente = data;
      this.dui2=this.cliente.dui;

             this.getAllMuni(this.cliente.id_departamento);

    });


this.form = new FormGroup({

       nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'), Validators.maxLength(60) ]),
      dui: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      direccion:  new FormControl('', [ Validators.required , Validators.maxLength(50)]),
      telefono: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(100) ]),
      id_municipio: new FormControl('', [ Validators.required]),
      id_departamento: new FormControl('', [ Validators.required]),
      estado: new FormControl('', [ Validators.required]),

    });
this.getAllDPTO();
  }


getAllDPTO():void{
  this.clienteService.getAllDpeto().subscribe((data: Departamento[])=>{
      this.dpto = data;
  console.log(this.dpto);
    });

}

   getAllMuni(id_departamento): void {
    this.clienteService.getAllMuni(id_departamento).subscribe((data: Municipio[]) => {
      this.muni = data;
      console.log(this.muni);
    });

  }
   
  changeSelect(){
       this.getAllMuni(this.form.get('id_departamento').value );

   }

    get f(){
    return this.form.controls;
  }

   submit(){

    this.loading=true;
    console.log(this.dui2);
    if(this.dui2===this.form.get('dui').value){
  
    this.clienteService.update(this.id_cliente, this.form.value).subscribe(res => {
                 swal.fire('Exito...', 'Cliente modificado con exito!!', 'success');


          //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Modifico un cliente'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


      this.router.navigateByUrl('/dashboard/listar-cliente');
        },
        error => {
          this.loading=false;
           swal.fire('Error...', 'Error de conexion a la base de datos!!', 'error');
          // Autenticación fallida
          console.log(error);
        } );

   }else{
      this.clienteService.repetido(this.form.get('dui').value).subscribe((data: Cliente)=>{
         this.cantidad = data;


           if(this.cantidad>0){
           this.loading=false;
            swal.fire('El DUI: "'+ this.form.get('dui').value + '" ya existe ')

           }else{
this.clienteService.update(this.id_cliente, this.form.value).subscribe(res => {
                 swal.fire('Exito...', 'Cliente modificado con exito!!', 'success');


          //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Modifico un cliente'
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora


      this.router.navigateByUrl('/dashboard/listar-cliente');
        },
        error => {
          this.loading=false;
           swal.fire('Error...', 'Error de conexion a la base de datos!!', 'error');
          // Autenticación fallida
          console.log(error);
        } );
           }
         });
   }
  }

}
