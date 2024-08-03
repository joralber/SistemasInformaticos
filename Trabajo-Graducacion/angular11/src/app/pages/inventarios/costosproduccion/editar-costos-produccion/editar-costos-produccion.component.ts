import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';

import {CostoproduccionService} from '../services/costoproduccion.service';
import {CostoProduccion} from '../costo-produccion';

import {DetallecostoService} from '../services/detallecosto.service';
import {DetalleCosto} from '../detalle-costo';

import { MateriaprimaService } from '../../materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../materiaprima/materiaprima';
import { MedidampService } from '../../materiaprima/medidas-materia/services/medidamp.service';
import { Medidamp } from '../../materiaprima/medidas-materia/medidamp';

import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FactorService } from '../../materiaprima/factor/services/factor.service';
import swal from'sweetalert2';
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-editar-costos-produccion',
  templateUrl: './editar-costos-produccion.component.html',
  styleUrls: ['./editar-costos-produccion.component.css']
})
export class EditarCostosProduccionComponent implements OnInit{
 @ViewChild('inputValue') input; // acceder al elemento de referencia

 @ViewChild('inputValue2') input2; // acceder al elemento de referencia
 //@ViewChild('inputValue3') input3; // acceder al elemento de referencia

 form: FormGroup;
  formfactor:FormGroup;
  detalleForm: FormGroup;

id_costo_produccion:number;

detallecosto:DetalleCosto;
costo_produ:CostoProduccion;
materiaprima: Materiaprima;
medidamp: Medidamp;

detalleCost: DetalleCosto[]=[];
unidad:number =0;
fact:number =0;
  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;

  mp:number;

 // borrar:boolean=true;
  med:boolean=true;
  borrar:boolean=true;

  ar:boolean=false;


medida1:number=0;
medida2:number=0;
total_m:number=0;
precio:number=0;
inporte:number=0;
totalprecio:number;
mano_obra:number=0;
 cdf_cif:number=0;
costo_produccion:number=0;
margen_contribucion:number=0;
consumidor_final:number=0;
total_iva_mayoreo:number=0;
total_iva_consumidorf:number=0;
//id:number;
id2:number;
sel:number;
tot:number=0;

loading:boolean=true;
medidaV:number=0.00;
loading2:boolean;
   ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
ce:number=0;
  constructor(private costopS: CostoproduccionService,
              private detallecS: DetallecostoService,
              private materiaService: MateriaprimaService,
              private medidaS: MedidampService,
              private factorServ: FactorService,
              private route: ActivatedRoute,
              private router: Router,
              private fb:FormBuilder,
              private bitacoraS:BitacoraService, private loginS: LoginService ) { 
this.costo_produ=new CostoProduccion();
this.detallecosto=new DetalleCosto();
this.materiaprima= new Materiaprima();
this.medidamp= new Medidamp();
  }



  ngOnInit(): void {
    this.form = new FormGroup({
      idcodigo_estilo: new FormControl('', [ Validators.required]),
      totalmedida: new FormControl('', [Validators.required]),
   // mano_obra: new FormControl('', [Validators.required, Validators.pattern(this.numRegex), Validators.min(0.1)]),
    cdf_cif: new FormControl('', [Validators.required, Validators.pattern(this.numRegex),Validators.min(0.1)]),
    costo_produccion: new FormControl('', [Validators.required]),
    margen_contribucion: new FormControl('', [Validators.required]),
    consumidor_final: new FormControl('', [Validators.required]),
    total_iva_mayoreo: new FormControl('', [Validators.required]),
    total_iva_consumidorf: new FormControl('', [Validators.required, Validators.pattern(this.numRegex)]),
      estado: new FormControl('', [ Validators.required]),
  
    });


this.formfactor = new FormGroup({
        id_mp:  new FormControl('',[Validators.required]),
        unidades:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex), Validators.min(1)]),
        factor:  new FormControl('',[Validators.required]),

    });


this.detalleForm = this.fb.group({

      Rows: this.fb.array([this.initRows()])
      
    });

  this.id_costo_produccion = this.route.snapshot.params['id_costo_produccion'];
this.getCosto(this.id_costo_produccion);
 
 //   this.loading=false;
this.llamarDetalle();
    

  }


  getCosto(id_costo_produccion){
    this.costopS.find(id_costo_produccion).subscribe((data: CostoProduccion)=>{
      this.costo_produ = data;
    //this.c=this.codigoEst.codigo;
      console.log(this.costo_produ);


              //      this.form.patchValue({codigo: this.c.toString().padStart(4, '0')});


    });
  }


