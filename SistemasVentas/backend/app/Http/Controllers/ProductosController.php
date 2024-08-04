<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Productos;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductosController extends Controller
{
    

   public function getAll(){
      $data = Productos::join('categoria', 'categoria.id_cat','=', 'productos.id_cat')
      ->join('color', 'color.id_color', '=', 'productos.id_color')
      ->join('talla', 'talla.id_talla', '=', 'productos.id_talla')
      ->select('productos.id_producto','productos.nombre_producto','productos.codigo_barra', 'productos.cantidad','productos.precio_unitario','categoria.categoria', 'color.color', 'talla.talla')
      ->where('productos.estado', true)
      ->orderBy('categoria.categoria')
      ->get();
      return response()->json($data, 200);
    }
    
    
       public function create(Request $request){
      $data['id_cat'] = $request['id_cat'];
      $data['id_color'] = $request['id_color'];
      $data['id_talla'] = $request['id_talla'];
    $data['nombre_producto'] = strtoupper($request['nombre_producto']);
      $data['codigo_barra'] = $request['codigo_barra'];
      $data['cantidad'] = $request['cantidad'];
      $data['precio_unitario'] = $request['precio_unitario'];
      $data['estado'] = true;
     
      
      Productos::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

       public function repetido($codigo_barra){


        $data = Productos::where('estado', true)
        ->where('codigo_barra',  $codigo_barra)
        ->count();

        return response()->json($data, 200);      
    }


        public function darBaja($id_producto){


        $data = Productos::where('id_producto', $id_producto);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }

    public function agragrarStock($id_producto, $cantidad){


        $data = Productos::where('id_producto', $id_producto);

        $data->update(['cantidad'=> $cantidad ]);

      return response()->json([
          'message' => "Stock agregado con exito",
          'success' => true
      ], 200);
    }

    public function get($id_producto){
      $data = Productos::find($id_producto);
      return response()->json($data, 200);

    }

        public function update(Request $request,$id_producto){
      $data['id_cat'] = $request['id_cat'];
      $data['id_color'] = $request['id_color'];
      $data['id_talla'] = $request['id_talla'];
    $data['nombre_producto'] = strtoupper($request['nombre_producto']);
      $data['codigo_barra'] = $request['codigo_barra'];
      $data['cantidad'] = $request['cantidad'];
      $data['precio_unitario'] = $request['precio_unitario'];
      $data['estado'] = $request['estado'];

      Productos::find($id_producto)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }


       public function repetido2($id_cat, $id_color, $id_talla, $nombre_producto){


        $data = Productos::where('estado', true)
        ->where('id_cat',  $id_cat)
        ->where('id_color', $id_color)
        ->where('id_talla', $id_talla)
        ->where('nombre_producto', $nombre_producto)
        ->count();

        return response()->json($data, 200);      
    }



     public function ultimoid(){
      $data = Productos::latest('id_producto')->first();

      return response()->json($data, 200);

    }


public function repetidopk($id_producto){


        $data = Productos::join('kardexp_productot', 'kardexp_productot.id_producto', '=', 'productos.id_producto')
        ->where('productos.estado', true)
        ->where('kardexp_productot.id_producto',  $id_producto)
        ->count();

        return response()->json($data, 200);      
    }


}
