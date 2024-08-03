<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Productos_terminados;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Productos_terminadosController extends Controller
{

    /*
    SELECT p.id_producto, p.codigo_barra, c.estilo, cc.total_iva_consumidorf, cc.total_iva_mayoreo, ca.nombre_cat FROM productos_terminados p
inner join codigo_estilo c on c.idcodigo_estilo=p.idcodigo_estilo
inner join costo_produccion cc on cc.id_costo_produccion=p.id_costo_produccion
inner join categoria_pt ca on ca.id_cat_pt=p.id_cat_pt
    */


   public function getAll(){
      $data = Productos_terminados::join('codigo_estilo', 'codigo_estilo.idcodigo_estilo', '=', 'productos_terminados.idcodigo_estilo')
      ->join('costo_produccion', 'costo_produccion.id_costo_produccion', '=', 'productos_terminados.id_costo_produccion')
      ->join('categoria_pt', 'categoria_pt.id_cat_pt','=', 'productos_terminados.id_cat_pt')
      ->join('color_pt', 'color_pt.id_color_pt', '=', 'productos_terminados.id_color_pt')
      ->join('talla_pt', 'talla_pt.id_talla_pt', '=', 'productos_terminados.id_talla_pt')
      ->select('productos_terminados.id_producto','productos_terminados.codigo_barra', 'productos_terminados.cantidad','productos_terminados.stock_minimo','codigo_estilo.estilo', 'costo_produccion.total_iva_consumidorf', 'costo_produccion.total_iva_mayoreo','categoria_pt.nombre_cat', 'color_pt.nombre_color', 'talla_pt.nombre_talla')
      ->where('productos_terminados.estado', true)
      ->orderBy('categoria_pt.nombre_cat')
      ->get();
      return response()->json($data, 200);
    }
    
    
       public function create(Request $request){
      $data['id_cat_pt'] = $request['id_cat_pt'];
      $data['id_color_pt'] = $request['id_color_pt'];
      $data['id_talla_pt'] = $request['id_talla_pt'];
      $data['id_costo_produccion'] = strtoupper($request['id_costo_produccion']);
      $data['idcodigo_estilo'] = $request['idcodigo_estilo'];
      $data['codigo_barra'] = $request['codigo_barra'];
      $data['cantidad'] = $request['cantidad'];
      $data['stock_minimo'] = $request['stock_minimo'];
      $data['estado'] = true;
     
      
      Productos_terminados::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

       public function repetido($codigo_barra){


        $data = Productos_terminados::where('estado', true)
        ->where('codigo_barra',  $codigo_barra)
        ->count();

        return response()->json($data, 200);      
    }


        public function darBaja($id_producto){


        $data = Productos_terminados::where('id_producto', $id_producto);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }

    public function agragrarStock($id_producto, $cantidad){


        $data = Productos_terminados::where('id_producto', $id_producto);

        $data->update(['cantidad'=> $cantidad ]);

      return response()->json([
          'message' => "Stock agregado con exito",
          'success' => true
      ], 200);
    }

    public function get($id_producto){
      $data = Productos_terminados::find($id_producto);
      return response()->json($data, 200);

    }

        public function update(Request $request,$id_producto){
       $data['id_cat_pt'] = $request['id_cat_pt'];
      $data['id_color_pt'] = $request['id_color_pt'];
      $data['id_talla_pt'] = $request['id_talla_pt'];
      $data['id_costo_produccion'] = strtoupper($request['id_costo_produccion']);
      $data['idcodigo_estilo'] = $request['idcodigo_estilo'];
      $data['codigo_barra'] = $request['codigo_barra'];
      $data['cantidad'] = $request['cantidad'];
      $data['stock_minimo'] = $request['stock_minimo'];
      $data['estado'] = $request['estado'];

      Productos_terminados::find($id_producto)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }


       public function repetido2($id_cat_pt, $id_color_pt, $id_talla_pt, $idcodigo_estilo){


        $data = Productos_terminados::where('estado', true)
        ->where('id_cat_pt',  $id_cat_pt)
        ->where('id_color_pt', $id_color_pt)
        ->where('id_talla_pt', $id_talla_pt)
        ->where('idcodigo_estilo', $idcodigo_estilo)
        ->count();

        return response()->json($data, 200);      
    }

/*
  public function repetido3($id_cat_pt, $id_color_pt, $id_talla_pt, $idcodigo_estilo, $id_producto){


        $data = Productos_terminados::where('estado', true)
        ->where('id_cat_pt',  $id_cat_pt)
        ->where('id_color_pt', $id_color_pt)
        ->where('id_talla_pt', $id_talla_pt)
        ->where('idcodigo_estilo', $idcodigo_estilo)
        ->where('id_producto', $id_producto)
        ->count();

        return response()->json($data, 200);      
    }


*/

     public function ultimoid(){
      $data = Productos_terminados::latest('id_producto')->first();

      return response()->json($data, 200);

    }


public function repetidopk($id_producto){


        $data = Productos_terminados::join('kardexp_productot', 'kardexp_productot.id_producto', '=', 'productos_terminados.id_producto')
        ->where('productos_terminados.estado', true)
        ->where('kardexp_productot.id_producto',  $id_producto)
        ->count();

        return response()->json($data, 200);      
    }


/*
SELECT p.id_producto, p.idcodigo_estilo, p.id_costo_produccion, c.codigo, c.estilo, ca.nombre_cat, co.nombre_color, t.nombre_talla FROM productos_terminados p
inner join codigo_estilo c on c.idcodigo_estilo= p.idcodigo_estilo
inner join categoria_pt ca on ca.id_cat_pt=p.id_cat_pt
inner join color_pt co on co.id_color_pt =p.id_color_pt
inner join talla_pt t on t.id_talla_pt=p.id_talla_pt
*/
}


