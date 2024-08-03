<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\MateriaPrima;

use App\Models\DetalleCodigoEstilo;

use App\Models\MedidaMateria;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class MateriaPrimaController extends Controller
{
    
      public function getAll(){
      $data = MateriaPrima::join('categoria_mp', 'categoria_mp.id_categoria', '=', 'materia_prima.id_categoria')
      ->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
            ->join('medida_mp', 'medida_mp.id_medida', '=', 'materia_prima.id_medida')
      ->select('materia_prima.id_mp','materia_prima.nombre_producto', 'materia_prima.precio_unitario', 'materia_prima.cantidad', 'materia_prima.factor', 'materia_prima.stock_minimo', 'categoria_mp.nombre', 'color_mp.color', 'medida_mp.medida')
      ->where('materia_prima.estado', true)
      ->orderBy('categoria_mp.nombre')
      ->orderBy('color_mp.color')
      ->get();
      return response()->json($data, 200);
    }



    public function create(Request $request){
      $data['id_categoria'] = $request['id_categoria'];
      $data['id_color'] = $request['id_color'];
      $data['id_medida'] = $request['id_medida'];
      $data['nombre_producto'] = strtoupper($request['nombre_producto']);
      $data['cantidad'] = $request['cantidad'];
      $data['precio_unitario'] = $request['precio_unitario'];
      $data['stock_minimo'] = $request['stock_minimo'];
      $data['descripcion'] = $request['descripcion'];
      $data['estado'] = true;
      $data['factor']= true;
      $data['cortesmp']= true;
      MateriaPrima::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }



    public function darBaja($id_mp){


        $data = MateriaPrima::where('id_mp', $id_mp);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }

    public function agragrarStock($id_mp, $cantidad){


        $data = MateriaPrima::where('id_mp', $id_mp);

        $data->update(['cantidad'=> $cantidad ]);

      return response()->json([
          'message' => "Stock agregado con exito",
          'success' => true
      ], 200);
    }


    public function validarfactor($id_mp, $factor){


        $data = MateriaPrima::where('id_mp', $id_mp);

        $data->update(['factor'=> $factor ]);

      return response()->json([
          'message' => "Factor modificado con exito",
          'success' => true
      ], 200);
    }



    public function validarcorte($id_mp, $cortesmp){


        $data = MateriaPrima::where('id_mp', $id_mp);

        $data->update(['cortesmp'=> $cortesmp ]);

      return response()->json([
          'message' => "Factor modificado con exito",
          'success' => true
      ], 200);
    }

    public function get($id_mp){
      $data = MateriaPrima::find($id_mp);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_mp){
         $data['id_categoria'] = $request['id_categoria'];
      $data['id_color'] = $request['id_color'];
      $data['id_medida'] = $request['id_medida'];
      $data['nombre_producto'] = strtoupper($request['nombre_producto']);
      $data['cantidad'] = $request['cantidad'];
      $data['precio_unitario'] = $request['precio_unitario'];
      $data['stock_minimo'] = $request['stock_minimo'];
      $data['descripcion'] = $request['descripcion'];
      $data['estado'] = $request['estado'];
      $data['factor'] = $request['factor'];
     $data['cortesmp']= $request['cortesmp'];;
      MateriaPrima::find($id_mp)->update($data);
      return response()->json([
          'message' => "Actualizado con exito",
          'success' => true
      ], 200);
    }


    public function mpDetalleGet($idcodigo_estilo){

      $detalle = DetalleCodigoEstilo::where('idcodigo_estilo', '=', $idcodigo_estilo)->select('id_mp')->get();

$data = MateriaPrima::where('materia_prima.estado', true)
->join('color_mp', 'color_mp.id_color', '=', 'materia_prima.id_color')
->select('materia_prima.id_mp', 'materia_prima.nombre_producto', 'color_mp.color')
->orderBy('materia_prima.nombre_producto')
->whereNotIn('materia_prima.id_mp', $detalle)->get();


      return response()->json($data, 200);



    }





     public function ultimoid(){
      $data = MateriaPrima::latest('id_mp')->first();

      return response()->json($data, 200);

    }

  
    public function repeti(Request $request){
$id_categoria = $request->input('id_categoria');

 $id_color= $request->input('id_color');
  $id_medida= $request->input('id_medida');

            $nombre_producto = urldecode($request->input('nombre_producto'));



        $data = MateriaPrima::where('estado', true)
        ->where('id_categoria',  $id_categoria)
        ->where('id_color', $id_color)
        ->where('id_medida', $id_medida)
        ->where('nombre_producto', $nombre_producto)
        ->count();

        return response()->json($data, 200); 
              return response()->json([
          'message' => $nombre_producto,
          'success' => true
      ], 200);
     
    }


public function repetidoK($id_mp){


        $data = MateriaPrima::join('mp_kardexmp', 'mp_kardexmp.id_mp', '=', 'materia_prima.id_mp')
        ->where('materia_prima.estado', true)
        ->where('mp_kardexmp.id_mp',  $id_mp)
        ->count();

        return response()->json($data, 200);      
    }

}
