<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\MateriaPrima;

use App\Models\Factor;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class FactorController extends Controller
{
    
         public function getAll(){
      $data = Factor::where('factor.estado', true)
      ->join('materia_prima', 'materia_prima.id_mp', '=', 'factor.id_mp')
      ->select('factor.id_factor', 'factor.factor', 'factor.unidades', 'materia_prima.id_mp','materia_prima.nombre_producto')
      ->where('materia_prima.estado', true)
      ->orderBy('materia_prima.nombre_producto')
      ->get();
      return response()->json($data, 200);
    }

        public function create(Request $request){
      $data['id_mp'] = $request['id_mp'];
      $data['fecha'] = now();
      $data['unidades'] = $request['unidades'];
      $data['factor'] = $request['factor'];
      $data['estado'] = true;
      
      Factor::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

/*
  public function obtenerDatos($id_factor){
      $data = Factor::where('id_factor', $id_factor)
      ->join('materia_prima','materia_prima.id_mp', '=', 'factor.id_mp')
      ->join('medida_mp', 'medida_mp.id_medida', '=', 'materia_prima.id_medida')
      ->select('factor.id_factor', 'factor.id_mp', 'factor.fecha', 'factor.unidades','factor.factor', 'factor.estado' , 'materia_prima.nombre_producto', 'materia_prima.precio_unitario', 'medida_mp.medida')
      ->get();
      return response()->json($data, 200);
    }
    */


    public function get($id_factor){

      $data = Factor::find($id_factor);
      return response()->json($data, 200);

    }

 


  public function update(Request $request,$id_factor){
      $data['id_mp'] = $request['id_mp'];
      $data['fecha'] = $request['fecha'];
      $data['unidades'] = $request['unidades'];
      $data['factor'] = $request['factor'];
      $data['estado'] = $request['estado'];

      Factor::find($id_factor)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }



    public function existe($id_mp){


        $data = Factor::where('id_mp', $id_mp)
        ->get();

        return response()->json($data, 200);

      
    }

    public function get_mp($id_mp){
   $data = Factor::find($id);
      return response()->json($data, 200);

    }


}
