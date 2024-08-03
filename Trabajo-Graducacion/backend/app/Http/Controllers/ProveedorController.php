<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Models\Proveedor;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ProveedorController extends Controller
{

/*     public function index()
    {
        return response()->json([
            'error' => false,
            'proveedor'  => Proveedor::get()->where('estado', '=', 0),
        ], 200);
    }
    */


   public function getAll(){
      $data = Proveedor::where('estado', true)->get();
      return response()->json($data, 200);
    }


    public function create(Request $request){
      $data['nombre'] = $request['nombre'];
      $data['nit'] = $request['nit'];
      $data['nrc'] = $request['nrc'];
      $data['dui'] = $request['dui'];
      $data['direccion'] = $request['direccion'];
      $data['celular'] = $request['celular'];
      $data['email'] = $request['email'];
      $data['limite_credito'] = $request['limite_credito'];
      $data['N_creditos'] = 0;
      $data['estado'] = true;
      
      Proveedor::create($data);
      return response()->json([
          'message' => "Successfully created",
          'success' => true
      ], 200);
    }



    public function darBaja($id_proveedor){

      //$res = Proveedor::find($id_proveedor)->delete();

//         $res = DB::table('proveedor')->where('id_proveedor', $id_proveedor);
        $data = Proveedor::where('id_proveedor', $id_proveedor);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }



    public function get($id_proveedor){
      $data = Proveedor::find($id_proveedor);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_proveedor){
        $data['nombre'] = $request['nombre'];
      $data['nit'] = $request['nit'];
      $data['nrc'] = $request['nrc'];
      $data['dui'] = $request['dui'];
      $data['direccion'] = $request['direccion'];
      $data['celular'] = $request['celular'];
      $data['telefono_casa'] = $request['telefono_casa'];
      $data['limite_credito'] = $request['limite_credito'];
      $data['N_creditos'] = $request['N_creditos'];
      $data['estado'] = $request['estado'];

      Proveedor::find($id_proveedor)->update($data);
      return response()->json([
          'message' => "Successfully updated",
          'success' => true
      ], 200);
    }
}
