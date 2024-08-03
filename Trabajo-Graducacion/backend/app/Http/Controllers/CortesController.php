<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Cortes;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CortesController extends Controller
{
    
 

   public function getAll($id_mp){
      $data = Cortes::where('id_mp', $id_mp)->get();
      return response()->json($data, 200);
    }

    public function repetido(Request $request){
       $id_mp= $request->input('id_mp');

            $cortes = urldecode($request->input('cortes'));


        $data = Cortes::where('id_mp', $id_mp)
        ->where('cortes',  $cortes)
        ->count();

        return response()->json($data, 200);

      
    }


    public function create(Request $request){
      $data['id_mp'] = $request['id_mp'];
      $data['cortes'] = strtoupper($request['cortes']);
      
      Cortes::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

/*

    public function darBaja($id_color){


        $data = Cortes::where('id_color', $id_color);

        $data->update(['estado'=>false ]);

      return response()->json([
          'message' => "Eliminado con éxito",
          'success' => true
      ], 200);
    }
*/


    public function get($id_cortes){
      $data = Cortes::find($id_cortes);
      return response()->json($data, 200);

    }

    public function update(Request $request,$id_cortes){
     $data['id_mp'] = $request['id_mp'];;
      $data['cortes'] = strtoupper($request['cortes']);
      
      Cortes::find($id_cortes)->update($data);
      return response()->json([
          'message' => "Actualizado exitosamente",
          'success' => true
      ], 200);
    }

      public function repetidoUMP($id_mp){
        $data = Cortes::where('id_mp', $id_mp)
        ->count();
        return response()->json($data, 200);

      
    }

    public function obteneridCortes($id_mp){

      $data = Cortes::where('cortes.id_mp', $id_mp)
      ->latest('cortes.id_cortes')
                ->value('cortes.id_cortes');
     // $data = Mp_kardexmp::latest('idmp_kardexmp')->first();
      //$data = Mp_kardexmp::find(1)->posts()->where('id_mp', $id_mp)->latest()->first()->id;

   // $data = Mp_kardexmp::find($id_mp)->first();
      return response()->json($data, 200);

    }

        public function obtenerUltimoAll(){

      $data = Cortes::latest('cortes.id_cortes')
                ->value('cortes.id_cortes');
     // $data = Mp_kardexmp::latest('idmp_kardexmp')->first();
      //$data = Mp_kardexmp::find(1)->posts()->where('id_mp', $id_mp)->latest()->first()->id;

   // $data = Mp_kardexmp::find($id_mp)->first();
      return response()->json($data, 200);

    }


}
