import { Component, OnInit } from '@angular/core';

import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../proveedor';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import swal from'sweetalert2';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

  id_proveedor: number;
  proveedor: Proveedor;
  form: FormGroup;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
constructor(
    public proveedorService: ProveedorService,
    private route: ActivatedRoute,
    private router: Router,  private bitacoraS:BitacoraService, private loginS: LoginService
  ) { 

this.proveedor= new Proveedor();
}

  ngOnInit(): void {

      this.id_proveedor = this.route.snapshot.params['id_proveedor'];
            console.log(this.id_proveedor);

    this.proveedorService.find(this.id_proveedor).subscribe((data: Proveedor)=>{
      this.proveedor = data;
console.log(this.proveedor);
    });


this.form = new FormGroup({

      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      nit: new FormControl('', [Validators.pattern("^[0-9]*$") ]),
      nrc: new FormControl('', [Validators.pattern("^[0-9]*$") ]),
      dui: new FormControl('', [Validators.pattern("^[0-9]*$") ]),
      direccion:  new FormControl('', [ Validators.required]),
      celular: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),

      email: new FormControl('', [ Validators.required, Validators.email ]),
      limite_credito: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
      N_creditos: new FormControl('', [ Validators.required]),
      estado: new FormControl('', [ Validators.required]),

    });

  }

    get f(){
    return this.form.controls;
  }

   submit(){
    console.log(this.form.value);
    this.proveedorService.update(this.id_proveedor, this.form.value).subscribe(res => {
//         console.log('Proveedor actualizado correctamente!');
          swal.fire('Exito...', 'Proveedor actualizado con exito!!', 'success');

          //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó un proveedor'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

         this.router.navigateByUrl('dashboard/listado-proveedor');
    });
  }

}
