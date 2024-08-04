<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detalle_Venta;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Productos;
use App\Models\kardex_productos;
use App\Models\Kardexp_Productot;
use Illuminate\Support\Facades\DB;

class Detalle_VentaController extends Controller
{
     public function createD(Request $request){
      $data['id_venta'] = $request['id_venta'];
           $data['id_producto'] = $request['id_producto'];
                $data['cantidad'] = $request['cantidad'];
                $data['descuento'] = $request['descuento'];
            
            $canV= $request['cantidad'];;
            $id_producto= $request['id_producto'];
            $idv=$request['id_venta'];
      Detalle_Venta::create($data);

 // Busca el producto por su ID
    $producto = Productos::find($id_producto);

    if ($producto) {
        // Obtiene la cantidad del producto
        $cantidadActual = $producto->cantidad;

         if ($canV <= $cantidadActual) {
            // Calcula la nueva cantidad en inventario
            $nuevaCantidad = $cantidadActual - $canV;
            // Actualiza la cantidad en inventario
            $producto->cantidad = $nuevaCantidad;
            $producto->save();

        }

        //kardex
      
              $datakx['descripcionp'] = 'Salida de la venta # '.$idv;
           $datakx['fechap'] = now();
                $datakx['salidap'] = $canV;
                $datakx['inv_finalp'] = $nuevaCantidad;
            
      Kardex_Productos::create($datakx);

    //  $ultimoId = Kardex_Productos::latest()->first()->id_kardex_productos;
$ultimoId = DB::table('kardex_productos')->max('id_kardex_productos');


         $datakxp['id_producto'] = $id_producto;
                $datakxp['id_kardex_productos'] = $ultimoId;
            
      Kardexp_Productot::create($datakxp);
    } 

      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



  public function getAllDetalle($id_venta){
      $data = Detalle_Venta::join('venta','venta.id_venta','=','detalle_venta.id_venta')
      ->join('productos','productos.id_producto','=','detalle_venta.id_producto')
      ->join('categoria', 'categoria.id_cat','=', 'productos.id_cat')
      ->join('color', 'color.id_color', '=', 'productos.id_color')
      ->join('talla', 'talla.id_talla', '=', 'productos.id_talla')
      ->where('detalle_venta.id_venta', $id_venta)
      ->select('detalle_venta.*', 'venta.*','productos.id_producto','productos.nombre_producto','productos.precio_unitario', 'categoria.*', 'color.*', 'talla.*')
      ->get();
      return response()->json($data, 200);
    }

}

