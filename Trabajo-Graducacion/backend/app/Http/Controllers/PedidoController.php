<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Pedido;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PedidoController extends Controller
{
     public function ultimoid(){
      $data = Pedido::latest('idpedido')->first();

      return response()->json($data, 200);

    }

    public function create(Request $request){
      $data['numero_pedido'] = $request['numero_pedido'];
      $data['fecha'] = now();
      $data['descripcion'] = $request['descripcion'];
      $data['estado'] = true;
      
      Pedido::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }


  public function getAll(){
      $data = Pedido::orderBy('pedido.idpedido')
      ->get();
      return response()->json($data, 200);
    }


      public function get($idpedido){
      $data = Pedido::find($idpedido);
      return response()->json($data, 200);

    }


}


/*


  public function getAll(){
      $data = Pedido::join('detalle_pedido_mp', 'detalle_pedido_mp.idpedido', '=', 'pedido.idpedido')
      ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_pedido_mp.id_mp')
            ->join('medida_mp', 'medida_mp.id_medida', '=', 'materia_prima.id_medida')
            ->join('categoria_mp', 'categoria_mp.id_categoria', '=', 'materia_prima.id_categoria')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
      ->select('pedido.idpedido','pedido.numero_pedido', 'pedido.fecha', 'detalle_pedido_mp.cantidad2','materia_prima.id_mp','materia_prima.nombre_producto',  'materia_prima.cantidad', 'categoria_mp.nombre', 'color_mp.color', 'medida_mp.medida')
      ->orderBy('pedido.idpedido')
      ->get();
      return response()->json($data, 200);
    }

+/