<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kardex_Productos;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Kardex_ProductosController extends Controller
{

  

      public function getAll($id_producto){
        $data = Kardex_Productos::join('kardexp_productot', 'kardexp_productot.id_kardex_productos', '=', 'kardex_productos.id_kardex_productos')
        ->join('productos_terminados', 'productos_terminados.id_producto', '=', 'kardexp_productot.id_producto')
        ->where('productos_terminados.estado', true)
        ->where('productos_terminados.id_producto',$id_producto )
        ->select('kardex_productos.id_kardex_productos','kardex_productos.descripcionp', 'kardex_productos.inv_inicialp', 'kardex_productos.fechap', 'kardex_productos.entradasp', 'kardex_productos.salidap','kardex_productos.inv_finalp')
        ->orderBy('kardex_productos.id_kardex_productos')
        ->get();
        return response()->json($data, 200);
        
      }


     public function ultimoid(){
           $data = Kardex_Productos::latest('id_kardex_productos')->first();

      return response()->json($data, 200);

    }
      

            public function create(Request $request){
      $data['descripcionp'] = $request['descripcionp'];
      $data['fechap'] = now();
      $data['inv_inicialp'] = $request['inv_inicialp'];
     $data['entradasp'] = $request['entradasp'];
      $data['salidap'] = $request['salidap'];
    $data['inv_finalp'] = $request['inv_finalp'];
      Kardex_Productos::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

    public function update(Request $request,$id_kardex_productos){
      $data['descripcionp'] = $request['descripcionp'];
      $data['fechap'] = $request['fechap'];
      $data['inv_inicialp'] = $request['inv_inicialp'];
     $data['entradasp'] = $request['entradasp'];
      $data['salidap'] = $request['salidap'];
    $data['inv_finalp'] = $request['inv_finalp'];

      Kardex_Productos::find($id_kardex_productos)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }

   


}

