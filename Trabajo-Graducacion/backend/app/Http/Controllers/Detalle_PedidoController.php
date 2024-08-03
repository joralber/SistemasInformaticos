<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_Pedido;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Detalle_PedidoController extends Controller
{
 public function create(Request $request){
      $data['idpedido'] = $request['idpedido'];
           $data['id_mp'] = $request['id_mp'];
                $data['cantidad2'] = $request['cantidad2'];
      Detalle_Pedido::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

           public function getAllDetalle($idpedido){
      $data = Detalle_Pedido::where('detalle_pedido_mp.idpedido', $idpedido)
      ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_pedido_mp.id_mp')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
       ->select( 'materia_prima.id_mp', 'materia_prima.nombre_producto',  'color_mp.color','detalle_pedido_mp.cantidad2')
      ->get();
      return response()->json($data, 200);
    }



      public function getUpdate($idpedido){
      $data = Detalle_Pedido::join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_pedido_mp.id_mp')
     
       ->select('materia_prima.id_mp', 'materia_prima.cantidad', 'detalle_pedido_mp.idpedido', 'detalle_pedido_mp.cantidad2')
      ->where('detalle_pedido_mp.idpedido', $idpedido)
      ->get();
      return response()->json($data, 200);
    }

  

}

