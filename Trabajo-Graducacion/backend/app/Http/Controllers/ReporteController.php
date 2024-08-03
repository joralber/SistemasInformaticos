<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MateriaPrima;
use Illuminate\Support\Facades\DB;

use App\Models\DetalleCodigoEstilo;

use App\Models\MedidaMateria;
use App\Models\CategoriaMateria;
use App\Models\Productos_terminados;
use App\Models\DevolucionCompra;
use App\Models\CodigoEstilo;
use App\Models\Proveedor;
use App\Models\Compra;
use App\Models\Cliente;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\DevolucionVenta;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class ReporteController extends Controller
{

 public function getAll(){
      $data = CategoriaMateria::where('estado', true)
      ->orderBy('nombre')
         ->get();
      return response()->json($data, 200);
    }

        public function mpCategoria($id_categoria){

$data = MateriaPrima::where('materia_prima.id_categoria', $id_categoria )
->join('categoria_mp', 'categoria_mp.id_categoria', '=', 'materia_prima.id_categoria')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
            ->join('medida_mp', 'medida_mp.id_medida', '=', 'materia_prima.id_medida')
      ->select('materia_prima.id_mp','materia_prima.nombre_producto', 'materia_prima.precio_unitario', 'materia_prima.cantidad', 'materia_prima.stock_minimo', 'categoria_mp.nombre', 'color_mp.color', 'medida_mp.medida', 'categoria_mp.nombre')
->orderBy('materia_prima.nombre_producto')
->get();

      return response()->json($data, 200);



    }


    ///producto final
     public function productoTerminado(){
      $data = Productos_terminados::join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('costo_produccion', 'costo_produccion.id_costo_produccion', '=', 'productos_terminados.id_costo_produccion')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
      ->select('productos_terminados.id_producto','productos_terminados.codigo_barra', 'productos_terminados.cantidad','codigo_estilo.estilo', 'costo_produccion.total_iva_consumidorf', 'costo_produccion.total_iva_mayoreo','categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla')
      ->where('productos_terminados.estado', true)
      ->orderBy('productos_terminados.cantidad', 'desc')
      ->get();
      return response()->json($data, 200);
    }

    ///dev s/ compra
     public function devMP(){
      $data = DevolucionCompra::join('detalle_dev_compra', 'detalle_dev_compra.id_dcompra', '=', 'devolucion_compra.id_dcompra')
      ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_dev_compra.id_mp')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
      ->select('devolucion_compra.fechadevolucion', 'devolucion_compra.motivo', 'detalle_dev_compra.cantidad', 'detalle_dev_compra.precio','detalle_dev_compra.subtotal', 'color_mp.color', 'materia_prima.nombre_producto')
      ->orderBy('devolucion_compra.fechadevolucion', 'desc')
      ->get();
      return response()->json($data, 200);
    }
    
   public function estiloBaja(){
      $data = CodigoEstilo::where('estado', false)->get();
      return response()->json($data, 200);
    }

    //mpDado de baja
       public function mpBaja(){
      $data = MateriaPrima::where('materia_prima.estado', false)
          ->join('categoria_mp', 'categoria_mp.id_categoria', '=', 'materia_prima.id_categoria')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
            ->join('medida_mp', 'medida_mp.id_medida', '=', 'materia_prima.id_medida')
    ->select('categoria_mp.nombre', 'medida_mp.medida','color_mp.color','materia_prima.nombre_producto')
       ->get();
      return response()->json($data, 200);
    }

//proveedor
     public function proveedorBaja(){
      $data = Proveedor::where('estado', false)->get();
      return response()->json($data, 200);
    }

    //egresos
     public function compra(){
      $data = Compra::get();
      return response()->json($data, 200);
    }


    //clinte
         public function cliente(){
      $data = Cliente::where('estado', true)
      ->get();
      return response()->json($data, 200);
    }
   


    //clinte baja
         public function clienteB(){
      $data = Cliente::where('estado', false)
      ->get();
      return response()->json($data, 200);
    }
   
    //venta creditto
    public function ventaCred(){
      $data = Venta::join('cliente','cliente.id_cliente', '=', 'venta.id_cliente')
      ->select('cliente.nombre', 'cliente.telefono', 'venta.n_factura', 'venta.fecha', 'venta.tipocompra', 'venta.subtotal', 'venta.iva', 'venta.total')
->where('venta.tipocompra','CREDITO')
     ->get();
      return response()->json($data, 200);
    }


    //venta contado
    public function ventaCont(){
      $data = Venta::join('cliente','cliente.id_cliente', '=', 'venta.id_cliente')
      ->select('cliente.nombre', 'cliente.telefono', 'venta.n_factura', 'venta.fecha', 'venta.tipocompra', 'venta.subtotal', 'venta.iva', 'venta.total')
->where('venta.tipocompra','CONTADO')
     ->get();
      return response()->json($data, 200);
    }



//venta contado
    public function venta_cliente(){
      $data = Venta::join('cliente','cliente.id_cliente', '=', 'venta.id_cliente')
            ->select('cliente.nombre', 'cliente.telefono', 'cliente.email', DB::raw('SUM(venta.total) as total'))
            ->groupBy('cliente.nombre', 'cliente.telefono', 'cliente.email')
            ->orderBy('total', 'desc')
            ->get();
      return response()->json($data, 200);
    }

    //ingresos
     public function venta(){
      $data = Venta::get();
      return response()->json($data, 200);
    }


    //ingresos
     public function estiloVendidos(){
      $data = DetalleVenta::join('productos_terminados', 'productos_terminados.id_producto','=', 'detalle_venta.id_producto')
      ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo','=','productos_terminados.idcodigo_estilo')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt','=', 'productos_terminados.id_talla_pt')
      ->select('color_pt.nombre_color','codigo_estilo.codigo', 'codigo_estilo.estilo','talla_pt.nombre_talla', DB::raw('SUM(detalle_venta.cantidad) as cantidad'))
      ->groupBy('codigo_estilo.idcodigo_estilo','productos_terminados.id_producto','color_pt.id_color_pt','talla_pt.id_talla_pt' )
      ->orderBy('cantidad', 'desc')
      ->get();
      return response()->json($data, 200);
    }


    ///dev s/ compra
     public function devVen(){
      $data = DevolucionVenta::join('detalle_dev_venta', 'detalle_dev_venta.id_dventa', '=', 'devolucion_venta.id_dventa')
      ->join('productos_terminados', 'productos_terminados.id_producto','=', 'detalle_dev_venta.id_producto')
      ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo','=','productos_terminados.idcodigo_estilo')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt','=', 'productos_terminados.id_talla_pt')
      ->select('codigo_estilo.estilo', 'color_pt.nombre_color', 'talla_pt.nombre_talla', 'devolucion_venta.fecha_devolucion', 'devolucion_venta.motivo', 'detalle_dev_venta.cantidad','detalle_dev_venta.precio', 'detalle_dev_venta.subtotal' )
      ->orderBy('devolucion_venta.fecha_devolucion', 'desc')
      ->get();
      return response()->json($data, 200);
    }


