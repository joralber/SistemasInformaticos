<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CodigoMail;

class CodigoController extends Controller
{
    public function enviarCodigo(Request $request)
    {
        $codigo = $request->input('codigo');
        $email = $request->input('email');
        
        // Lógica para generar el código
        
        Mail::to($email)->send(new CodigoMail($codigo));

        return response()->json(['message' => 'Código enviado con éxito']);
    }
}
