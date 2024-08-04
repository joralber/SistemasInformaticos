@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('CREAR NUEVA TAREA') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <section>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-6">
                                    </br>
                                    <a href="{{route('tareas.index')}}">Regresar a listado de tareas</a>
                                </br>

                    <h1>Modificar Terea</h1>

                    <form method="POST" action="{{route('tareas.update', $tareas->id)}}">
                        @method('PUT')
                        @csrf
                        <div class="form-group">
                            <label>título</label>
                            <input type="text" name="titulo" class="form-control" value="{{$tareas->titulo}}" >
                        </div>
                        @error('nombre')
                        <p style="color: red;">{{$message}}</p>
                        @enderror

                        <div class="form-group">
                            <label>Descripcíon</label>
                            <input type="text"class="form-control" name="descripcion" value="{{$tareas->descripcion}}">
                        </div>
                        @error('descripcion')
                        <p style="color: red;">{{$message}}</p>
                        @enderror

                        <div class="form-group">
                            <label>Tipo de tarea</label>
                            <select class="form-control" name="tipo">
                                <option value="tipo1" {{ $tareas->tipo === "tipo1" ? 'selected' : '' }}>Tipo 1</option>
                                <option value="tipo2" {{ $tareas->tipo === "tipo2" ? 'selected' : '' }}>Tipo 2</option>
                                <option value="tipo2" {{ $tareas->tipo === "tipo2" ? 'selected' : '' }}>Tipo 2</option>

                            </select>
                            @error('tipo')
                            <p style="color: red;">{{$message}}</p>
                        @enderror
                    </br></br>

                          <button type="submit" class="btn btn-primary mb-2">Registrar</button>

                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
