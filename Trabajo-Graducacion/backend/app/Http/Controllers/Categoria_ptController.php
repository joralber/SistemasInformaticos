<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Categoria_pt;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Categoria_ptController extends Controller
{
     public function getAll(){
      $data = Categoria_pt::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($nombre_cat){


        $data = Categoria_pt::where('estado', true)
        ->where('nombre_cat',  $nombre_cat)
        ->count();

        return response()->json($data, 200);      
    }


    public function create(Request $request){
     

      $data['nombre_cat'] = strtoupper($request['nombre_cat']);
      $data['estado'] = true;
      Categoria_pt::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


    public function darBaja($id_cat_pt){


        $data = Categoria_pt::where('id_cat_pt', $id_cat_pt);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_cat_pt){
      $data = Categoria_pt::find($id_cat_pt);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_cat_pt){
      $data['nombre_cat'] = strtoupper($request['nombre_cat']);
    
      $data['estado'] = $request['estado'];

      Categoria_pt::find($id_cat_pt)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
}