//proveedor frecuente
    public function proveedorFre($fechaInicio, $fechaFin){
      $data = Compra::join('proveedor','proveedor.id_proveedor', '=', 'compra.id_proveedor')
            ->select('proveedor.nombre', 'proveedor.celular', 'proveedor.email', DB::raw('COUNT(compra.id_proveedor) as ncompra'))
            ->whereBetween('compra.fecha', [$fechaInicio, $fechaFin])
            ->where('proveedor.estado', true)
            ->groupBy('proveedor.id_proveedor')
            ->orderBy('ncompra', 'desc')
            ->get();
      return response()->json($data, 200);
    }   


    ///producto final mas vendido
     public function productoTerminadoFre($fechaInicio, $fechaFin){
      $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
      ->join('productos_terminados', 'productos_terminados.id_producto','=','detalle_venta.id_producto')
      ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
      ->select('productos_terminados.codigo_barra','codigo_estilo.codigo','codigo_estilo.estilo','categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla',  DB::raw('COUNT(detalle_venta.id_producto) as nventa'))
      ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
      ->where('productos_terminados.estado', true)
      ->groupBy('productos_terminados.id_producto')
      ->orderBy('nventa', 'desc')
      ->get();
      return response()->json($data, 200);
    }

        ///producto final menos vendido
     public function productoTerminadoMenFre($fechaInicio, $fechaFin){
      $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
      ->join('productos_terminados', 'productos_terminados.id_producto','=','detalle_venta.id_producto')
      ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
      ->select('productos_terminados.codigo_barra','codigo_estilo.codigo','codigo_estilo.estilo','categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla',  DB::raw('COUNT(detalle_venta.id_producto) as nventa'))
      ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
      ->where('productos_terminados.estado', true)
      ->groupBy('productos_terminados.id_producto')
      ->orderBy('nventa')
      ->get();
      return response()->json($data, 200);
    }

