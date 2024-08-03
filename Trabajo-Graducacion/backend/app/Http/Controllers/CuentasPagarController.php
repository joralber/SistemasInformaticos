<?php

namespace App\Http\Controllers;
use App;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Compra;
use App\Models\CuentasPagar;
use App\Models\Abono;

class CuentasPagarController extends Controller
{
    //
    public function compraspendientes(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idproveedor = $request->id_proveedor;
            $comprascompare = Compra::where('compra.id_proveedor', '=', $idproveedor)->where('compra.tipo_compra', '=', "CREDITO")->get();
            $cuentascompare = DB::table('cuentas_pagar')->join('compra', 'compra.id_compra', '=', 'cuentas_pagar.id_compra')
            ->join('proveedor', 'proveedor.id_proveedor', '=', 'compra.id_proveedor')->select('cuentas_pagar.*')
            ->where('compra.id_proveedor', '=', $idproveedor)->get();
            $mensaje = "Datos extraidos";
            $status = "success";
            return response()->json([
                'comprascompare' => $comprascompare,
                'cuentascompare' => $cuentascompare,
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
    public function extraerdatoscompra(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcompra = $request->id_compra;
            $datafieldcompra = Compra::where('compra.id_compra', '=', $idcompra)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'datafieldcompra' => $datafieldcompra,
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
    public function guardarcuentaspagar(Request $request)
    {

        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idcompra = $request->id_compra;
            $deuda = $request->deuda;
            $montocuota = $request->montocuota;
            $saldo = $request->saldo;
            $numcuotas = $request->numero_cuotas;
            $cuotaspendientes = $request->cuotaspendientes;
            $fechafactura = $request->fecha_factura;
            $periodopago = $request->periodo;
            $objCuentaPagar = new CuentasPagar();
            $objCuentaPagar->id_compra = $idcompra;
            $objCuentaPagar->deuda = $deuda;
            $objCuentaPagar->montocuota = $montocuota;
            $objCuentaPagar->saldo = $saldo;
            $objCuentaPagar->numero_cuotas = $numcuotas;
            $objCuentaPagar->cuotaspendientes = $cuotaspendientes;
            $objCuentaPagar->fecha_factura = $fechafactura;
            $objCuentaPagar->periodopago = $periodopago;

            $objCuentaPagar->save();

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

    public function cuentasporproveedor(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idproveedor = $request->id_proveedor;
            $datacuentaproveedor = DB::table('cuentas_pagar')->join('compra', 'cuentas_pagar.id_compra', '=','compra.id_compra')
            ->join('proveedor', 'compra.id_proveedor', '=', 'proveedor.id_proveedor')->where('proveedor.id_proveedor', '=', $idproveedor)
            ->where('cuentas_pagar.saldo', '>', '0')->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'datacuentaproveedor' => $datacuentaproveedor,
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

    public function getdatacuenta(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcuenta = $request->id_cxp;
            $datacuentaespecifica = CuentasPagar::where('cuentas_pagar.id_cxp', '=', $idcuenta)->get();
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

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }

    public function getdetalleabono(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $idcuentaxp = $request->id_cxp;
            $datadetalleabonos = Abono::where('abono.id_cxp', '=', $idcuentaxp)->get();
            $mensaje = "Datos extraidos";
            $status = "success";

            return response()->json([
                'datadetalleabonos' => $datadetalleabonos,
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

    public function guardarabonocuenta(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idcxp = $request->id_cxp;
            $montopago = $request->montopago;
            $fechapago = $request->fechapago;
            $formapago = $request->formapago;
            $objAbono = new Abono();
            $objAbono->id_cxp = $idcxp;
            $objAbono->tiket = "010101";
            $objAbono->pago = $montopago;
            $objAbono->fecha_abono = $fechapago;
            $objAbono->formapago = $formapago;

            $objAbono->save();

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

    public function actualizarcuenta(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idcuenta = $request->id_cxp;
            $saldoactualizado = $request->saldo;
            $cuotaactualizada = $request->cuotaspendientes;

            $objCuenta = CuentasPagar::where('id_cxp','=',$idcuenta)
            ->first();

            $objCuenta->saldo = $saldoactualizado;
            $objCuenta->cuotaspendientes = $cuotaactualizada;
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
        //

        return response()->json([
            'status' => $status,
            'mensaje' => $mensaje,
        ]);
    }
}
