<?php

namespace App\Http\Controllers;

use App\Models\MateriaPrima;
use Illuminate\Http\Request;
use App\Models\OrdenCompra;
use App\Models\Proveedor;
use App\Models\DetalleOrdenCompra;
use App\Models\Compra;
use App\Models\DetalleCompra;
use App\Models\DetalleDevolucionCompra;
use App\Models\DevolucionCompra;
use Illuminate\Support\Facades\DB;

class ComprasController extends Controller
{
    //------------------------------------
    public function listaOrden()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            // $listaOCompras = OrdenCompra::get();
            $listaOCompras = DB::table('orden_compra')
                ->join('proveedor', 'orden_compra.id_proveedor', '=', 'proveedor.id_proveedor')
                ->select('orden_compra.estado as status', 'orden_compra.*', 'proveedor.*')->get();

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'listaOCompras' => $listaOCompras,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    //-----------------------------------
    public function listaproveedores()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $listaproveedores = Proveedor::where('estado', true)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'proveedores' => $listaproveedores,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    //----------------------------------
    public function materiaprima()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $listamateriaprima = MateriaPrima::where('estado', true)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'materiaprima' => $listamateriaprima,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function guardarordencompra(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        // echo "<script>alert(".$detalle.")</script>";
        try {
            $idproveedor = $request->proveedorid;
            $fecha = $request->fecha;
            $total = $request->totalorden;
            $objOrdenCompra = new OrdenCompra();
            $objOrdenCompra->id_proveedor = $idproveedor;
            $objOrdenCompra->fecha = $fecha;
            $objOrdenCompra->total = $total;

            $objOrdenCompra->save();

            $detalle = $request->cantidad;
            $idordennow = $objOrdenCompra->id_ordencompra;

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
                'idorden' => $idordennow
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function guardardetalleoc(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        // echo "<script>alert(".$detalle.")</script>";
        try {
            $idordencompra = $request->idorden;
            $idmp = $request->materiaid;
            $descripcion = $request->descripcion;
            $cantidad = $request->cantidad;
            $preciounit = $request->precio;
            $subtotal = $request->subtotal;
            $objOrdenCompra = new DetalleOrdenCompra();
            $objOrdenCompra->id_ordencompra = $idordencompra;
            $objOrdenCompra->id_mp = $idmp;
            $objOrdenCompra->descripcion = $descripcion;
            $objOrdenCompra->cantidad = $cantidad;
            $objOrdenCompra->precio_unitario = $preciounit;
            $objOrdenCompra->subtotal = $subtotal;


            $objOrdenCompra->save();


            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    //-----------------------------------
    public function obtenercompra(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idorden = $request->id_ordencompra;
            $ordencompra = DB::table('orden_compra')->join('proveedor', 'orden_compra.id_proveedor', '=', 'proveedor.id_proveedor')->select('orden_compra.*', 'proveedor.*')->where('id_ordencompra', '=', $idorden)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'ordenespecifica' => $ordencompra,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function listardetalleoc(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idorden = $request->id_ordencompra;
            // $ordencompra = DB::table('detalle_orden_compra')
            //     ->join('orden_compra', 'detalle_orden_compra.id_ordencompra', '=', 'orden_compra.id_ordencompra')
            //     ->join('materia_prima', 'detalle_orden_compra.id_mp', '=', 'materia_prima.id_mp')
            //     ->select('orden_compra.estado as status', 'detalle_orden_compra.cantidad as cantidaddetalle', 'orden_compra.*', 'detalle_orden_compra.*', 'materia_prima.*')
            //     ->where('detalle_orden_compra.cantidad', '>', 'detalle_orden_compra.cant_aprobada')
            //     ->where('orden_compra.id_ordencompra', '=', $idorden)
            //     ->get();
            $ordencompra = DB::select('SELECT *, oc.estado as statuss, (doc.cantidad - doc.cant_aprobada) as cantidaddetalle FROM detalle_orden_compra as doc inner join orden_compra oc on doc.id_ordencompra = oc.id_ordencompra inner join materia_prima as mp on doc.id_mp = mp.id_mp where doc.cantidad > doc.cant_aprobada and oc.id_ordencompra = '.$idorden);
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detalleespecifico' => $ordencompra,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function getpreciomateria(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idmateria = $request->id_mp;
            $preciounitario = MateriaPrima::where('id_mp', '=', $idmateria)->first();
            $mensaje = "Datos extraidos";
            $status = "success";
            // $precioresult = $preciounitario->precio_unitario;
            return response()->json([
                'precioresult' => $preciounitario,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function getcomprasproveedor(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idproveedor = $request->id_proveedor;
            $comprasproveedor = DB::table('proveedor')
                ->join('compra', 'compra.id_proveedor', '=', 'proveedor.id_proveedor')
                ->select('compra.estado as status', 'compra.*')
                ->where('proveedor.id_proveedor', '=', $idproveedor)
                ->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'comprasproveedor' => $comprasproveedor,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function getdetallecompra(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcompra = $request->id_compra;
            $detallecompras = DB::table('compra')
                ->join('detalle_compra', 'detalle_compra.id_compra', '=', 'compra.id_compra')
                ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_compra.id_mp')
                ->select('compra.estado as status', 'detalle_compra.cantidad as cantidaddetalle', 'detalle_compra.precio_unitario as preciocompra', 'detalle_compra.*', 'materia_prima.*')
                ->where('compra.id_compra', '=', $idcompra)
                ->get();

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detallecompras' => $detallecompras,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }

    public function getdetallecompradev(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcompra = $request->id_compra;
            $objverificar = DB::table('compra')
            ->join('devolucion_compra', 'devolucion_compra.id_compra', '=', 'compra.id_compra')
            ->join('detalle_dev_compra', 'detalle_dev_compra.id_dcompra', '=', 'devolucion_compra.id_dcompra')
            ->select('detalle_dev_compra.cantidad')
            ->where('compra.id_compra', '=', $idcompra)
            ->get();
            if(count($objverificar) > 0){
                $detallecompras = DB::select('SELECT *,dc.cantidad as cantidaddetalle, dc.precio_unitario as preciocompra, (dc.cantidad - (SELECT dtv.cantidad FROM compra as c inner join devolucion_compra as dv on c.id_compra = dv.id_compra 
                inner join detalle_dev_compra as dtv on dv.id_dcompra = dtv.id_dcompra WHERE c.id_compra = cm.id_compra and dtv.id_mp = mp.id_mp)) as dvdisponible 
                FROM compra as cm inner join detalle_compra as dc on cm.id_compra = dc.id_compra inner join materia_prima as mp on dc.id_mp = mp.id_mp WHERE (dc.cantidad - (SELECT dtv.cantidad FROM compra as c inner join devolucion_compra as dv on c.id_compra = dv.id_compra 
                inner join detalle_dev_compra as dtv on dv.id_dcompra = dtv.id_dcompra WHERE c.id_compra = cm.id_compra and dtv.id_mp = mp.id_mp)) > 0 and cm.id_compra = '.$idcompra);
            } else {
                $detallecompras = DB::table('compra')
                ->join('detalle_compra', 'detalle_compra.id_compra', '=', 'compra.id_compra')
                ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_compra.id_mp')
                ->select('compra.estado as status', 'detalle_compra.cantidad as dvdisponible', 'detalle_compra.precio_unitario as preciocompra', 'detalle_compra.*', 'materia_prima.*')
                ->where('compra.id_compra', '=', $idcompra)
                ->get();
            }
            
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detallecompras' => $detallecompras,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }

    public function guardarcompra(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idproveedor = $request->idproveedor;
            $factura = $request->numerofactura;
            $fecha = $request->fecha;
            $tipocompra = $request->tipocompra;
            $subtotal = $request->subtotal;
            $iva = $request->iva;
            $total = $request->total;
            $objCompra = new Compra();
            $objCompra->id_proveedor = $idproveedor;
            $objCompra->n_factura = $factura;
            $objCompra->fecha = $fecha;
            $objCompra->tipo_compra = $tipocompra;
            $objCompra->subtotal = $subtotal;
            $objCompra->iva = $iva;
            $objCompra->total = $total;

            $objCompra->save();

            $idcompra = $objCompra->id_compra;

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
                'idcompra' => $idcompra
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function guardardetallecompra(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idcompra = $request->id_compra;
            $id_mp = $request->id_mp;
            $descripcion = "sin descripcion";
            $cantidad = $request->cantidad;
            $preciounit = $request->precio_unitario;
            $subtotal = $request->subtotal;
            $objDetCompra = new DetalleCompra();
            $objDetCompra->id_compra = $idcompra;
            $objDetCompra->id_mp = $id_mp;
            $objDetCompra->descripcion = $descripcion;
            $objDetCompra->cantidad = $cantidad;
            $objDetCompra->precio_unitario = $preciounit;
            $objDetCompra->subtotal = $subtotal;

            $objDetCompra->save();


            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function actualizarordencompra(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {

            $idorden = $request->id_ordencompra;
            $cantidad = $request->cantidad;
            $idmateria = $request->idmateria;

            $objDetOrden = DetalleOrdenCompra::where('id_ordencompra', '=', $idorden)->Where('id_mp', '=', $idmateria)
                ->first();
            $objDetOrden->cant_aprobada = $objDetOrden->cant_aprobada + $cantidad;
            $objDetOrden->save();

            // $objOrdenCompra = OrdenCompra::where('id_ordencompra', '=', $idorden)->first();
            // $objOrdenCompra->estado = 1;
            // $objOrdenCompra->save();
            $mensaje = "Compra agregada exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function finalizarodc(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {

            $idorden = $request->id_ordencompra;

            $objOrdenCompra = OrdenCompra::where('id_ordencompra', '=', $idorden)->first();
            $objOrdenCompra->estado = 1;
            $objOrdenCompra->save();
            $mensaje = "Compra agregada exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function guardardevolucion(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        // echo "<script>alert(".$detalle.")</script>";
        try {
            $idcompra = $request->idcompra;
            $fecha = $request->fecha;
            $motivo = $request->motivo;
            $observacion = $request->observaciones;
            $total = $request->total;
            $objDevCompra = new DevolucionCompra();
            $objDevCompra->id_compra = $idcompra;
            $objDevCompra->fechadevolucion = $fecha;
            $objDevCompra->motivo = $motivo;
            $objDevCompra->observaciones = $observacion;
            $objDevCompra->total = $total;

            $objDevCompra->save();

            $iddetalledev = $objDevCompra->id_dcompra;

            $mensaje = "Guardado exitosamente";
            $status = "success";

            return response()->json([
                'status' => $status,
                'mensaje' => $mensaje,
                'idddev' => $iddetalledev
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function guardardetalledev(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $iddcompra = $request->id_dcompra;
            $idmp = $request->id_mp;
            $cantidad = $request->cantidad;
            $preciounit = $request->precio_unitario;
            $subtotal = $request->subtotal;
            $objDetDevCompra = new DetalleDevolucionCompra();
            $objDetDevCompra->id_dcompra = $iddcompra;
            $objDetDevCompra->id_mp = $idmp;
            $objDetDevCompra->cantidad = $cantidad;
            $objDetDevCompra->precio = $preciounit;
            $objDetDevCompra->subtotal = $subtotal;

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
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function getdevoluciones()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $listadevoluciones = DB::table('devolucion_compra')
                ->join('compra', 'compra.id_compra', '=', 'devolucion_compra.id_compra')
                ->join('proveedor', 'proveedor.id_proveedor', '=', 'compra.id_proveedor')
                ->select('devolucion_compra.estado as status', 'devolucion_compra.*', 'proveedor.*')->get();

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'listadevoluciones' => $listadevoluciones,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function getdetalledev(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $iddevolucion = $request->id_dcompra;
            $listadetalledev = DB::table('devolucion_compra')
                ->join('detalle_dev_compra', 'detalle_dev_compra.id_dcompra', '=', 'devolucion_compra.id_dcompra')
                ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_dev_compra.id_mp')
                ->select('detalle_dev_compra.cantidad as cantidaddetalle', 'detalle_dev_compra.precio as preciodetalle', 'detalle_dev_compra.*', 'devolucion_compra.*', 'materia_prima.*')
                ->where('devolucion_compra.id_dcompra', '=', $iddevolucion)
                ->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'listadetalledev' => $listadetalledev,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
    public function getcompras()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            // $listaOCompras = OrdenCompra::get();
            $listadecompras = DB::table('compra')
                ->join('proveedor', 'proveedor.id_proveedor', '=', 'compra.id_proveedor')
                ->select('compra.*', 'proveedor.*')->get();

            $mensaje = "Datos Extraidos";
            $status = "success";

            return response()->json([
                'listadecompras' => $listadecompras,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }

    public function consultacredito(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idproveedor = $request->id_proveedor;
            $creditos = DB::table('proveedor')->join('compra', 'compra.id_proveedor', '=', 'proveedor.id_proveedor')
            ->join('cuentas_pagar', 'cuentas_pagar.id_compra', '=', 'compra.id_compra')->select('proveedor.*')
            ->where('proveedor.id_proveedor', '=', $idproveedor)
            ->where('compra.tipo_compra', '=', "CREDITO")
            ->where('cuentas_pagar.cuotaspendientes', '<>', 0)->get();

            $creditosincxp = DB::select('SELECT p.id_proveedor FROM proveedor as p INNER JOIN compra as c ON p.id_proveedor = c.id_proveedor WHERE c.id_compra 
            NOT IN (SELECT id_compra FROM cuentas_pagar) AND c.tipo_compra = "CREDITO" AND p.id_proveedor = '.$idproveedor);

            // $creditosincxp = DB::table('proveedor')->join('compra', 'compra.id_proveedor', '=', 'proveedor.id_proveedor')->select('proveedor.*')
            // ->where('proveedor.id_proveedor', '=', $idproveedor)
            // ->where('compra.tipo_compra', '=', "CREDITO")->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'creditos' => $creditos,
                'creditosincxp' => $creditosincxp,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }

    public function getdetalleodc(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idordencompra = $request->id_ordencompra;
            $detalleordencompras = DB::table('orden_compra')
                ->join('detalle_orden_compra', 'detalle_orden_compra.id_ordencompra', '=', 'orden_compra.id_ordencompra')
                ->join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_orden_compra.id_mp')
                ->select('detalle_orden_compra.cantidad as cantidaddetalle', 'detalle_orden_compra.cant_aprobada as cantidaprobada', 'detalle_orden_compra.*', 'materia_prima.*')
                ->where('orden_compra.id_ordencompra', '=', $idordencompra)
                ->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'detalleordencompras' => $detalleordencompras,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }

    public function checkmateriaprima(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idmp = $request->id_mp;
            $stockdisponible = MateriaPrima::where('id_mp', '=', $idmp)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'stockdisponible' => $stockdisponible,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
}
