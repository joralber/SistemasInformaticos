<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Cliente;
use App\Models\Productos_terminados;
use App\Models\Compra;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    

     public function nVenta(){
      $data =Venta::count();
      return response()->json($data, 200);
    }

     public function nCliente(){
      $data =Cliente::where('estado', true)->count();
      return response()->json($data, 200);
    }

   public function nCompra(){
      $data =Compra::count();
      return response()->json($data, 200);
    }

       public function nProductos(){
      $data =Productos_terminados::where('estado', true)->count();
      return response()->json($data, 200);
    }

       public function nVentaCre(){
        
    $ventasCredito = Venta::where('tipocompra', 'CREDITO')->count();
    $ventasContado = Venta::where('tipocompra', 'CONTADO')->count();        
    return response()->json([
        'ventasCredito' => $ventasCredito,
        'ventasContado' => $ventasContado,
    ]);    
}


       public function nCompraCre(){
        
    $comprasCredito = Compra::where('tipo_compra', 'CREDITO')->count();
    $comprasContado = Compra::where('tipo_compra', 'CONTADO')->count();        
    return response()->json([
        'comprasCredito' => $comprasCredito,
        'comprasContado' => $comprasContado,
    ]);    
}


    ///producto final mas vendido
     public function productoTerminadoMas(){
      $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
      ->join('productos_terminados', 'productos_terminados.id_producto','=','detalle_venta.id_producto')
      ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
      ->select('productos_terminados.codigo_barra','codigo_estilo.codigo','codigo_estilo.estilo','categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla',  DB::raw('COUNT(detalle_venta.id_producto) as nventa'))
      ->where('productos_terminados.estado', true)
      ->groupBy('productos_terminados.id_producto')
      ->orderBy('nventa', 'desc')
      ->get();
      return response()->json($data, 200);
    }

///cliente
     public function clienteMasF(){
      $data =Venta::join('cliente', 'cliente.id_cliente','=','venta.id_cliente')
      ->select('cliente.nombre',  DB::raw('COUNT(venta.id_cliente) as nventaC'))
      ->where('cliente.estado', true)
      ->groupBy('cliente.id_cliente')
      ->orderBy('nventaC', 'desc')
      ->get();
      return response()->json($data, 200);
    }

}
