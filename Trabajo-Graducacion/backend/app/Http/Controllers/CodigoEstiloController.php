<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CodigoEstilo;
use App\Models\CostoProduccion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CodigoEstiloController extends Controller
{
    //

     public function getAll(){
      $data = CodigoEstilo::where('estado', true)->get();
      return response()->json($data, 200);
    }

     public function getAll2(){
        $costo= CostoProduccion::select('idcodigo_estilo')
        ->get();

      $data = CodigoEstilo::where('estado', true)
      ->select('idcodigo_estilo', 'codigo', 'estilo')
      ->whereNotIn('idcodigo_estilo', $costo)
      ->get();
      return response()->json($data, 200);
    }

 public function ultimoid(){
      $data = CodigoEstilo::latest('idcodigo_estilo')->first();

      return response()->json($data, 200);

    }


        public function create(Request $request){
      $data['codigo'] = $request['codigo'];
        $data['estilo'] = strtoupper($request['estilo']);
      $data['estado'] = true;
      
      CodigoEstilo::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



        public function darBaja($idcodigo_estilo){


        $data = CodigoEstilo::where('idcodigo_estilo', $idcodigo_estilo);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }



public function codigoCosto(){

 //costo = CostoProduccion::select('costo_produccion.idcodigo_estilo')->get();

         $data = CodigoEstilo::where('estado', true)->get();
      return response()->json($data, 200);

}

 public function get($idcodigo_estilo){
      $data = CodigoEstilo::find($idcodigo_estilo);
      return response()->json($data, 200);

    }


 public function update(Request $request,$idcodigo_estilo){
     $data['codigo'] = $request['codigo'];
     $data['estilo'] = strtoupper($request['estilo']);
     $data['estado'] = $request['estado'];

      CodigoEstilo::find($idcodigo_estilo)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }


    public function repetido($estilo){


        $data = CodigoEstilo::where('estado', true)
        ->where('estilo',  $estilo)
        ->count();

        return response()->json($data, 200);

      
    }




}
