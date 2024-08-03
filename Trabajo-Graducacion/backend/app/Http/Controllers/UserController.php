<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Bitacora;

use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

   public function getAll(){
      $data = User::where('estado', true)->get();
      return response()->json($data, 200);
    }


    public function create(Request $request){
      $data['name'] = strtoupper($request['name']);
      $data['role'] = strtoupper($request['role']);
      $data['email'] = $request['email'];
      $data['password'] = bcrypt($request['password']);
      $data['estado'] = true;
      User::create($data);
      return response()->json([
          'message' => "Creado con éxito",
          'success' => true
      ], 200);
    }

    public function login(Request $request)
{
    // Validar las credenciales recibidas del formulario de inicio de sesión
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        // Autenticación exitosa, obtener el usuario autenticado
        $user = Auth::user();
        $userId = $user->id;

  $data['id'] = $userId;
      $data['inicio'] = now();         
      Bitacora::create($data);

                      $bitacora = Bitacora::latest('id_bitacora')->first();



$user = User::where('estado', true)->find($userId);

        // Generar un token de acceso para el usuario
        $token = $user->createToken('induva')->plainTextToken;

        // Devolver una respuesta con el usuario y el token de acceso
        return response()->json(['user' => $user, 'token' => $token, 'bitacora' => $bitacora], 200);
    } else {
        // Credenciales inválidas, devolver una respuesta de error
        return response()->json(['error' => 'Credenciales inválidas'], 401);
    }
}

public function logout()
    {
   
        // Revocar el token de acceso del usuario autenticado
//        $request->user()->token()->revoke();
          Auth::logout();

        // Retornar una respuesta exitosa
        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }


     public function emailr(Request $request){

            $email = urldecode($request->input('email'));

        $data = User::where('estado', true)
        ->where('email',  $email)
        ->count();

        return response()->json($data, 200);      
    }


    public function darBaja($id){
        $data = User::where('id', $id);
        $data->update(['estado'=>false ]);
      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }

    public function get($id){
      $data = User::find($id);
      return response()->json($data, 200);

    }


 public function update(Request $request,$id){
  $p = $request->input('password');

   $data['name'] = strtoupper($request['name']);
      $data['role'] = strtoupper($request['role']);
      $data['email'] = $request['email'];
      if (!empty($p) && $p !== "") {

     $data['password'] = bcrypt($request['password']);
 }

  //dd($p); // Imprime y detiene la ejecución


      User::find($id)->update($data);
      return response()->json([
          'message' => "Successfully updated",
          'success' => true
      ], 200);
    }

     public function idUser($email){
                $data = User::where('email', $email)->first();

      return response()->json($data, 200);

    }

        public function ModificarPASS($id, $password){


        $data = User::where('id', $id);

        $data->update(['password'=> bcrypt($password) ]);

      return response()->json([
          'message' => "password actualizado con exito",
          'success' => true
      ], 200);
    }


}


