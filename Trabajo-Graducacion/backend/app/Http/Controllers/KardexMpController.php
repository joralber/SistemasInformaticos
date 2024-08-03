<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Kardex_mp;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class KardexMpController extends Controller
{
    
    
    public function getAll($id_mp){
        $data = Kardex_mp::join('mp_kardexmp', 'mp_kardexmp.id_kardex', '=', 'kardex_mp.id_kardex')
        ->join('materia_prima', 'materia_prima.id_mp', '=', 'mp_kardexmp.id_mp')
        ->where('materia_prima.estado', true)
        ->where('materia_prima.id_mp',$id_mp )
        ->select('kardex_mp.id_kardex','kardex_mp.descripcion', 'kardex_mp.inv_inicial', 'kardex_mp.fecha', 'kardex_mp.entradas', 'kardex_mp.salida','kardex_mp.inv_final','mp_kardexmp.idmp_kardexmp',
        'mp_kardexmp.id_kardex','mp_kardexmp.id_mp','materia_prima.id_mp','materia_prima.nombre_producto')
        ->orderBy('kardex_mp.id_kardex')
        ->get();
        return response()->json($data, 200);
        
      }

      

            public function create(Request $request){
      $data['descripcion'] = $request['descripcion'];
      $data['fecha'] = now();
      $data['inv_inicial'] = $request['inv_inicial'];
     $data['entradas'] = $request['entradas'];
      $data['salida'] = $request['salida'];
    $data['inv_final'] = $request['inv_final'];
      Kardex_mp::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


   

       public function ultimoid(){
      $data = Kardex_mp::latest('id_kardex')->first();

      return response()->json($data, 200);

    }

    public function update(Request $request,$id_kardex){
      $data['descripcion'] = $request['descripcion'];
      $data['fecha'] = $request['fecha'];
      $data['inv_inicial'] = $request['inv_inicial'];
     $data['entradas'] = $request['entradas'];
      $data['salida'] = $request['salida'];
    $data['inv_final'] = $request['inv_final'];

      Kardex_mp::find($id_kardex)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }


 public function get($id_kardex){
      $data = Kardex_mp::find($id_kardex);
      return response()->json($data, 200);

    }

     public function obtenerid(){

      $data = Kardex_mp::latest('kardex_mp.id_kardex')
                ->value('kardex_mp.id_kardex');
     // $data = Mp_kardexmp::latest('idmp_kardexmp')->first();
      //$data = Mp_kardexmp::find(1)->posts()->where('id_mp', $id_mp)->latest()->first()->id;

   // $data = Mp_kardexmp::find($id_mp)->first();
      return response()->json($data, 200);

    }



            public function create2(Request $request){
      $data['descripcion'] = $request['descripcion'];
      $data['fecha'] = now();
      $data['inv_inicial'] = $request['inv_inicial'];
     $data['entradas'] = $request['entradas'];
      $data['salida'] = $request['salida'];
    $data['inv_final'] = $request['inv_final'];
      Kardex_mp::create($data);

          return response()->json(['id_kardex' => $data->getKey()]);

      
    }

      public function getUpdatek(){
      $data = Kardex_mp::join('mp_kardexmp', 'mp_kardexmp.id_kardex', '=', 'kardex_mp.id_kardex')
       ->select('kardex_mp.id_kardex', 'kardex_mp.descripcion', 'kardex_mp.salida','kardex_mp.inv_final')
      ->get();
      return response()->json($data, 200);
    }

}

