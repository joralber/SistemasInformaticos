<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Talla_pt;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Talla_ptController extends Controller
{

	 public function getAll(){
      $data = Talla_pt::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($nombre_talla){


        $data = Talla_pt::where('estado', true)
        ->where('nombre_talla',  $nombre_talla)
        ->count();

        return response()->json($data, 200);      
    }


    public function create(Request $request){
     

      $data['nombre_talla'] = strtoupper($request['nombre_talla']);
      $data['estado'] = true;
      Talla_pt::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


    public function darBaja($id_talla_pt){


        $data = Talla_pt::where('id_talla_pt', $id_talla_pt);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_talla_pt){
      $data = Talla_pt::find($id_talla_pt);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_talla_pt){
      $data['nombre_talla'] = strtoupper($request['nombre_talla']);
    
      $data['estado'] = $request['estado'];

      Talla_pt::find($id_talla_pt)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
    
}
