<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\MedidaMateria;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MedidaMateriaController extends Controller
{
    

   public function getAll(){
      $data = MedidaMateria::where('estado', true)->get();
      return response()->json($data, 200);
    }


    public function repetido($medida){


        $data = MedidaMateria::where('estado', true)
        ->where('medida',  $medida)
        ->count();

        return response()->json($data, 200);

      
    }


    public function create(Request $request){
      $data['medida'] = strtoupper($request['medida']);
      $data['estado'] = true;
      
      MedidaMateria::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



    public function darBaja($id_medida){


        $data = MedidaMateria::where('id_medida', $id_medida);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_medida){

      $data = MedidaMateria::find($id_medida);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_medida){
      $data['medida'] = strtoupper($request['medida']);
    
      $data['estado'] = $request['estado'];

      MedidaMateria::find($id_medida)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
}
