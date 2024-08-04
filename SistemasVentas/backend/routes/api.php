<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\CodigoController;
use App\Http\Controllers\BitacoraController;
use App\Http\Controllers\Detalle_BitacoraController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\TallaController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\Kardexp_ProductotController;
use App\Http\Controllers\Kardex_ProductosController;
use App\Http\Controllers\Detalle_VentaController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\ReportesController;
use App\Http\Controllers\DashboardController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//cliente

Route::prefix('cliente')->group(function () {
Route::get('/',[ClienteController::class,'getAll']);
Route::get('/dpto',[ClienteController::class,'getAllDpeto']);
Route::post('/',[ ClienteController::class, 'create']);
Route::put('/estado/{id_cliente}',[ ClienteController::class, 'darBaja']);
Route::put('/{id_cliente}',[ClienteController::class,'update']);
Route::get('/{id_cliente}',[ClienteController::class,'get']);
Route::get('/muni/{id_departamento}',[ClienteController::class,'getAllMuni']);
Route::get('/rep/{dui}',[ ClienteController::class, 'repetido']);
});

//seguridad
Route::prefix('admin')->group(function () {
    Route::get('/',[UserController::class, 'getAll']);
Route::post('/',[ UserController::class, 'create']);
Route::post('/login', [ UserController::class, 'login']);
Route::get('/email', [ UserController::class, 'emailr']);
Route::put('/estado/{id}',[ UserController::class, 'darBaja']);
Route::get('/{id}',[UserController::class,'get']);
Route::put('/{id}',[UserController::class,'update']);
Route::post('/logout', [ UserController::class, 'logout']);
Route::post('/enviar-codigo',  [ CodigoController::class, 'enviarCodigo']);
Route::get('/user/{email}',[UserController::class, 'idUser']);
Route::put('/pass/{id}/{password}',[ UserController::class, 'ModificarPASS']);

});

Route::prefix('respaldos')->group(function () {
Route::get('/backup', [BackupController::class, 'enviarRespaldo']);
Route::post('/restore2', [ BackupController::class, 'restorBase']);


});

Route::prefix('bitacora')->group(function () {
    Route::get('/', [BitacoraController::class, 'getAll']);
    Route::put('/{id_bitacora}',[BitacoraController::class,'ModificarBitacora']);
    Route::post('/', [Detalle_BitacoraController::class, 'create']);
    Route::get('/{id_bitacora}', [Detalle_BitacoraController::class, 'getAllDetalle']);
    Route::get('/bit/{fechaInicio}/{fechaFin}', [BitacoraController::class, 'obtenerBitacora']);

});


//categoria
Route::prefix('categoria')->group(function () {

Route::get('/',[CategoriaController::class,'getAll']);

Route::post('/',[ CategoriaController::class, 'create']);

Route::put('/estado/{id_cat}',[ CategoriaController::class, 'darBaja']);
Route::get('/rep/{categoria}',[ CategoriaController::class, 'repetido']);
Route::put('/{id_cat}',[CategoriaController::class,'update']);
Route::get('/{id_cat}',[CategoriaController::class,'get']);
});


//color
Route::prefix('color')->group(function () {

Route::get('/',[ColorController::class,'getAll']);

Route::post('/',[ ColorController::class, 'create']);

Route::put('/estado/{id_color}',[ ColorController::class, 'darBaja']);
Route::get('/rep/{color}',[ ColorController::class, 'repetido']);
Route::put('/{id_color}',[ColorController::class,'update']);
Route::get('/{id_color}',[ColorController::class,'get']);
});


//talla
Route::prefix('talla')->group(function () {

Route::get('/',[TallaController::class,'getAll']);

Route::post('/',[ TallaController::class, 'create']);

Route::put('/estado/{id_talla}',[ TallaController::class, 'darBaja']);
Route::get('/rep/{talla}',[ TallaController::class, 'repetido']);
Route::put('/{id_talla}',[TallaController::class,'update']);
Route::get('/{id_talla}',[TallaController::class,'get']);
});


//productos
Route::prefix('productos')->group(function () {

Route::get('/',[ProductosController::class,'getAll']);
Route::get('/ultimo',[ProductosController::class, 'ultimoid']);

Route::post('/',[ ProductosController::class, 'create']);
Route::get('/rep/{codigo_barra}',[ ProductosController::class, 'repetido']);
Route::put('/estado/{id_producto}',[ ProductosController::class, 'darBaja']);
Route::get('/{id_producto}',[ProductosController::class,'get']);
Route::put('/agregar/{id_producto}/{cantidad}',[ ProductosController::class, 'agragrarStock']);

Route::put('/{id_producto}',[ProductosController::class,'update']);
Route::get('/rep2/{id_cat}/{id_color}/{id_talla}/{nombre_producto}',[ ProductosController::class, 'repetido2']);
Route::get('/reppk/{id_mp}',[ ProductosController::class, 'repetidopk']);

});

/* route de P a kardex  */

Route::prefix('kardexprod')->group(function (){

    Route::get('/list/{id_kardex_productos}',[ Kardex_ProductosController::class, 'getAll']);
    Route::post('/',[ Kardex_ProductosController::class, 'create']);
    Route::get('/ultimok',[Kardex_ProductosController::class, 'ultimoid']);
Route::put('/{id_kardex_productos}',[Kardex_ProductosController::class,'update']);


});


//PF_kardexmp

Route::prefix('prodKar')->group(function(){
Route::post('/',[ Kardexp_ProductotController::class, 'create']);

});

//venta
Route::prefix('venta')->group(function(){
   Route::get('/',[VentaController::class,'getAll']);
   Route::get('/ultimav',[VentaController::class, 'ultimoid']);
   Route::get('/{id_venta}',[VentaController::class,'get']);
      Route::get('/getdetalle/{id_venta}', [Detalle_VentaController::class, 'getAllDetalle']);
    Route::post('/', [VentaController::class, 'create']);
    Route::post('/detv', [Detalle_VentaController::class, 'createD']);
});

//reportes
Route::prefix('reportes')->group(function(){
Route::get('/ingresosF',[ReportesController::class,'venta']);
Route::get('/productoM/{fechaInicio}/{fechaFin}',[ReportesController::class,'productosMV']);
Route::get('/cliente/{fechaInicio}/{fechaFin}',[ReportesController::class,'clienteN']);
Route::get('/vendidoC/{id_categoria}',[ReportesController::class,'vendidoC']);
Route::get('/ventaE/{fechaInicio}/{fechaFin}',[ReportesController::class,'ventasEmp']);
Route::get('cliZona/{fechaInicio}/{fechaFin}', [ReportesController::class, 'clienteZona']);
Route::get('cliMF/{fechaInicio}/{fechaFin}', [ReportesController::class, 'clienteMF']);

});


Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'nVenta']);
       Route::get('/cli', [DashboardController::class, 'nCliente']);
        Route::get('/pro', [DashboardController::class, 'nProductos']);
        Route::get('/ven', [DashboardController::class, 'ventaD']);
       Route::get('/cliMas', [DashboardController::class, 'clienteMasF']);
});