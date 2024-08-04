<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Http\Requests\TareasRequest;
use App\Models\Tareas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class TareasController extends Controller
{

      public function __construct()
    {
        $this->middleware('auth');
    }

    public function index():View{
  $usuario = Auth::user();
  $tareas = $usuario->tareas;

    return view('tareas.index', compact('tareas'));
    }

    public function create():View{
        return view('tareas.create');
    }


public function store(Request $request)
{
    $data = $request->validate([
        "titulo"=> 'required|min:3|max:40',
        "descripcion"=> 'required|min:5|max:80',
        "tipo"=> 'required',
    ]);

    $tarea = new Tareas($data);
    $tarea->user_id = auth()->id();
    $tarea->save();
    return redirect()->route('tareas.index')->with('success','Tarea creada con éxito');

}
public function destroy(Tareas $tareas):RedirectResponse{
    $tareas->delete();
    return redirect()->route('tareas.index')->with('danger', 'Tareas: '.$tareas->titulo.' eliminada');
   }


   public function edit($id):View{

try {
   $tareas = Tareas::findOrFail($id);

    // Verificar si el usuario autenticado es el propietario de la tarea
    if ($tareas->user_id !== auth()->user()->id) {
        return view('tareas.error')->with('mensaje', 'Redireccionado con éxito');

    }
    // ...

return view('tareas.edit', compact('tareas'));

} catch (ModelNotFoundException $e) {
    // Manejar el caso en que la tarea no se encuentra
    return redirect('/')->with('error', 'La tarea no se encontró.');
}
  }


       public function update(Request $request, $id)
       {
           $tarea = Tareas::find($id);
           $tarea->titulo = $request->input('titulo');
           $tarea->descripcion = $request->input('descripcion');
           $tarea->tipo = $request->input('tipo');
           $tarea->save();
           return redirect()->route('tareas.index')->with('success','Tarea Actualizado');

       }
       public function final($id)
       {
           $tarea = Tareas::find($id);
           $tarea->estado = true;
           $tarea->save();
           return redirect()->route('tareas.index');
       }
}
