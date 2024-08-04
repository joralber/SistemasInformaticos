<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Municipio;
use App\Models\Departamento;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    public function repetido($dui){

        $data = Cliente::where('estado', true)
        ->where('dui',  $dui)
        ->count();

        return response()->json($data, 200);      
    }
   public function getAll(){
      $data = Cliente::where('estado', true)->get();
      return response()->json($data, 200);
    }
  public function getAllDpeto(){
      $data = Departamento::get();
      return response()->json($data, 200);
    }
      public function getAllMuni($id_departamento){
      $data = Municipio::where('id_departamento', $id_departamento)->get();
      return response()->json($data, 200);
    }
    public function create(Request $request){
      $data['nombre'] = strtoupper($request['nombre']);
      $data['dui'] = $request['dui'];
      $data['direccion'] = $request['direccion'];
        $data['id_municipio'] = $request['id_municipio'];
      $data['telefono'] = $request['telefono'];
      $data['email'] = $request['email'];
      $data['estado'] = true; 
      Cliente::create($data);
      return response()->json([
          'message' => "Successfully created",
          'success' => true
      ], 200);
    }

    public function darBaja($id_Cliente){
        $data = Cliente::where('id_cliente', $id_Cliente);
        $data->update(['estado'=>false ]);
      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }
    public function get($id_cliente){
       $data = DB::table('cliente')->join('municipio', 'municipio.id_municipio', '=', 'cliente.id_municipio')
            ->join('departamento', 'departamento.id_departamento', '=', 'municipio.id_departamento')
            ->select('cliente.*', 'municipio.*', 'departamento.*')
            ->where('cliente.id_cliente', '=', $id_cliente)->first();
      return response()->json($data, 200);
    }
    public function update(Request $request, $id_cliente){
        $data['nombre'] = strtoupper($request['nombre']);
      $data['dui'] = $request['dui'];
      $data['direccion'] = $request['direccion'];
      $data['telefono'] = $request['telefono'];
    $data['id_municipio'] = $request['id_municipio'];
          $data['email'] = $request['email'];
      $data['estado'] = $request['estado'];
      Cliente::find($id_cliente)->update($data);
      return response()->json([
          'message' => "Successfully updated",
          'success' => true
      ], 200);
    }
}
