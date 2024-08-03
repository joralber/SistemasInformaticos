import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';
import {RegresarService} from '../../materiaprima/service/regresar.service';
import { CodigoEstiloService } from '../../estilos/services/codigo-estilo.service';
import { CodigoEstilo } from '../../estilos/codigo-estilo';
import { DetalleCodigoEstiloService } from '../../estilos/services/detalle-codigo-estilo.service';
import { DetalleCodigoEstilo } from '../../estilos/detalle-codigo-estilo';
import { MateriaprimaService } from '../../materiaprima/service/materiaprima.service';
import { Materiaprima } from '../../materiaprima/materiaprima';
import { MedidampService } from '../../materiaprima/medidas-materia/services/medidamp.service';
import { Medidamp } from '../../materiaprima/medidas-materia/medidamp';

import {CostoproduccionService} from '../services/costoproduccion.service';
import {CostoProduccion} from '../costo-produccion';

import {DetallecostoService} from '../services/detallecosto.service';
import {DetalleCosto} from '../detalle-costo';

import { FormGroup, FormControl, Validators,FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FactorService } from '../../materiaprima/factor/services/factor.service';
import swal from'sweetalert2';
declare const $: any;
import { LoginService } from '../../../../auth/services/login.service';
import { BitacoraService } from '../../../administracion/services/bitacora.service';
import { Usuarios } from '../../../administracion/usuarios';
@Component({
  selector: 'app-registar-costos-produccion',
  templateUrl: './registar-costos-produccion.component.html',
  styleUrls: ['./registar-costos-produccion.component.css']
})
export class RegistarCostosProduccionComponent implements OnInit, OnDestroy {
 

 @ViewChild('inputValue') input; // acceder al elemento de referencia

 @ViewChild('inputValue2') input2; // acceder al elemento de referencia
 //@ViewChild('inputValue3') input3; // acceder al elemento de referencia


    
selectedEstilo:number;
 codigoE:CodigoEstilo[]=[];
 detalle:DetalleCodigoEstilo[]=[];

  form: FormGroup;
  formfactor:FormGroup;
  detalleForm: FormGroup;

c:number;
materiaprima: Materiaprima;
medidamp: Medidamp;
detallecosto: DetalleCosto;
detallecodigo:DetalleCodigoEstilo;
costo_p:CostoProduccion;
unidad:number =0;
fact:number =0;
  numRegex = /^([0-9]+\.?[0-9]{0,2})$/;

  mp:number;
  ar:boolean=false;

  borrar:boolean=true;
  med:boolean=true;



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
id:number;
id2:number;
sel:number;
tot:number=0;
medidaV:number=0.00;
prec:number=0.00;
loading:boolean;
loading2:boolean;
idcodigo:number;
idcodigo2:number;
nuevototalmedida:number=0;
   ///bita
bitacora:Usuarios;
bitacora2:any;
id_bitacora:number;
ce:number=0;

  constructor(public regresarService: RegresarService,
           private codS: CodigoEstiloService,
          private detalleS: DetalleCodigoEstiloService,
          private materiaService: MateriaprimaService,
          private medidaS: MedidampService,
                 private factorServ: FactorService,
            private router: Router,
                private route: ActivatedRoute,
                private fb:FormBuilder,
                private costo_produ: CostoproduccionService,
                private detallecost: DetallecostoService,
                    private bitacoraS:BitacoraService, private loginS: LoginService) {
this.materiaprima= new Materiaprima();
this.medidamp= new Medidamp();
this.detallecosto=new DetalleCosto();
this.detallecodigo=new DetalleCodigoEstilo();
this.costo_p=new CostoProduccion();
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
  
  
    });


this.formfactor = new FormGroup({
        id_mp:  new FormControl('',[Validators.required]),
        unidades:  new FormControl('', [ Validators.required, Validators.pattern(this.numRegex), Validators.min(1)]),
        factor:  new FormControl('',[Validators.required]),

    });


