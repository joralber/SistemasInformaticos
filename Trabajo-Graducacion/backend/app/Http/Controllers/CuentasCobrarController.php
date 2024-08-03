<?php

namespace App\Http\Controllers;

use App\Models\Cobros;
use App\Models\CuentaCobrar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CuentasCobrarController extends Controller
{
    public function cuentasporcliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcliente = $request->id_cliente;
            $cuentasxccliente = DB::table('cuenta_cobrar')->join('venta', 'cuenta_cobrar.id_venta', '=','venta.id_venta')
            ->join('cliente', 'venta.id_cliente', '=', 'cliente.id_cliente')->where('cliente.id_cliente', '=', $idcliente)
            ->where('cuenta_cobrar.saldo', '>', '0')->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'cuentasxccliente' => $cuentasxccliente,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function cuentasclientegeneral(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcliente = $request->id_cliente;
            $cuentasxccliente = DB::table('cuenta_cobrar')->join('venta', 'cuenta_cobrar.id_venta', '=','venta.id_venta')
            ->join('cliente', 'venta.id_cliente', '=', 'cliente.id_cliente')->where('cliente.id_cliente', '=', $idcliente)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'cuentasxccliente' => $cuentasxccliente,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function guardarabono(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objAbono = new Cobros();
            
            $objAbono->tiket = "010101";
            $objAbono->pago = $request->montopago;
            $objAbono->fecha_cobro = $request->fechapago;
            $objAbono->formapago = $request->formapago;
            $objAbono->id_cxc = $request->id_cxc;

            $objAbono->save();

            $mensaje = "Abono Realizado Exitosamente";
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

    public function getdatacuentaxc(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcuenta = $request->id_cxc;
            $datacuentaespecifica = CuentaCobrar::where('cuenta_cobrar.id_cxc', '=', $idcuenta)
            ->join('venta', 'cuenta_cobrar.id_venta', '=', 'venta.id_venta')
            ->join('cliente', 'venta.id_cliente', '=', 'cliente.id_cliente')
            ->select('cliente.*', 'venta.*', 'cuenta_cobrar.*')->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'datacuentaespecifica' => $datacuentaespecifica,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function getdetalleabonoxc(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcuentaxc = $request->id_cxc;
            $datadetalleabonos = Cobros::where('cobro.id_cxc', '=', $idcuentaxc)->get();

            $detalleventa = DB::table('detalle_venta')->join('venta', 'venta.id_venta', '=', 'detalle_venta.id_venta')
            ->join('productos_terminados', 'productos_terminados.id_producto', '=', 'detalle_venta.id_producto')
            ->join('tipo_documento', 'tipo_documento.id_tipodocumento', '=', 'venta.id_tipodocumento')
            ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
            ->join('categoria_pt', 'categoria_pt.id_cat_pt', '=', 'productos_terminados.id_cat_pt')
            ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
            ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
            ->join('cuenta_cobrar', 'cuenta_cobrar.id_venta', '=', 'venta.id_venta')
            ->select('codigo_estilo.estilo', 'detalle_venta.subtotal as subtunidad', 'detalle_venta.cantidad as cantunidad', 
            'detalle_venta.precio_unitario as preciounidad', 'venta.*', 'categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla')->where('cuenta_cobrar.id_cxc', '=', $idcuentaxc)->get();

            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'datadetalleabonos' => $datadetalleabonos,
                'datadetalleventa' => $detalleventa,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function actualizarcuentaxc(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idcuenta = $request->id_cxc;
            $saldoactualizado = $request->saldo;
            $cuotaactualizada = $request->cuotaspendientes;

            $objCuenta = CuentaCobrar::where('id_cxc','=',$idcuenta)
            ->first();

            $objCuenta->saldo = $saldoactualizado;
            $objCuenta->cuotas_pendientes = $cuotaactualizada;
            $objCuenta->save();

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
}
