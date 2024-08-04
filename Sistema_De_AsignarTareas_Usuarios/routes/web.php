<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TareasController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//tareas
Route::get('/tareas', [TareasController::class, 'index'])->name('tareas.index');
Route::get('/tareas/create',[TareasController::class, 'create'])->name('tareas.create');
Route::post('/tareas/store', [TareasController::class, 'store'])->name('tareas.store');
Route::get('/tareas/edit/{tareas}', [TareasController::class, 'edit'])->name('tareas.edit');
Route::put('/tareas/update/{tareas}', [TareasController::class, 'update'])->name('tareas.update');
Route::delete('/tareas/destroy/{tareas}',[TareasController::class, 'destroy'])->name('tareas.destroy');
Route::post('/tareas/final/{id}', [TareasController::class, 'final'])->name('tareas.final');
Route::get('/tareas/error', function () {
    return view('error');
})->name('tareas.error');;
