<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Venta;
use App\Models\Productos;
use App\Models\Cliente;

use Illuminate\Support\Facades\DB;
class ReportesController extends Controller
{
    
        //ingresos
     public function venta(){
      $data = Venta::get();
      return response()->json($data, 200);
    }


//productos mas vendidos
       public function productosMV($fechaInicio, $fechaFin){
      $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
      ->join('productos', 'productos.id_producto','=','detalle_venta.id_producto')
       ->join('categoria', 'categoria.id_cat','=', 'productos.id_cat')
      ->join('color', 'color.id_color', '=', 'productos.id_color')
      ->join('talla', 'talla.id_talla', '=', 'productos.id_talla')
      ->select('productos.id_producto','productos.nombre_producto','productos.codigo_barra','productos.precio_unitario','categoria.categoria', 'color.color', 'talla.talla', DB::raw('SUM(detalle_venta.cantidad) as nventa'))
     ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
      ->groupBy('productos.id_producto')
      ->orderBy('nventa', 'desc')
      ->get();
      return response()->json($data, 200);
    }
    
  //cliente nuevo
   public function clienteN($fechaInicio, $fechaFin){
      $data = Cliente::where('estado', true)
     ->whereBetween('created_at', [$fechaInicio, $fechaFin])
      ->orderBy('.id_cliente', 'desc')
      ->get();
      return response()->json($data, 200);
    }

    //venta por categoria

           public function vendidoC($id_categoria){
      $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
      ->join('productos', 'productos.id_producto','=','detalle_venta.id_producto')
       ->join('categoria', 'categoria.id_cat','=', 'productos.id_cat')
      ->join('color', 'color.id_color', '=', 'productos.id_color')
      ->join('talla', 'talla.id_talla', '=', 'productos.id_talla')
      ->select('productos.id_producto','productos.nombre_producto','productos.codigo_barra','productos.precio_unitario','categoria.categoria', 'color.color', 'talla.talla', DB::raw('SUM(detalle_venta.cantidad) as nventa'))
     ->where('productos.id_cat', $id_categoria)
      ->groupBy('productos.id_producto')
      ->orderBy('nventa', 'desc')
      ->get();
      return response()->json($data, 200);
    }
    

    //reporte de ventas por empleados
           public function ventasEmp($fechaInicio, $fechaFin){
      $data =Venta::join('users', 'users.id','=','venta.id')
      ->select('users.*',  DB::raw('SUM(venta.total) as tventa'), DB::raw('COUNT(venta.id) as nventa'))
     ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
      ->groupBy('venta.id')
      ->orderBy('tventa', 'desc')
      ->get();
      return response()->json($data, 200);
    }


    //venta por municipio
    public function clienteZona($fechaInicio, $fechaFin){
        $data= Venta::join('cliente','cliente.id_cliente','=', 'venta.id_cliente')
        ->join('municipio','municipio.id_municipio','=','cliente.id_municipio')
        ->select('municipio.nombremunicipio',DB::raw('SUM(venta.total) as tventa'), DB::raw('COUNT(DISTINCT cliente.id_cliente) as ncliente'))
        ->groupBy('municipio.id_municipio')
                  ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
            ->orderByDesc('tventa')
        ->get();
                return response()->json($data, 200);
    }


       //venta mas frecuente
    public function clienteMF($fechaInicio, $fechaFin){
        $data= Venta::join('cliente','cliente.id_cliente','=', 'venta.id_cliente')
        ->select('cliente.*',DB::raw('COUNT(venta.id_cliente) as nventa'))
        ->groupBy('venta.id_cliente')
                  ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
            ->orderByDesc('nventa')
        ->get();
                return response()->json($data, 200);

    }
    
}
