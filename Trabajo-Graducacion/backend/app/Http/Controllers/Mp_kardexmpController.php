<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mp_kardexmp;
use App\Models\Compra;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Mp_kardexmpController extends Controller
{
              public function create(Request $request){
      $data['id_kardex'] = $request['id_kardex'];
      $data['id_mp'] = $request['id_mp'];
      Mp_kardexmp::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

    public function ultimoid($id_mp){

      $data = Mp_kardexmp::where('mp_kardexmp.id_mp', '=', $id_mp)
                ->join('kardex_mp', 'kardex_mp.id_kardex','=', 'mp_kardexmp.id_kardex')
                ->latest('kardex_mp.id_kardex')
                ->value('kardex_mp.id_kardex');
     // $data = Mp_kardexmp::latest('idmp_kardexmp')->first();
      //$data = Mp_kardexmp::find(1)->posts()->where('id_mp', $id_mp)->latest()->first()->id;

   // $data = Mp_kardexmp::find($id_mp)->first();
      return response()->json($data, 200);

    }

     public function getCompra($id_compra){
      $data = Compra::find($id_compra);
      return response()->json($data, 200);

    }
}
