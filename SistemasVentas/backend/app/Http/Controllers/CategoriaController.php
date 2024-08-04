<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class CategoriaController extends Controller
{

     public function getAll(){
      $data = Categoria::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($categoria){


        $data = Categoria::where('estado', true)
        ->where('categoria',  $categoria)
        ->count();

        return response()->json($data, 200);      
    }


    public function create(Request $request){
     

      $data['categoria'] = strtoupper($request['categoria']);
      $data['estado'] = true;
      Categoria::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


    public function darBaja($id_cat){


        $data = Categoria::where('id_cat', $id_cat);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_cat){
      $data = Categoria::find($id_cat);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_cat){
      $data['categoria'] = strtoupper($request['categoria']);
    
      $data['estado'] = $request['estado'];

      Categoria::find($id_cat)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
}
