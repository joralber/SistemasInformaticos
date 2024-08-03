<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bitacora;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class BitacoraController extends Controller
{
    public function getAll(){
      $data = Bitacora::join('users', 'users.id', '=', 'bitacora.id')
      ->select('bitacora.id_bitacora','bitacora.inicio', 'bitacora.salida', 'users.name', 'users.email', 'users.role')
      ->orderBy('id_bitacora', 'desc')
      ->get();
      return response()->json($data, 200);
    }




     public function ModificarBitacora($id_bitacora){


        $data = Bitacora::where('id_bitacora',  $id_bitacora);

        $data->update(['salida'=> now()]);

      return response()->json([
          'message' => "Bitacora actualizado con exito",
          'success' => true
      ], 200);
    }



  }
