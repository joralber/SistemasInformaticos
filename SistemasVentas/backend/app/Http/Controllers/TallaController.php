<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Talla;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TallaController extends Controller
{
     public function getAll(){
      $data = Talla::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($talla){


        $data = Talla::where('estado', true)
        ->where('talla',  $talla)
        ->count();

        return response()->json($data, 200);      
    }


    public function create(Request $request){
     

      $data['talla'] = strtoupper($request['talla']);
      $data['estado'] = true;
      Talla::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


    public function darBaja($id_talla){


        $data = Talla::where('id_talla', $id_talla);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_talla){
      $data = Talla::find($id_talla);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_talla){
      $data['talla'] = strtoupper($request['talla']);
    
      $data['estado'] = $request['estado'];

      Talla::find($id_talla)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
    
}