this.detalleForm = this.fb.group({

      Rows: this.fb.array([this.initRows()])
      
    });

  this.costo_produ.ultimo_id().subscribe((data: CostoProduccion)=>{
      this.costo_p = data;
     // console.log(this.costo_p.id_costo_produccion);


      if(Object.entries(this.costo_p).length===0){


        this.id=1;
console.log(this.id);
      }else{

              this.id=this.costo_p.id_costo_produccion+1;

             console.log(this.id);



      }

      
    });

    this.getCodigoAll();
  


 


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


        id_costo_produccion: [""],
        id_mp: [""],
      medida1: ["", [Validators.pattern(this.numRegex)]],
      medida2: ["",[Validators.pattern(this.numRegex)]],

      total_m: [""],
      id_factor:[""],
      id_cortes:[""],
      factor:[""],
      precio: ["", [Validators.required, Validators.pattern(this.numRegex)]],
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }



getCodigoAll():void{
    //this.detalleForm.reset();  

  this.detalle=[];
  this.codS.getAll2().subscribe((data: CodigoEstilo[])=>{
      this.codigoE = data;
//           console.log(this.codigoE);


    });


}

changeSelect(){
    this.detalle=[];

  //  console.log('hola')
    //console.log(this.selectedEstilo);

          const cont = <FormArray>this.detalleForm.controls['Rows'];
for(let i = cont.length-1; i >= 0; i--) {
  cont.removeAt(i)
}
this.form.reset();

this.detalleForm.reset();
this.formfactor.reset();
  this.ar=true;
  this.borrar=true;

//var cod = $("#idcodigo_estilo").val();

 this.form.patchValue({idcodigo_estilo: this.selectedEstilo});

this.getMPCosto(this.form.get('idcodigo_estilo').value);

}

getMPCosto(idcodigo_estilo):void{

//this.detalleForm.reset();


this.detalleS.getAllCosto(idcodigo_estilo).subscribe((data: DetalleCodigoEstilo[])=>{
this.detalle= data;
console.log(this.detalle);
if(this.borrar==true){
for (let i=0; i<this.detalle.length; i++){
     // this.formArr.push(this.initRows());
this.addNewRow();
}
}
  

});


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




                
actividad.patchValue({id_costo_produccion: this.id});

//.controls['total_m'].setValue(this.total_m[i]);

if(actividad.get('id_factor').value !== null){
this.precio=actividad.get('total_m').value*actividad.get('factor').value;
//console.log(this.precio);


actividad.patchValue({precio: this.precio.toFixed(2)});
}




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

console.log(this.sel);

    this.form.patchValue({totalmedida: this.sel.toFixed(2)});
//this.form.patchValue({mano_obra: 4.55});
this.form.patchValue({cdf_cif: 6.00});
//if(this.form.get('cdf_cif').value!=''){
this.tot=parseFloat(this.form.get('totalmedida').value);

this.costo_produccion= this.tot + 6.00;
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

submit(){
  this.loading=true;
  this.ce= this.form.get('idcodigo_estilo').value;

    const actividades = this.detalleForm.get('Rows') as FormArray;



            this.costo_produ.create(this.form.value).subscribe(res => {

                for(let i=0; i<actividades.value.length; i++){
 const actividad = actividades.at(i);
 console.log(actividad.value);
   this.detallecost.create(actividad.value).subscribe(res=>{
  //bitacora
        this.bitacora=this.loginS.userValue;

    this.bitacora2=this.bitacora['bitacora']
    this.id_bitacora=this.bitacora2['id_bitacora'];

   const detalle = {
    id_bitacora: this.id_bitacora,
      acciones: 'Registro nuevos precios del estilo: ' + this.ce.toString().padStart(4, '0')
      // Agrega aquí otros campos si es necesario
    };

this.bitacoraS.create(detalle).subscribe(res => {
});
//fin bitacora
                });
}

              


this.form.reset();

 swal.fire('Exito...', 'Costo de producción registrado con exito!!', 'success');


  this.router.navigateByUrl('dashboard/listado-costo');
    });



}

submit2(){
  this.loading2=true;
this.borrar=false;
 this.factorServ.create(this.formfactor.value).subscribe(res => {
 // this.mp=parseInt(this.formfactor.get('id_mp').value);

 //swal.fire('Exito...', 'Factor registrado con exito!!', 'success');
        this.materiaService.modificarFactor(this.mp, 0).subscribe(res => {
     this.getMPCosto(this.form.get('idcodigo_estilo').value);
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

  ngOnDestroy(){
      this.regresarService.regresarValue(false);
}



  limpiar(){
  this.formfactor.reset();
this.materiaprima=new Materiaprima();
this.medidamp= new Medidamp();
this.fact=0;

}



}
