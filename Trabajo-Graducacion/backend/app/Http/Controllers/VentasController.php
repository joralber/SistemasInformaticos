<?php

namespace App\Http\Controllers;

use App\Models\Categoria_pt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Cliente;
use App\Models\CuentaCobrar;
use App\Models\DetalleVenta;
use App\Models\Kardex_Productos;
use App\Models\Kardexp_Productot;
use App\Models\Productos_terminados;
use App\Models\TipoDocumento;
use App\Models\Venta;

class VentasController extends Controller
{
    public function tipodocumento()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $tipodocumento = TipoDocumento::get();

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'tipodocumento' => $tipodocumento,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    public function existeticket()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $tickets = Venta::where('id_tipodocumento', '=', 3)->latest()->value('n_factura');

            $mensaje = "Verificando existencia de tickets";
            $status = "success";

            return response()->json([
                'tickets' => $tickets,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function buscarcliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $campobusqueda = $request->search;
            $clientesactivos = DB::select('SELECT * FROM cliente where estado = 1 and (nombre like "%'.$campobusqueda.'%" or dui like "%'.$campobusqueda.'%" 
            or nit like "%'.$campobusqueda.'%" or email like "%'.$campobusqueda.'%")');
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'clientesactivos' => $clientesactivos,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function buscarproducto(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $campobusqueda = $request->search;
            $productosdisponibles = DB::select('SELECT pt.id_producto, est.estilo, ct.nombre_cat, clr.nombre_color, tl.nombre_talla, pt.codigo_barra, pt.cantidad, cp.total_iva_mayoreo, cp.total_iva_consumidorf from productos_terminados as pt 
            inner join categoria_pt as ct on pt.id_cat_pt = ct.id_cat_pt
            inner join color_pt as clr on pt.id_color_pt = clr.id_color_pt inner join talla_pt as tl
            on pt.id_talla_pt = tl.id_talla_pt inner join codigo_estilo as est on pt.idcodigo_estilo = est.idcodigo_estilo 
            inner join costo_produccion as cp on pt.id_costo_produccion = cp.id_costo_produccion
            where (pt.codigo_barra LIKE "%'.$campobusqueda.'%" OR est.estilo LIKE "%'.$campobusqueda.'%") AND (pt.estado = 1 and pt.cantidad > 0) ORDER BY est.estilo');
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'productosdisponibles' => $productosdisponibles,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function getcategorias()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $categorias = DB::select('SELECT DISTINCT ct.id_cat_pt, ct.nombre_cat from productos_terminados as pt 
            inner join categoria_pt as ct on pt.id_cat_pt = ct.id_cat_pt
            inner join color_pt as clr on pt.id_color_pt = clr.id_color_pt inner join talla_pt as tl
            on pt.id_talla_pt = tl.id_talla_pt inner join codigo_estilo as est on pt.idcodigo_estilo = est.idcodigo_estilo 
            where pt.estado = 1 and pt.cantidad > 0 AND ct.estado = 1 ORDER BY ct.nombre_cat');

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'categorias' => $categorias,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function getcolores(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $colores = DB::select('SELECT DISTINCT clr.id_color_pt, clr.nombre_color from productos_terminados as pt 
            inner join categoria_pt as ct on pt.id_cat_pt = ct.id_cat_pt
            inner join color_pt as clr on pt.id_color_pt = clr.id_color_pt inner join talla_pt as tl
            on pt.id_talla_pt = tl.id_talla_pt inner join codigo_estilo as est on pt.idcodigo_estilo = est.idcodigo_estilo 
            where pt.estado = 1 and pt.cantidad > 0 AND clr.estado = 1 and ct.id_cat_pt = '.$request->id_cat_pt.' ORDER BY clr.nombre_color');

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'colores' => $colores,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function gettallas(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $tallas = DB::select('SELECT DISTINCT tl.id_talla_pt, tl.nombre_talla from productos_terminados as pt 
            inner join categoria_pt as ct on pt.id_cat_pt = ct.id_cat_pt
            inner join color_pt as clr on pt.id_color_pt = clr.id_color_pt inner join talla_pt as tl
            on pt.id_talla_pt = tl.id_talla_pt inner join codigo_estilo as est on pt.idcodigo_estilo = est.idcodigo_estilo 
            where pt.estado = 1 and pt.cantidad > 0 AND tl.estado = 1 and clr.id_color_pt = '.$request->id_color_pt.' ORDER BY tl.nombre_talla');

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'tallas' => $tallas,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function productoporfiltro(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $productosdispfiltro = DB::select('SELECT pt.id_producto, est.estilo, ct.nombre_cat, clr.nombre_color, tl.nombre_talla, pt.codigo_barra, pt.cantidad, cp.total_iva_mayoreo, cp.total_iva_consumidorf from productos_terminados as pt 
            inner join categoria_pt as ct on pt.id_cat_pt = ct.id_cat_pt
            inner join color_pt as clr on pt.id_color_pt = clr.id_color_pt inner join talla_pt as tl
            on pt.id_talla_pt = tl.id_talla_pt inner join codigo_estilo as est on pt.idcodigo_estilo = est.idcodigo_estilo 
            inner join costo_produccion as cp on pt.id_costo_produccion = cp.id_costo_produccion
            where (ct.id_cat_pt = '.$request->idcat.' && clr.id_color_pt = '.$request->idcolor.' && tl.id_talla_pt = '.$request->idtalla.') AND (pt.estado = 1 and pt.cantidad > 0) ORDER BY est.estilo');
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'productosdispfiltro' => $productosdispfiltro,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    public function precioproducto(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $precioproducto = Productos_terminados::where('productos_terminados.id_producto', '=', $request->id_producto)
            ->join('costo_produccion', 'costo_produccion.id_costo_produccion', '=', 'productos_terminados.id_costo_produccion')
            ->select('costo_produccion.total_iva_mayoreo', 'costo_produccion.total_iva_consumidorf', 'productos_terminados.cantidad')->first();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'precioproducto' => $precioproducto,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function verificacreditos(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcliente = $request->id_cliente;
            $creditos = DB::table('cliente')->join('venta', 'venta.id_cliente', '=', 'cliente.id_cliente')
            ->join('cuenta_cobrar', 'cuenta_cobrar.id_venta', '=', 'venta.id_venta')->select('cliente.*')
            ->where('cliente.id_cliente', '=', $idcliente)
            ->where('venta.tipocompra', '=', "CREDITO")
            ->where('cuenta_cobrar.cuotas_pendientes', '<>', 0)->get();

            $creditosincxc = DB::select('SELECT c.id_cliente FROM cliente as c INNER JOIN venta as v ON c.id_cliente = v.id_cliente WHERE v.id_venta 
            NOT IN (SELECT id_venta FROM cuenta_cobrar) AND v.tipocompra = "CREDITO" AND c.id_cliente = '.$idcliente);

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'creditos' => $creditos,
                'creditosincxc' => $creditosincxc,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }


/*
    public function guardarventa(Request $request){
     

      $data['n_factura'] = $request['n_documento'];
            $data['fecha'] = $request['fecha'];
      $data['tipocompra'] = $request['tipocompra'];
      $data['subtotal'] = $request['subtotal'];
      $data['iva'] = $request['iva'];
      $data['total'] = $request['total'];
      $data['iva'] = $request['iva'];
      $data['id_tipodocumento'] = $request['tipo_documento'];
      $data['id_cliente'] = $request['cliente'];

      Venta::create($data);
$idventa = Venta::latest()->value('id_venta');

      return response()->json([
        'id_venta' => $idventa,
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }
    */

    public function guardarventa(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $objVenta = new Venta();

            $objVenta->n_factura = $request->n_documento;
            $objVenta->fecha = $request->fecha;
            $objVenta->tipocompra = $request->tipocompra;
            $objVenta->tipoprecio = $request->tipoprecio;
            $objVenta->subtotal = $request->subtotal;
            $objVenta->iva = $request->iva;
            $objVenta->total = $request->total;
            $objVenta->id_tipodocumento = $request->tipo_documento;
            $objVenta->id_cliente = $request->cliente;

            $objVenta->save();

            $idventa = $objVenta->id_venta;

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'id_venta' => $idventa,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function guardardetventa(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $objVenta = new DetalleVenta();

            $objVenta->cantidad = $request->cantidad;
            $objVenta->precio_unitario = $request->precio_unitario;
            $objVenta->subtotal = $request->subtotal;
            $objVenta->descripcion = $request->descripcion;
            $objVenta->id_venta = $request->idventa;
            $objVenta->id_producto = $request->idproducto;

            $objVenta->save();

            $mensaje = "Venta Realizada";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    public function guardarcxc(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objCxc = new CuentaCobrar();
            $objCxc->monto_credito = $request->montocredito;
            $objCxc->numero_cuotas = $request->numero_cuotas;
            $objCxc->monto_cuota = $request->montocuota;
            $objCxc->saldo = $request->saldo;
            $objCxc->cuotas_pendientes = $request->cuotaspendientes;
            $objCxc->periodopago = $request->periodo;
            $objCxc->id_venta = $request->id_venta;

            $objCxc->save();

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function consultastock(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idproducto = $request->idproducto;
            $dataproducto = Productos_terminados::where('id_producto', '=', $idproducto)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'dataproducto' => $dataproducto,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }


    public function regkardex(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objK = new Kardex_Productos();
            $objK->descripcionp = $request->descripcion;
            $objK->fechap = $request->fecha;
            $objK->salidap = $request->salida;
            $objK->inv_finalp = $request->inv_final;

            $objK->save();

            $idkardexp = $objK->id_kardex_productos;

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'idkardex' => $idkardexp,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function regkardexentrada(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objK = new Kardex_Productos();
            $objK->descripcionp = $request->descripcion;
            $objK->fechap = $request->fecha;
            $objK->entradasp = $request->entrada;
            $objK->inv_finalp = $request->inv_final;

            $objK->save();

            $idkardexp = $objK->id_kardex_productos;

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'idkardex' => $idkardexp,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function actualizastockpt(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idproducto = $request->idproducto;
            $nuevostock = $request->cantidad;

            $objProd = Productos_terminados::where('id_producto','=',$idproducto)
            ->first();

            $objProd->cantidad = $nuevostock;
            $objProd->save();

            $mensaje = "Producto actualizado";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function intermediakarx(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objIk = new Kardexp_Productot();
            $objIk->id_producto = $request->idproducto;
            $objIk->id_kardex_productos = $request->idkardexprod;

            $objIk->save();

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function listaventas()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $listaventas = DB::table('venta')
            ->join('tipo_documento', 'tipo_documento.id_tipodocumento', '=', 'venta.id_tipodocumento')
            ->join('cliente', 'cliente.id_cliente', '=', 'venta.id_cliente')->select('venta.*', 'tipo_documento.*', 'cliente.nombre')->get();
            $mensaje = "Datos extraidos";
            $status = "success";
            return response()->json([
                'listaventas' => $listaventas,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

    }

    public function getdetalleventa(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idventa = $request->id_venta;
            $detalleventa = DB::table('detalle_venta')->join('venta', 'venta.id_venta', '=', 'detalle_venta.id_venta')
            ->join('productos_terminados', 'productos_terminados.id_producto', '=', 'detalle_venta.id_producto')
            ->join('tipo_documento', 'tipo_documento.id_tipodocumento', '=', 'venta.id_tipodocumento')
            ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
            ->join('categoria_pt', 'categoria_pt.id_cat_pt', '=', 'productos_terminados.id_cat_pt')
            ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
            ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
            ->select('codigo_estilo.estilo', 'detalle_venta.subtotal as subtunidad', 'detalle_venta.cantidad as cantunidad', 
            'detalle_venta.precio_unitario as preciounidad', 'venta.*', 'categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla')->where('venta.id_venta', '=', $idventa)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detalleventa' => $detalleventa,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function getventaimpresion(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {

            $detalleimpresion = DB::table('venta')
            ->join('tipo_documento', 'tipo_documento.id_tipodocumento', '=', 'venta.id_tipodocumento')
            ->join('cliente', 'cliente.id_cliente', '=', 'venta.id_cliente')
            ->select('tipo_documento.id_tipodocumento', 'cliente.*', 'venta.*')->where('venta.id_venta', '=', $request->id_venta)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            

            return response()->json([
                'detalleimpresion' => $detalleimpresion,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    public function getdetalleimpresion(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $detalleimpresionrows = DB::table('detalle_venta')->join('venta', 'venta.id_venta', '=', 'detalle_venta.id_venta')
            ->join('productos_terminados', 'productos_terminados.id_producto', '=', 'detalle_venta.id_producto')
            ->join('tipo_documento', 'tipo_documento.id_tipodocumento', '=', 'venta.id_tipodocumento')
            ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
            ->join('categoria_pt', 'categoria_pt.id_cat_pt', '=', 'productos_terminados.id_cat_pt')
            ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
            ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
            ->select('tipo_documento.id_tipodocumento', 'tipo_documento.tipodocumento', 'codigo_estilo.estilo', 'detalle_venta.subtotal as subdetalle', 'detalle_venta.cantidad as cantdetalle', 
            'detalle_venta.precio_unitario as preciodetalle', 'detalle_venta.descripcion', 'categoria_pt.nombre_cat', 
            'color_pt.nombre_color', 'talla_pt.nombre_talla', 'venta.*')->where('venta.id_venta', '=', $request->id_venta)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detalleimpresionrows' => $detalleimpresionrows,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
}