llamarDetalle(){
   const cont = <FormArray>this.detalleForm.controls['Rows'];
for(let i = cont.length-1; i >= 0; i--) {
  cont.removeAt(i)
}
  this.detalleForm.reset();
  this.detalleForm.reset();

  this.ar=true;
  this.borrar=true;

this.getDetalle(this.id_costo_produccion);  
}


  getDetalle(id_costo_produccion){
  

      this.detallecS.getAll(id_costo_produccion).subscribe((data: DetalleCosto[])=>{
      this.detalleCost = data;
            console.log(this.detalleCost);
if(this.borrar==true){

for (let i=0; i<this.detalleCost.length; i++){

this.addNewRow();
}   
}

    });

  }

isDuplicated(id_cortes: number): boolean {
  console.log('holajdjee')
  const nombresSet = new Set<number>();
  
  for (const producto of this.detalleCost) {
    if (nombresSet.has(producto.id_cortes)) {
      return true; // Si ya existe un producto con el mismo nombre, es duplicado
    }
    
    nombresSet.add(producto.id_cortes);
    console.log(producto);
  }
  
  return false; // No se encontraron duplicados
}


 get f(){
    return this.form.controls;
  }


get ff(){
  return this.formfactor.controls;
}


get formArr() {
    return this.detalleForm.get("Rows") as FormArray;
  }

 

  initRows() {
    return this.fb.group({

      id_detalle_costo: [""],
      id_costo_produccion: [""],
        medida1: ["", [Validators.pattern(this.numRegex)]],
      medida2: ["",[Validators.pattern(this.numRegex)]],
      total_m: [""],
      id_factor:[""],
      id_cortes:[""],
      id_mp:[""],
      factor:[""],
      precio: ["", [Validators.required, Validators.pattern(this.numRegex)]]
    });
  }


 
  addNewRow() {
    this.formArr.push(this.initRows());
  }

//caculos para el costo

 calcular(){
       
const actividades = this.detalleForm.get('Rows') as FormArray;
//console.log(actividades.value);

for(let i=0; i<actividades.value.length; i++){
 const actividad = actividades.at(i);

  this.total_m=actividad.get('medida1').value * actividad.get('medida2').value;


if(this.total_m==0){
  if(actividad.get('medida2').value==''){
actividad.patchValue({total_m: actividad.get('medida1').value });
}else{
actividad.patchValue({total_m: actividad.get('medida1').value });
}
}else{
actividad.patchValue({total_m: this.total_m.toFixed(2)});

}




                
//actividad.patchValue({id_costo_produccion: this.id});

//.controls['total_m'].setValue(this.total_m[i]);

if(actividad.get('id_factor').value !== null){
this.precio=actividad.get('total_m').value*actividad.get('factor').value;
//console.log(this.precio);


actividad.patchValue({precio: this.precio.toFixed(2)});
}

console.log(actividad.value)

}

 }


costos(){

       



    const actividades = this.detalleForm.get('Rows') as FormArray;
this.totalprecio=0;
this.sel=0;
for(let i=0; i<actividades.value.length; i++) {
    const actividad = actividades.at(i);
    this.totalprecio=parseFloat(actividad.get('precio').value);
this.sel+=this.totalprecio;
    
}


    this.form.patchValue({totalmedida: this.sel.toFixed(2)});
//this.form.patchValue({mano_obra: 4.55});
this.form.patchValue({cdf_cif: this.costo_produ.cdf_cif});
//if(this.form.get('cdf_cif').value!=''){
this.tot=parseFloat(this.form.get('totalmedida').value);

this.costo_produccion= this.tot +parseFloat(this.form.get('cdf_cif').value) ;
//console.log(this.costo_produccion);
this.form.patchValue({costo_produccion: this.costo_produccion.toFixed(2) });

this.margen_contribucion=(this.costo_produccion*0.10)+this.costo_produccion;
this.form.patchValue({margen_contribucion: this.margen_contribucion.toFixed(2)})
this.consumidor_final=this.costo_produccion+this.costo_produccion;
this.form.patchValue({consumidor_final: this.consumidor_final.toFixed(2)});
this.total_iva_mayoreo=(parseFloat(this.form.get('margen_contribucion').value) * 0.13) +parseFloat(this.form.get('margen_contribucion').value);
this.form.patchValue({total_iva_mayoreo: this.total_iva_mayoreo.toFixed(2)});
this.total_iva_consumidorf= (parseFloat(this.form.get('consumidor_final').value) * 0.13) + parseFloat(this.form.get('consumidor_final').value);
this.form.patchValue({total_iva_consumidorf: this.total_iva_consumidorf.toFixed(2)});


    //console.log('hola')

//} 

 }

