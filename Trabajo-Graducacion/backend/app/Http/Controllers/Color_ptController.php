<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Color_pt;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Color_ptController extends Controller
{
    
     public function getAll(){
      $data = Color_pt::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($nombre_color){


        $data = Color_pt::where('estado', true)
        ->where('nombre_color',  $nombre_color)
        ->count();

        return response()->json($data, 200);

      
    }


    public function create(Request $request){
      $data['nombre_color'] = strtoupper($request['nombre_color']);
      $data['estado'] = true;
      
      Color_pt::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



    public function darBaja($id_color_pt){


        $data = Color_pt::where('id_color_pt', $id_color_pt);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_color_pt){
      $data = Color_pt::find($id_color_pt);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_color_pt){
      $data['nombre_color'] = strtoupper($request['nombre_color']);
    
      $data['estado'] = $request['estado'];

      Color_pt::find($id_color_pt)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }

}
