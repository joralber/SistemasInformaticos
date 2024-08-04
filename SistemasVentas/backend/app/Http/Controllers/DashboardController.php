<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Cliente;
use App\Models\Productos;
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


       public function nProductos(){
      $data =Productos::where('estado', true)->count();
      return response()->json($data, 200);
    }


       public function ventaD(){
        $fechaHoy = now()->format('Y-m-d');
      $data =Venta::whereDate('fecha', $fechaHoy) 
    ->sum('total'); 
     return response()->json($data, 200);

      }

         public function ventaMes(){
  

$seisMesesAtras = now()->subMonths(6)->format('Y-m-01'); // Fecha actual menos 6 meses, ajustada al primer día del mes
DB::statement("SET lc_time_names = 'es_ES'"); // Configura la localización en español

$data = Venta::select(
        DB::raw('YEAR(fecha) as anio'),
        DB::raw('MONTHNAME(fecha) as mes'),
        DB::raw('SUM(total) as total_ventas')
    )
    ->where('fecha', '>=', $seisMesesAtras)
    ->groupBy('anio', 'mes')
    ->orderBy('anio', 'asc')
    ->orderBy('mes', 'asc')
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
