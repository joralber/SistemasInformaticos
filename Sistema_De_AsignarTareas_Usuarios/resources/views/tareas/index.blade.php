@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <a href="{{route('tareas.create')}}">Crear nueva terea</a>
                </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <h1>Listado tareas</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Descripcíon</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($tareas as $t)
                            <tr>
                                <td>{{$t->id}}</td>
                                <td>{{$t->titulo}}</td>
                                <td>{{$t->descripcion}}</td>
                                <td>{{$t->tipo}}</td>
                                <td>
                                    @if ($t->estado)
                                    <span style="color: green;">Finalizado</span>
                                @else
                                    <span style="color: red;">Pendiente</span>
                                @endif
                                </td>
                                <td><a class="btn btn-primary" href="{{route('tareas.edit', $t->id)}}"><i class="fa fa-edit"></i></a>


				<form method="POST" action="{{route('tareas.destroy', $t->id)}}">
    @csrf
    @method('DELETE')
				<button type="submit" class="btn btn-danger" ><i class="fa fa-trash"></i></button>
    </form>

    <form method="POST" action="{{ route('tareas.final', ['id' => $t->id]) }}">
        @csrf
        @if (!$t->estado)
    <button type="submit" class="btn btn-success">Finalizar</button>
    @endif
    </form>
                                </td>

                            </tr>


                            @endforeach
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
