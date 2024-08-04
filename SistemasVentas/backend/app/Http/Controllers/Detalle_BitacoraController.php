<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_Bitacora;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Detalle_BitacoraController extends Controller
{

      public function getAllDetalle($id_bitacora){
      $data = Detalle_Bitacora::where('id_bitacora', $id_bitacora )
      ->get();
      return response()->json($data, 200);
    }

        public function create(Request $request){
      $data['id_bitacora']= $request['id_bitacora'];
      $data['acciones'] = $request['acciones'];
        $data['hora'] = now();
      
      Detalle_Bitacora::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }
}
