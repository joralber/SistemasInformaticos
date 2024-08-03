<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\DetalleCodigoEstilo;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DetalleCodigoEstiloController extends Controller
{
            public function create(Request $request){
              
      $data['idcodigo_estilo'] = $request['idcodigo_estilo'];
        $data['id_mp'] = $request['id_mp'];
      
      DetalleCodigoEstilo::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


         public function getAllDetalle($idcodigo_estilo){
      $data = DetalleCodigoEstilo::where('idcodigo_estilo', $idcodigo_estilo)
      ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_codigo_estilo.id_mp')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
      ->join('medida_mp', 'medida_mp.id_medida', '=', 'materia_prima.id_medida')
      ->select('detalle_codigo_estilo.iddetalle_codigo_estilo', 'materia_prima.id_mp', 'materia_prima.nombre_producto','detalle_codigo_estilo.idcodigo_estilo', 'color_mp.id_color', 'color_mp.color', 'medida_mp.medida')
      ->get();
      return response()->json($data, 200);
    }

    
     public function delete($iddetalle_codigo_estilo){
      $res = DetalleCodigoEstilo::find($iddetalle_codigo_estilo)->delete();
      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }


  public function costoMP($idcodigo_estilo){
      $data=DetalleCodigoEstilo::join('materia_prima', 'materia_prima.id_mp','=','detalle_codigo_estilo.id_mp')
      ->leftJoin('cortes', 'cortes.id_mp', '=' ,'materia_prima.id_mp')
      ->leftJoin('factor', 'factor.id_mp', '=', 'materia_prima.id_mp')
      ->where('materia_prima.estado', true)
      ->where('detalle_codigo_estilo.idcodigo_estilo', $idcodigo_estilo)
      ->select('materia_prima.id_mp', 'materia_prima.nombre_producto', 'materia_prima.cortesmp', 'factor.id_factor', 'factor.factor', 'cortes.id_cortes', 'cortes.cortes')
      ->orderBy('materia_prima.cortesmp')
      ->orderBy('factor.id_factor')
      ->orderBy('cortes.id_cortes')
      ->get();


   return response()->json($data, 200);
    }




}
