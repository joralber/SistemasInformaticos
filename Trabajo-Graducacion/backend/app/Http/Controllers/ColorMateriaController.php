<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ColorMateria;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ColorMateriaController extends Controller
{
    

   public function getAll(){
      $data = ColorMateria::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($color){


        $data = ColorMateria::where('estado', true)
        ->where('color',  $color)
        ->count();

        return response()->json($data, 200);

      
    }


    public function create(Request $request){
      $data['color'] = strtoupper($request['color']);
      $data['estado'] = true;
      
      ColorMateria::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



    public function darBaja($id_color){


        $data = ColorMateria::where('id_color', $id_color);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_color){
      $data = ColorMateria::find($id_color);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_color){
      $data['color'] = strtoupper($request['color']);
    
      $data['estado'] = $request['estado'];

      ColorMateria::find($id_color)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
}