public costos2(inputValue2:string){
  this.cdf_cif=parseFloat(inputValue2);     
//this.mano_obra=parseFloat(inputValue3);
//console.log(this.mano_obra);
  if(isNaN(this.cdf_cif)){
      this.costo_produccion=this.tot;
      this.form.patchValue({costo_produccion: this.costo_produccion.toFixed(2) })

  }else{

  this.costo_produccion=this.tot + this.cdf_cif;
this.form.patchValue({costo_produccion: this.costo_produccion.toFixed(2) })
//console.log(this.cdf_cif);
}
//this.form.patchValue({mano_obra: 4.55});
//this.form.patchValue({cdf_cif: this.cdf_cif.toFixed(2)});
this.margen_contribucion=(this.costo_produccion*0.10)+this.costo_produccion;
this.form.patchValue({margen_contribucion: this.margen_contribucion.toFixed(2)})
this.consumidor_final=this.costo_produccion+this.costo_produccion;
this.form.patchValue({consumidor_final: this.consumidor_final.toFixed(2)});
this.total_iva_mayoreo=(parseFloat(this.form.get('margen_contribucion').value) * 0.13) +parseFloat(this.form.get('margen_contribucion').value);
this.form.patchValue({total_iva_mayoreo: this.total_iva_mayoreo.toFixed(2)});
this.total_iva_consumidorf= (parseFloat(this.form.get('consumidor_final').value) * 0.13) + parseFloat(this.form.get('consumidor_final').value);
this.form.patchValue({total_iva_consumidorf: this.total_iva_consumidorf.toFixed(2)});

}

submit(){
this.loading2=true;
  this.ce= this.form.get('idcodigo_estilo').value;

/////////////
    const actividades = this.detalleForm.get('Rows') as FormArray;
  

            this.costopS.update(this.id_costo_produccion, this.form.value).subscribe(res => {

                for(let i=0; i<actividades.value.length; i++){
 const actividad = actividades.at(i);
 
    this.detallecS.update(actividad.get('id_detalle_costo').value, actividad.value).subscribe(res=>{
        //bitacora
        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Actualizó los precios del estilo: ' + this.ce.toString().padStart(4, '0')
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

               });
}

              




this.form.reset();
//this.detalleForm.reset();


 swal.fire('Exito...', 'Costo de producción actualizado con exito!!', 'success');


this.router.navigateByUrl('dashboard/listado-costo');
    });





}


factores(id_mp){
  this.mp=id_mp;
    this.formfactor.patchValue({id_mp: id_mp});

   this.materiaService.find(id_mp).subscribe((data: Materiaprima)=>{
      this.materiaprima = data;

          this.medidaS.find(this.materiaprima.id_medida).subscribe((data: Medidamp)=>{
      this.medidamp = data;

      //console.log(this.medidamp);

    });


    });
}

public Caculofactor(inputValue:string) {


  this.unidad=parseInt(inputValue);     


//console.log(this.unidad);
//console.log(this.materiaprima.precio_unitario);

if(inputValue===''){
this.fact=0;
}else{
    this.fact =this.materiaprima.precio_unitario / this.unidad;
}
        //   this.router.navigateByUrl('dashboard/listado-materia');
    this.formfactor.patchValue({factor: this.fact});


  }
  
submit2(){
this.borrar=false;
 this.factorServ.create(this.formfactor.value).subscribe(res => {
 // this.mp=parseInt(this.formfactor.get('id_mp').value);

 //swal.fire('Exito...', 'Factor registrado con exito!!', 'success');
        this.materiaService.modificarFactor(this.mp, 0).subscribe(res => {
          console.log(this.id_costo_produccion);
          this.getDetalle(this.form.get('idcodigo_estilo').value);
  //   this.getMPCosto(this.form.get('idcodigo_estilo').value);
     this.limpiar();

    });

    //  this.calcular();
         //bitacora

        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro un nuevo factor de materia prima'
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora

    });


      
}

  limpiar(){
  this.formfactor.reset();
this.materiaprima=new Materiaprima();
this.medidamp= new Medidamp();
this.fact=0;

}

}
