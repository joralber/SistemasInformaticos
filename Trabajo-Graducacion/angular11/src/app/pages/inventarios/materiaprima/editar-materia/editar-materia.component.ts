import { Component, OnInit } from '@angular/core';

import {RegresarService} from '../service/regresar.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MateriaprimaService } from '../service/materiaprima.service';
import { Materiaprima } from '../materiaprima';

import { CategoriampService } from '../categoria-materia/services/categoriamp.service';
import { Categoriamp } from '../categoria-materia/categoriamp';

import { ColormpService } from '../color-materia/services/colormp.service';
import { Colormp } from '../color-materia/colormp';

import { MedidampService } from '../medidas-materia/services/medidamp.service';
import { Medidamp } from '../medidas-materia/medidamp';

import { KardexmpService } from '../../../kardex-mat-prima/services/kardexmp.service';
import { Kardexmp } from '../../../kardex-mat-prima/kardexmp';

import swal from'sweetalert2';
import { validarQueSeanMayor } from '../validator';

import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {
 categorias:Categoriamp[]=[];
 color:Colormp[]=[];
medida:Medidamp[]=[];
kx: Kardexmp[]=[];

 id_mp: number;
  materiaprima: Materiaprima;
  
  form: FormGroup;
    formCategoria: FormGroup;
  formColor: FormGroup;
  formMedida: FormGroup;
  formKardex: FormGroup;

  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;
cantidad:any;
cantidad2:any;
cantidad3:any;

existe:number;

ent:number=0;
sal:number=0;

variable:boolean;

  loading:boolean = false;

loading2:boolean;
loading3:boolean;
loading4:boolean;
numeroKX:any;
stokKX:boolean;

///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
constructor(
  public regresarService: RegresarService,
    public materiaService: MateriaprimaService,
    private cate_ser: CategoriampService,
     private col_ser: ColormpService,
     private med_ser: MedidampService,
     private kxS: KardexmpService,
    private route: ActivatedRoute,
    private router: Router,
     private bitacoraS:BitacoraService, private loginS: LoginService
  ) { 

this.materiaprima= new Materiaprima();
}



  ngOnInit(): void {
         this.id_mp = this.route.snapshot.params['id_mp'];

    this.materiaService.find(this.id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;
      this.existe=this.materiaprima.cantidad;
    });


    //comprobar si es mayor q uno
    this.materiaService.repetido3(this.id_mp).subscribe((data: Materiaprima)=>{
         this.numeroKX = data;



           if(this.numeroKX==1){
           this.stokKX=true;
           }
           });


  this.form = new FormGroup({
        id_categoria:  new FormControl('', [ Validators.required]),
        id_color:  new FormControl('', [ Validators.required]),
        id_medida:  new FormControl('', [ Validators.required]),
        nombre_producto:  new FormControl('', [ Validators.required]),
        cantidad:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
        precio_unitario:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex)]),
        stock_minimo:  new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+")]),
        descripcion:  new FormControl('', [ Validators.required]),
        estado: new FormControl('', [ Validators.required]),
        factor: new FormControl('', [ Validators.required]),
        cortesmp: new FormControl('', [ Validators.required]),
        },
  {
    validators: validarQueSeanMayor,
  });



//categoria
         this.formCategoria = new FormGroup({
      nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ])

    });

         //medida
           this.formMedida = new FormGroup({
      medida:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),

    });

//color
              this.formColor = new FormGroup({
      color:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      
    });

              //kardex

              this.formKardex = new FormGroup({
descripcion: new FormControl(''),
fecha: new FormControl(''),
inv_inicial: new FormControl(''),
entradas: new FormControl(''),
salida: new FormControl(''),
inv_final: new FormControl(''),
              });


      this.getCategorias();
    this.getMedida();
    this.getColor();

    this.kardex(this.id_mp);

    
  }


//fin onit

  kardex(id_mp){
    this.kxS.getAll2(id_mp).subscribe((data: Kardexmp[]) => {
      this.kx = data;



});
  }




  public regresar(){
  this.regresarService.regresarValue(true);

}

    getCategorias():void{
  this.cate_ser.getAll().subscribe((data: Categoriamp[])=>{
      this.categorias = data;
     
    });
}

getColor():void{
  this.col_ser.getAll().subscribe((data: Colormp[])=>{
      this.color = data; 
    });

}


getMedida():void{
  this.med_ser.getAll().subscribe((data: Medidamp[])=>{
      this.medida = data; 
    });

}


    get f(){
    return this.form.controls;
  }

  get fCol(){
    return this.formColor.controls;
  }
