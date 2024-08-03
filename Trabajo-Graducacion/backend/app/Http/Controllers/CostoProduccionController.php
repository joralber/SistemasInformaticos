<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CostoProduccion;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CostoProduccionController extends Controller
{


public function getAll(){
      $data = CostoProduccion::where('costo_produccion.estado', true)
      ->join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'costo_produccion.idcodigo_estilo')
      ->where('codigo_estilo.estado', true)
      ->select('costo_produccion.id_costo_produccion', 'costo_produccion.idcodigo_estilo', 'costo_produccion.total_iva_mayoreo', 'costo_produccion.total_iva_consumidorf', 'codigo_estilo.codigo', 'codigo_estilo.estilo')
      ->orderBy('codigo_estilo.codigo')
      ->get();
      return response()->json($data, 200);
    }


        public function create(Request $request){
      $data['idcodigo_estilo'] = $request['idcodigo_estilo'];
      $data['fecha'] = now();
      $data['totalmedida'] = $request['totalmedida'];
      $data['cdf_cif'] = $request['cdf_cif'];
      $data['costo_produccion'] = $request['costo_produccion'];
      $data['margen_contribucion'] = $request['margen_contribucion'];
      $data['consumidor_final'] = $request['consumidor_final'];
      $data['total_iva_mayoreo'] = $request['total_iva_mayoreo'];
      $data['total_iva_consumidorf'] = $request['total_iva_consumidorf'];
      $data['estado'] = true;


      
      CostoProduccion::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

     public function ultimoid(){
      $data = CostoProduccion::latest('id_costo_produccion')->first();

      return response()->json($data, 200);

    }


        public function darBaja($id_costo_produccion){


        $data = CostoProduccion::where('id_costo_produccion', $id_costo_produccion);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }

    public function get($id_costo_produccion){
      $data = CostoProduccion::find($id_costo_produccion);
      return response()->json($data, 200);

    }
  
  public function getidestilo($idcodigo_estilo){
      $data = CostoProduccion::where('idcodigo_estilo', $idcodigo_estilo)->first();
   //   $data = CostoProduccion::find($idcodigo_estilo);
      return response()->json($data, 200);

    }

public function getDetalle($idcodigo_estilo){
  $data= CostoProduccion::join('detalle_costo', 'detalle_costo.id_costo_produccion', '=', 'costo_produccion.id_costo_produccion')
  ->where('costo_produccion.idcodigo_estilo', $idcodigo_estilo)
  ->select('costo_produccion.idcodigo_estilo', 'costo_produccion.id_costo_produccion','detalle_costo.id_mp')
  ->get();
  return response()->json($data, 200);
}

public function update(Request $request,$id_mp){
         $data['idcodigo_estilo'] = $request['idcodigo_estilo'];
      $data['fecha'] = now();
      $data['totalmedida'] = $request['totalmedida'];
      $data['cdf_cif'] = $request['cdf_cif'];
      $data['costo_produccion'] = $request['costo_produccion'];
      $data['margen_contribucion'] = $request['margen_contribucion'];
      $data['consumidor_final'] = $request['consumidor_final'];
      $data['total_iva_mayoreo'] = $request['total_iva_mayoreo'];
      $data['total_iva_consumidorf'] = $request['total_iva_consumidorf'];
      $data['estado'] = $request['estado'];


      CostoProduccion::find($id_mp)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }




}
