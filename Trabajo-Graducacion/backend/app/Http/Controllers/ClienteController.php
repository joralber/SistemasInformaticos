<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Departamento;
use App\Models\Municipio;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function listadoclientes()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $listadoclientes = Cliente::where('estado', true)->get();

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'listadoclientes' => $listadoclientes,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
    public function departamentos()
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";
        try {
            $departamentos = Departamento::get();

            $mensaje = "Registro Ingresado";
            $status = "success";

            return response()->json([
                'departamentos' => $departamentos,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function municipios(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {

            $municipios = Municipio::where('id_departamento', '=', $request->iddepartamento)
                ->get();

            $mensaje = "Data cliente";
            $status = "success";

            return response()->json([
                'municipios' => $municipios,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function pendientes(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $id_cliente = $request->id_cliente;

            // $objClienteblk = DB::table('cliente')
            // ->join('venta', 'venta.id_cliente', '=', 'cliente.id_cliente')
            // ->join('cuenta_cobrar', 'cuenta_cobrar.id_venta', '=', 'venta.id_venta')
            // ->where('id_cliente', '=', $id_cliente)->where('cuenta_cobrar.saldo', '>', 0)->get();
            $objClienteblk = DB::select('SELECT cliente.id_cliente from cliente inner join venta on cliente.id_cliente = venta.id_cliente
            inner join cuenta_cobrar on venta.id_venta = cuenta_cobrar.id_venta where cliente.id_cliente = ' . $id_cliente . ' and cuenta_cobrar.saldo > 0');

            $mensaje = "Verificando pendientes de cliente";
            $status = "success";

            return response()->json([
                'clienteblock' => $objClienteblk,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function bajacliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $id_cliente = $request->id_cliente;

            $objCliente = Cliente::where('id_cliente', '=', $id_cliente)
                ->first();

            $objCliente->estado = 0;
            $objCliente->save();

            $mensaje = "El cliente ha sido dado de baja";
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

    public function guardarcliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $objCliente = new Cliente();

            $objCliente->nombre = $request->nombre;
            $objCliente->dui = $request->dui;
            $objCliente->nit = $request->nit;
            $objCliente->nrc = $request->nrc;
            $objCliente->direccion = $request->direccion;
            $objCliente->id_municipio = $request->municipio;
            $objCliente->telefono = $request->telefono;
            $objCliente->email = $request->email;
            $objCliente->limite_credito = $request->limite_credito;
            $objCliente->save();

            $mensaje = "El cliente ha sido registrado";
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

    public function editarcliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $id_cliente = $request->id_cliente;

            $datacliente = DB::table('cliente')->join('municipio', 'municipio.id_municipio', '=', 'cliente.id_municipio')
            ->join('departamento', 'departamento.id_departamento', '=', 'municipio.id_departamento')
            ->select('cliente.*', 'municipio.*', 'departamento.*')
            ->where('cliente.id_cliente', '=', $id_cliente)->get();

            $mensaje = "Data cliente";
            $status = "success";

            return response()->json([
                'datacliente' => $datacliente,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }

    public function actualizarcliente($id_cliente, Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $id_cliente = $request->id_cliente;
            $objCliente = Cliente::where('id_cliente', '=', $id_cliente)
                ->first();

            $objCliente->nombre = $request->nombre;
            $objCliente->dui = $request->dui;
            $objCliente->nit = $request->nit;
            $objCliente->nrc = $request->nrc;
            $objCliente->direccion = $request->direccion;
            $objCliente->id_municipio = $request->municipio;
            $objCliente->telefono = $request->telefono;
            $objCliente->email = $request->email;
            $objCliente->limite_credito = $request->limite_credito;
            $objCliente->save();

            $mensaje = "El cliente ha sido actualizado";
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
    public function clienterepetido(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $duiverif = $request->dui;
            $emailverif = $request->email;

            $objCliente = Cliente::where('dui', '=', $duiverif)->orwhere('email', '=', $emailverif)
                ->get();

            $mensaje = "El cliente con el dui: [" . $duiverif . "] ó email: [" . $emailverif . "] ya existe. Verifique!";
            $status = "success";

            return response()->json([
                'existe' => $objCliente,
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

    public function clienterepetidoupdate(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $idcliente = $request->id_cliente;
            $duiverif = $request->dui;
            $emailverif = $request->email;

            $objCliente = DB::select('SELECT * FROM cliente where id_cliente <> ' . $idcliente . ' and (dui = "' . $duiverif . '" or email = "' . $emailverif . '")');

            $mensaje = "El cliente con el dui: [" . $duiverif . "] ó email: [" . $emailverif . "] ya existe. Verifique!";
            $status = "success";

            return response()->json([
                'existe' => $objCliente,
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

    public function datacliente(Request $request)
    {
        $status = "error";
        $mensaje = "Error interno de la aplicacion";

        try {
            $id_cliente = $request->id_cliente;

            $datacliente = Cliente::where('id_cliente', '=', $id_cliente)
                ->get();

            $mensaje = "Data cliente";
            $status = "success";

            return response()->json([
                'datacliente' => $datacliente,
                'status' => $status,
                'mensaje' => $mensaje,
            ]);
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
        }
    }
}