get fCat(){
    return this.formCategoria.controls;
  }
get fMed(){
    return this.formMedida.controls;
  }




   submit(){
        this.loading = true;    
if(this.numeroKX===1){
    this.materiaService.update(this.id_mp, this.form.value).subscribe(res => {


this.variable=true;

      //modificar kardex
if(this.existe!=this.form.get('cantidad').value){
 this.variable=false;

        for (const k of this.kx) {

 this.formKardex.patchValue({descripcion: k.descripcion});
  this.formKardex.patchValue({fecha: k.fecha});
//this.formKardex.patchValue({entradas: k.entradas});
//this.formKardex.patchValue({salida: k.salida});


if(k.descripcion ==='Inventario Inicial'){
    this.formKardex.patchValue({inv_inicial: this.form.get('cantidad').value});
this.formKardex.patchValue({inv_final: this.form.get('cantidad').value});


    this.kxS.update(k.id_kardex, this.formKardex.value).subscribe(res => {
});

}


}
//modificar cantidad mp
 this.materiaService.agregarStock(this.id_mp, this.formKardex.get('inv_final').value ).subscribe(res => {

//this.router.navigate(['dashboard/listado-materia', { id: 123 }]);
    this.loading = false;

    swal.fire('Exito...', 'Materia prima actualizada con exito!!', 'success');
  //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó una materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

     //   this.router.navigate(['dashboard/listado-materia', { id: 123 }]);
  this.router.navigateByUrl('dashboard/listado-materia');

});
  
}
      //fin kardex
if(this.variable!=false){

    this.loading = false;
  swal.fire('Exito...', 'Materia prima actualizada con exito!!', 'success');
          //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó una materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

       this.router.navigateByUrl('dashboard/listado-materia');


}


    });

}else{
this.materiaService.update(this.id_mp, this.form.value).subscribe(res => {
         swal.fire('Exito...', 'Materia prima actualizada con exito!!', 'success');

     //   this.router.navigate(['dashboard/listado-materia', { id: 123 }]);
          //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó una materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

  this.router.navigateByUrl('dashboard/listado-materia');
    });
}

    

  }

//categoria
submit2(){
this.loading2=true;
    this.cate_ser.repetido(this.formCategoria.get('nombre').value).subscribe((data: Categoriamp)=>{
         this.cantidad = data;



           if(this.cantidad>0){
            this.loading2=false;
           
            swal.fire('La categoria: "'+ this.formCategoria.get('nombre').value + '" ya existe ')

           }else{

console.log(this.formCategoria.value);
this.cate_ser.create(this.formCategoria.value).subscribe(res => {

    this.getCategorias();

this.formCategoria.reset();
 swal.fire('Exito...', 'Categoria registrada con exito!!', 'success');
    this.getCategorias();
              //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva categoria de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
            this.loading2=false;

this.formCategoria.reset();


}
});
}

//medida
submit3(){
  this.loading3=true;
this.med_ser.repetido(this.formMedida.get('medida').value).subscribe((data: Medidamp)=>{
         this.cantidad2 = data;



           if(this.cantidad2>0){
           this.loading3=false;
            swal.fire('La medida: "'+ this.formMedida.get('medida').value + '" ya existe ')

           }else{






  this.med_ser.create(this.formMedida.value).subscribe(res => {
this.formMedida.reset();

 swal.fire('Exito...', 'Medida registrada con exito!!', 'success');
       this.getMedida();

                   //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nueva medida de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
  this.loading3=false;
this.formMedida.reset();

           }


         });

    

}

//color
submit4(){
  this.loading4=true;

      this.col_ser.repetido(this.formColor.get('color').value).subscribe((data: Colormp)=>{
         this.cantidad3 = data;



           if(this.cantidad3>0){
           this.loading4=false;
            swal.fire('El color: "'+ this.formColor.get('color').value + '" ya existe ')

           }else{



this.col_ser.create(this.formColor.value).subscribe(res => {

         console.log('Color creado con exito!');

this.formColor.reset();
 swal.fire('Exito...', 'Color registrado con exito!!', 'success');
       this.getColor();

                   //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro una nuevo color de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });
this.loading4=false;
this.formColor.reset();

}

});

}


 checarSiEsMayor(): boolean {
    return this.form.hasError('noesMayor') &&
      this.form.get('cantidad').dirty &&
      this.form.get('stock_minimo').dirty;
  }

    limpiar(){
this.formCategoria.reset();
this.formMedida.reset();
this.formColor.reset();
}
}



