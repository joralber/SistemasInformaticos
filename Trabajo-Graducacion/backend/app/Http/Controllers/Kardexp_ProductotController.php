<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kardexp_Productot;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class Kardexp_ProductotController extends Controller
{
    public function create(Request $request){
      $data['id_producto'] = $request['id_producto'];
      $data['id_kardex_productos'] = $request['id_kardex_productos'];
      Kardexp_Productot::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }
}
