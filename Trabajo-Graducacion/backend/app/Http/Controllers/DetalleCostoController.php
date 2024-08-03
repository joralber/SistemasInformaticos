<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetalleCosto;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class DetalleCostoController extends Controller
{

  /*
  public function getAll($id_costo_produccion){
      $data = DetalleCosto::where('id_costo_produccion', $id_costo_produccion)
      ->get();
      return response()->json($data, 200);
    }

    */


 public function repetidomp($id_mp){
        $data = DetalleCosto::where('id_mp',  $id_mp)
        ->count();

        return response()->json($data, 200); 
    }

        public function create(Request $request){
      $data['id_costo_produccion'] = $request['id_costo_produccion'];
      $data['id_factor'] = $request['id_factor'];
      $data['id_mp'] = $request['id_mp'];
      $data['id_cortes'] = $request['id_cortes'];
      $data['medida1'] = $request['medida1'];
      $data['medida2'] = $request['medida2'];
      $data['total_m']= $request['total_m'];
      $data['precio'] = $request['precio'];
    
      
      DetalleCosto::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

    public function costoEdit($id_costo_produccion){
  
$data= DetalleCosto::join('materia_prima', 'materia_prima.id_mp', '=', 'detalle_costo.id_mp')
  ->leftJoin('cortes', 'cortes.id_cortes', '=' ,'detalle_costo.id_cortes')
->leftJoin('factor', 'factor.id_mp', '=', 'materia_prima.id_mp')
->where('detalle_costo.id_costo_produccion', $id_costo_produccion)
->select('detalle_costo.id_detalle_costo', 'detalle_costo.id_costo_produccion', 'factor.id_factor', 'factor.factor', 'detalle_costo.medida1', 'detalle_costo.medida2', 'detalle_costo.total_m', 'detalle_costo.precio','materia_prima.id_mp','materia_prima.nombre_producto','materia_prima.cortesmp', 'cortes.id_cortes', 'cortes.cortes')
      ->orderBy('materia_prima.cortesmp')
      ->orderBy('factor.id_factor')
      ->orderBy('cortes.id_cortes')
//->groupBy('materia_prima.id_mp')
       ->get();
    
   return response()->json($data, 200);
    }

    public function update(Request $request,$id_mp){
     $data['id_costo_produccion'] = $request['id_costo_produccion'];
      $data['id_factor'] = $request['id_factor'];
      $data['id_mp'] = $request['id_mp'];
      $data['id_cortes'] = $request['id_cortes'];
      $data['medida1'] = $request['medida1'];
      $data['medida2'] = $request['medida2'];
      $data['total_m']= $request['total_m'];
      $data['precio'] = $request['precio'];
    
      DetalleCosto::find($id_mp)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }

    public function seletEliminar($idcodigo_estilo, $id_mp){
      $data= DetalleCosto::join('costo_produccion', 'costo_produccion.id_costo_produccion','=','detalle_costo.id_costo_produccion')
      ->where('costo_produccion.idcodigo_estilo', $idcodigo_estilo)
      ->where('detalle_costo.id_mp', $id_mp)
      ->select('detalle_costo.id_detalle_costo','detalle_costo.id_costo_produccion','detalle_costo.precio')
      ->get();
      return response()->json($data, 200);

    }

public function delete($id_costo_produccion, $id_mp){
      $res = DetalleCosto::where('detalle_costo.id_costo_produccion', $id_costo_produccion)
      ->where('detalle_costo.id_mp', $id_mp)
      ->delete();
      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }


        public function get($id_cortes){
      $data = DetalleCosto::where('id_cortes', $id_cortes)
      ->get();
      return response()->json($data, 200);

    }

       public function getMP($id_mp){
      $data = DetalleCosto::where('id_mp', $id_mp)
      ->get();
      return response()->json($data, 200);

    }

    
public function suma($id_costo_produccion, $id_mp){
$data = DetalleCosto::where('detalle_costo.id_costo_produccion', $id_costo_produccion)
->where('detalle_costo.id_mp', $id_mp)
->sum('detalle_costo.precio');
    return response()->json($data, 200);


}


}
