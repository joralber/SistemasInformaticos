<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class VentaController extends Controller
{
     public function ultimoid(){
      $data = Venta::latest('id_venta')->first();

      return response()->json($data, 200);

    }

    public function create(Request $request){
      $data['fecha'] = now();
      $data['total'] = $request['total'];
      $data['id_cliente'] = $request['id_cliente'];
      $data['id'] = $request['id'];
      $data['efectivo']=$request['efectivo'];
      $data['cambio']=$request['cambio'];
      
      Venta::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



  public function getAll(){
      $data = Venta::join('cliente','cliente.id_cliente','=','venta.id_cliente')
      ->join('users','users.id','=','venta.id')
      ->select('venta.*','cliente.*', 'users.*')
      ->orderBy('venta.id_venta', 'desc')
      ->get();
      return response()->json($data, 200);
    }


      public function get($idVenta){
      $data = Venta::find($idVenta);
      return response()->json($data, 200);

    }


}