//mas vendidos por color
    public  function masVendidosColor(Request $request)
    {
               $fechaInicio=$request->input('fechaInicio');
               $fechaFin=$request->input('fechaFin');

         $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
        ->join('productos_terminados', 'productos_terminados.id_producto','=','detalle_venta.id_producto')
        ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->where('productos_terminados.estado', true)
          ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
    ->select('codigo_estilo.idcodigo_estilo', 'codigo_estilo.codigo','codigo_estilo.estilo','color_pt.nombre_color', DB::raw('SUM(detalle_venta.cantidad) as total_vendido'))
    ->groupBy('codigo_estilo.idcodigo_estilo', 'color_pt.nombre_color' )
    ->orderByDesc('total_vendido')
    ->get();
          return response()->json($data, 200);

        
    }

    //mas vendidos por talla
    public  function masVendidosTalla(Request $request)
    {
               $fechaInicio=$request->input('fechaInicio');
               $fechaFin=$request->input('fechaFin');

        $data =Venta::join('detalle_venta', 'detalle_venta.id_venta','=','venta.id_venta')
        ->join('productos_terminados', 'productos_terminados.id_producto','=','detalle_venta.id_producto')
        ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')      
    ->select('codigo_estilo.idcodigo_estilo', 'codigo_estilo.codigo', 'codigo_estilo.estilo','talla_pt.nombre_talla', DB::raw('SUM(detalle_venta.cantidad) as total_vendido'))
    ->groupBy('talla_pt.id_talla_pt', 'codigo_estilo.idcodigo_estilo')
      ->where('productos_terminados.estado', true)
          ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])
    ->orderByDesc('total_vendido')
    ->get();
          return response()->json($data, 200);

        
    }
//reporte cliente con deuda
    public function clienteDeuda(){
        $data= Cliente::join('venta', 'venta.id_cliente','=','cliente.id_cliente')
        ->join('cuenta_cobrar', 'cuenta_cobrar.id_venta','=','venta.id_venta')
        ->where('cuenta_cobrar.saldo', '>', 0.1)
        ->select('cliente.nombre', 'cliente.telefono', 'cliente.email', 'cuenta_cobrar.saldo')
        ->get();

        return response()->json($data, 200);
    }


    //venta por municipio
    public function clienteZona($fechaInicio, $fechaFin){
        $data= Venta::join('cliente','cliente.id_cliente','=', 'venta.id_cliente')
        ->join('municipio','municipio.id_municipio','=','cliente.id_municipio')
        ->select('municipio.nombremunicipio',DB::raw('SUM(venta.total) as tventa'))
        ->groupBy('municipio.id_municipio')
                  ->whereBetween('venta.fecha', [$fechaInicio, $fechaFin])

            ->orderByDesc('tventa')

        ->get();
                return response()->json($data, 200);

    }
}



