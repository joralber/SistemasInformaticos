<?php

namespace App\Http\Controllers;

use App\Models\DetalleDevolucionVenta;
use App\Models\DevolucionVenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DevolucionVentaController extends Controller
{
    public function getventacliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {

            // $ventascliente = DB::select('SELECT c.id_cliente, c.nombre, v.id_venta, v.n_factura, v.fecha, v.tipocompra, 
            // v.subtotal, v.iva, v.total, v.tipoprecio from cliente as c inner join venta as v on c.id_cliente = v.id_cliente 
            // where v.id_venta not in (select id_venta from devolucion_venta) and c.id_cliente = '.$request->id_cliente.' 
            // UNION 
            // select c.id_cliente, c.nombre, v.id_venta, v.n_factura, v.fecha, v.tipocompra, v.subtotal, v.iva, v.total, 
            // v.tipoprecio from cliente as c inner join venta as v on c.id_cliente = v.id_cliente inner join cuenta_cobrar as ct 
            // on v.id_venta = ct.id_venta where v.id_venta not in (select id_venta from devolucion_venta) and ct.id_cxc not in (select id_cxc from cobro) and c.id_cliente = ' . $request->id_cliente);

            $ventascliente = DB::select('SELECT c.id_cliente, c.nombre, v.id_venta, v.n_factura, v.fecha, v.tipocompra, 
            v.subtotal, v.iva, v.total, v.tipoprecio, v.tipocompra from cliente as c inner join venta as v on c.id_cliente = v.id_cliente
            inner join cuenta_cobrar as ct on v.id_venta = ct.id_venta
            where v.id_venta not in (select id_venta from devolucion_venta) and ct.id_cxc not in (select id_cxc from cobro) and c.id_cliente = '.$request->id_cliente.' and v.tipocompra = "CREDITO"
            UNION
            SELECT c.id_cliente, c.nombre, v.id_venta, v.n_factura, v.fecha, v.tipocompra, 
            v.subtotal, v.iva, v.total, v.tipoprecio, v.tipocompra from cliente as c inner join venta as v on c.id_cliente = v.id_cliente
            where v.id_venta not in (select id_venta from devolucion_venta) and c.id_cliente = '.$request->id_cliente.' and v.tipocompra = "CONTADO"');

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'ventascliente' => $ventascliente,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function getdetalleventadev(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idventa = $request->id_venta;
            $objverificar = DB::table('venta')
                ->join('devolucion_venta', 'devolucion_venta.id_venta', '=', 'venta.id_venta')
                ->join('detalle_dev_venta', 'detalle_dev_venta.id_dventa', '=', 'devolucion_venta.id_dventa')
                ->select('detalle_dev_venta.cantidad')
                ->where('venta.id_venta', '=', $idventa)
                ->get();
            if (count($objverificar) > 0) {
                $detalleventas = DB::select('SELECT *, dc.cantidad as cantidaddetalle, cat.nombre_cat, cl.nombre_color, tl.nombre_talla,
                case when cm.tipoprecio = "CONSUMIDORFINAL" then cst.total_iva_consumidorf when cm.tipoprecio = "MAYOREO" then cst.total_iva_mayoreo else 0 end as precioventa, 
                cm.n_factura, est.estilo, (dc.cantidad - (SELECT dtv.cantidad FROM venta as c inner join devolucion_venta as dv on c.id_venta = dv.id_venta 
                inner join detalle_dev_venta as dtv on dv.id_dventa = dtv.id_dventa WHERE c.id_venta = cm.id_venta and dtv.id_producto = mp.id_producto)) as dvdisponible 
                FROM venta as cm inner join detalle_venta as dc on cm.id_venta = dc.id_venta inner join productos_terminados as mp on dc.id_producto = mp.id_producto
                inner join codigo_estilo as est on mp.idcodigo_estilo = est.idcodigo_estilo
                inner join costo_produccion as cst on mp.id_costo_produccion = cst.id_costo_produccion
                inner join categoria_pt as cat on mp.id_cat_pt = cat.id_cat_pt inner join color_pt as cl on mp.id_color_pt = cl.id_color_pt
                inner join talla_pt as tl on mp.id_talla_pt = tl.id_talla_pt 
                WHERE (dc.cantidad - (SELECT dtv.cantidad FROM venta as c inner join devolucion_venta as dv on c.id_venta = dv.id_venta 
                inner join detalle_dev_venta as dtv on dv.id_dventa = dtv.id_dventa WHERE c.id_venta = cm.id_venta and dtv.id_producto = mp.id_producto)) > 0 and cm.id_venta = ' . $idventa);
            } else {
                // $detalleventas = DB::table('venta')
                //     ->join('detalle_venta', 'detalle_venta.id_venta', '=', 'venta.id_venta')
                //     ->join('productos_terminados', 'productos_terminados.id_producto', '=', 'detalle_venta.id_producto')
                //     ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
                //     ->select('venta.estado as status', 'detalle_venta.cantidad as dvdisponible', 'detalle_venta.precio_unitario as precioventa', 'venta.n_factura', 'codigo_estilo.estilo', 'detalle_venta.*', 'productos_terminados.*')
                //     ->where('venta.id_venta', '=', $idventa)
                //     ->get();
                $detalleventas = DB::select('SELECT *, dv.cantidad as dvdisponible, cat.nombre_cat, cl.nombre_color, tl.nombre_talla,
                case when v.tipoprecio = "CONSUMIDORFINAL" then cst.total_iva_consumidorf when v.tipoprecio = "MAYOREO" then cst.total_iva_mayoreo else 0 end as precioventa,
                v.n_factura, est.estilo
                FROM venta as v inner join detalle_venta as dv on v.id_venta = dv.id_venta inner join productos_terminados as mp on dv.id_producto = mp.id_producto
                inner join codigo_estilo as est on mp.idcodigo_estilo = est.idcodigo_estilo
                inner join costo_produccion as cst on mp.id_costo_produccion = cst.id_costo_produccion
                inner join categoria_pt as cat on mp.id_cat_pt = cat.id_cat_pt inner join color_pt as cl on mp.id_color_pt = cl.id_color_pt
                inner join talla_pt as tl on mp.id_talla_pt = tl.id_talla_pt where v.id_venta = ' . $idventa);
            }

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detalleventas' => $detalleventas,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function guardardevolucionvnt(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        // echo "<script>alert(".$detalle.")</script>";
        try {
            $objDv = new DevolucionVenta();
            $objDv->id_venta = $request->idventa;
            $objDv->fecha_devolucion = $request->fecha;
            $objDv->motivo = $request->motivo;
            $objDv->observaciones = $request->observaciones;
            $objDv->total = $request->total;

            $objDv->save();

            $iddetdventa = $objDv->id_dventa;

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
                'iddetdventa' => $iddetdventa
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    public function guardardetalledevvnt(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objDetDevCompra = new DetalleDevolucionVenta();
            $objDetDevCompra->id_dventa = $request->iddventa;
            $objDetDevCompra->id_producto = $request->idproducto;
            $objDetDevCompra->cantidad = $request->cantidad;
            $objDetDevCompra->precio = $request->precio_unitario;
            $objDetDevCompra->subtotal = $request->subtotal;

            $objDetDevCompra->save();

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

    public function getdevolucionesventa()
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $listadevolucionventa = DB::table('devolucion_venta')
                ->join('venta', 'venta.id_venta', '=', 'devolucion_venta.id_venta')
                ->join('cliente', 'cliente.id_cliente', '=', 'venta.id_cliente')
                ->select(
                    'devolucion_venta.id_dventa',
                    'devolucion_venta.fecha_devolucion',
                    'devolucion_venta.motivo',
                    'venta.n_factura',
                    'cliente.nombre'
                )->get();

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
                'listadevolucionventa' => $listadevolucionventa
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function getdetdevolucionventa(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $listadetalledev = DB::select('SELECT c.nombre, dv.id_dventa, v.total, est.estilo, cat.nombre_cat, col.nombre_color, cat.nombre_cat, tl.nombre_talla, ddv.cantidad, ddv.subtotal,
            case when v.tipoprecio = "CONSUMIDORFINAL" then cst.total_iva_consumidorf when v.tipoprecio = "MAYOREO" then cst.total_iva_mayoreo else 0 end as costoreal 
            from devolucion_venta as dv inner join detalle_dev_venta as ddv on dv.id_dventa =  ddv.id_dventa inner join venta as v on dv.id_venta = v.id_venta 
            inner join cliente as c on v.id_cliente =  c.id_cliente inner join productos_terminados as p on ddv.id_producto = p.id_producto 
            inner join costo_produccion as cst on p.id_costo_produccion = cst.id_costo_produccion inner join codigo_estilo as est on p.idcodigo_estilo = est.idcodigo_estilo 
            inner join categoria_pt as cat on p.id_cat_pt = cat.id_cat_pt inner join color_pt as col on p.id_color_pt = col.id_color_pt 
            inner join talla_pt as tl on p.id_talla_pt = tl.id_talla_pt where dv.id_dventa = ' . $request->id_dventa);
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
                'listadetalledev' => $listadetalledev
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    // $precioproducto = Productos_terminados::where('productos_terminados.id_producto', '=', $request->id_producto)
    //         ->join('costo_produccion', 'costo_produccion.id_costo_produccion', '=', 'productos_terminados.id_costo_produccion')
    //         ->select('costo_produccion.total_iva_mayoreo', 'costo_produccion.total_iva_consumidorf', 'productos_terminados.cantidad')->first();
}
