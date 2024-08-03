<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CategoriaMateria;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoriaMateriaController extends Controller
{

   public function getAll(){
      $data = CategoriaMateria::where('estado', true)->get();
      return response()->json($data, 200);
    }

    public function repetido($nombre){


        $data = CategoriaMateria::where('estado', true)
        ->where('nombre',  $nombre)
        ->count();

        return response()->json($data, 200);      
    }


    public function create(Request $request){
     

      $data['nombre'] = strtoupper($request['nombre']);
      $data['estado'] = true;
      CategoriaMateria::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


    public function darBaja($id_categoria){


        $data = CategoriaMateria::where('id_categoria', $id_categoria);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }



    public function get($id_categoria){
      $data = CategoriaMateria::find($id_categoria);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_categoria){
      $data['nombre'] = strtoupper($request['nombre']);
    
      $data['estado'] = $request['estado'];

      CategoriaMateria::find($id_categoria)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }
}
