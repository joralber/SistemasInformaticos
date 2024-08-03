<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\CategoriaMateriaController;
use App\Http\Controllers\ColorMateriaController;
use App\Http\Controllers\MedidaMateriaController;
use App\Http\Controllers\MateriaPrimaController;
use App\Http\Controllers\FactorController;
use App\Http\Controllers\CodigoEstiloController;
use App\Http\Controllers\DetalleCodigoEstiloController;
use App\Http\Controllers\KardexMpController;
use App\Http\Controllers\CostoProduccionController;
use App\Http\Controllers\DetalleCostoController;
use App\Http\Controllers\Mp_kardexmpController;
use App\Http\Controllers\Categoria_ptController;
use App\Http\Controllers\Talla_ptController;
use App\Http\Controllers\Color_ptController;
use App\Http\Controllers\Productos_terminadosController;
use App\Http\Controllers\Kardex_ProductosController;
use App\Http\Controllers\Kardexp_ProductotController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\Pedido_EstiloController;
use App\Http\Controllers\Detalle_PedidoController;
use App\Http\Controllers\ComprasController;
use App\Http\Controllers\CuentasPagarController;
use App\Http\Controllers\CortesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CodigoController;
use App\Http\Controllers\BackupController;
use Spatie\Backup\Tasks\Backup\BackupJobFactory;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BitacoraController;
use App\Http\Controllers\Detalle_BitacoraController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\DevolucionVentaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\CuentasCobrarController;

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



/*
Route::get('proveedor',function(){
    return 'sss';
}
);

*/

//proveedor

Route::prefix('proveedor')->group(function () {

Route::get('/',[ProveedorController::class,'getAll']);

Route::post('/',[ ProveedorController::class, 'create']);

Route::put('/estado/{id_proveedor}',[ ProveedorController::class, 'darBaja']);

Route::put('/{id_proveedor}',[ProveedorController::class,'update']);
Route::get('/{id_proveedor}',[ProveedorController::class,'get']);
});

//categoriaMP
Route::prefix('categoria_mp')->group(function () {

Route::get('/',[CategoriaMateriaController::class,'getAll']);

Route::post('/',[ CategoriaMateriaController::class, 'create']);

Route::put('/estado/{id_categoria}',[ CategoriaMateriaController::class, 'darBaja']);
Route::get('/rep/{nombre}',[ CategoriaMateriaController::class, 'repetido']);
Route::put('/{id_categoria}',[CategoriaMateriaController::class,'update']);
Route::get('/{id_categoria}',[CategoriaMateriaController::class,'get']);
});


//colorMP
Route::prefix('color_mp')->group(function () {

Route::get('/',[ColorMateriaController::class,'getAll']);

Route::post('/',[ ColorMateriaController::class, 'create']);

Route::put('/estado/{id_color}',[ ColorMateriaController::class, 'darBaja']);
Route::get('/rep/{color}',[ ColorMateriaController::class, 'repetido']);
Route::put('/{id_color}',[ColorMateriaController::class,'update']);
Route::get('/{id_color}',[ColorMateriaController::class,'get']);
});


//medidaMP
Route::prefix('medida_mp')->group(function () {

Route::get('/',[MedidaMateriaController::class,'getAll']);

Route::post('/',[ MedidaMateriaController::class, 'create']);

Route::put('/estado/{id_medida}',[ MedidaMateriaController::class, 'darBaja']);
Route::get('/rep/{medida}',[ MedidaMateriaController::class, 'repetido']);

Route::put('/{id_medida}',[MedidaMateriaController::class,'update']);
Route::get('/{id_medida}',[MedidaMateriaController::class,'get']);
});



//materiaP
Route::prefix('materiap')->group(function () {

Route::get('/',[MateriaPrimaController::class,'getAll']);
Route::post('/',[ MateriaPrimaController::class, 'create']);

Route::get('/ultimo',[MateriaPrimaController::class, 'ultimoid']);
Route::get('/repmas',[ MateriaPrimaController::class, 'repeti']);
Route::get('/codigo/{idcodigo_estilo}',[MateriaPrimaController::class, 'mpDetalleGet']);
Route::put('/estado/{id_mp}',[ MateriaPrimaController::class, 'darBaja']);
Route::put('/{id_mp}',[MateriaPrimaController::class,'update']);
Route::get('/{id_mp}',[MateriaPrimaController::class,'get']);
Route::put('/agregar/{id_mp}/{cantidad}',[ MateriaPrimaController::class, 'agragrarStock']);
Route::put('/fac/{id_mp}/{factor}',[ MateriaPrimaController::class, 'validarfactor']);

Route::get('/repk/{id_mp}',[ MateriaPrimaController::class, 'repetidok']);
Route::put('/cor/{id_mp}/{cortesmp}',[ MateriaPrimaController::class, 'validarcorte']);

});



//Factor
Route::prefix('factor')->group(function () {

Route::get('/',[FactorController::class,'getAll']);

Route::post('/',[ FactorController::class, 'create']);

Route::get('/{id_factor}',[FactorController::class,'get']);

Route::put('/{id_factor}',[FactorController::class,'update']);

Route::get('/existe/{id_mp}',[FactorController::class, 'existe']);



});



//CodigoEstiloController

Route::prefix('codigo_estilo')->group(function () {

Route::get('/ultimo',[CodigoEstiloController::class, 'ultimoid']);

Route::get('/',[CodigoEstiloController::class,'getAll']);
Route::get('/uno',[CodigoEstiloController::class,'getAll2']);

Route::post('/',[ CodigoEstiloController::class, 'create']);

Route::put('/estado/{codigo_estilo}',[ CodigoEstiloController::class, 'darBaja']);

Route::get('/{codigo_estilo}',[CodigoEstiloController::class,'get']);

Route::put('/{codigo_estilo}',[CodigoEstiloController::class,'update']);
Route::get('/repc/{estilo}',[ CodigoEstiloController::class, 'repetido']);

                                                               





});

//DetalleCodigoEstiloController

Route::prefix('detalle_codigo_estilo')->group(function () {

Route::get('/{idcodigo_estilo}',[DetalleCodigoEstiloController::class,'getAllDetalle']);

Route::post('/',[ DetalleCodigoEstiloController::class, 'create']);
Route::delete('/{iddetalle_codigo_estilo}',[ DetalleCodigoEstiloController::class, 'delete']);

Route::get('/costo/{idcodigo_estilo}',[DetalleCodigoEstiloController::class, 'costoMP']);



//Route::get('/{id_factor}',[FactorController::class,'get']);

//Route::put('/{id_factor}',[FactorController::class,'update']);

//Route::get('/existe/{id_mp}',[FactorController::class, 'existe']);



});

/* route de materia prima a kardex  */

Route::prefix('kardex_mp')->group(function (){

    Route::get('/ultimo',[KardexMpController::class, 'ultimoid']);

    Route::get('/{id_mp}',[ KardexMpController::class, 'getAll']);

    Route::post('/',[ KardexMpController::class, 'create']);
    Route::put('/{id_mp}',[KardexMpController::class,'update']);

    Route::get('hola/{id_kardex}',[KardexMpController::class,'get']);




});

Route::prefix('costo_produccion')->group(function (){

Route::get('/',[CostoProduccionController::class, 'getAll']);
Route::post('/',[ CostoProduccionController::class, 'create']);
Route::get('/ultimo',[CostoProduccionController::class, 'ultimoid']);
Route::put('/estado/{id_costo}',[ CostoProduccionController::class, 'darBaja']);
Route::get('/{id_costo_produccion}',[CostoProduccionController::class,'get']);
Route::get('detalle/{id_costo_produccion}',[CostoProduccionController::class,'getDetalle']);
Route::put('/{id_costo_produccion}',[CostoProduccionController::class,'update']);
Route::get('get/{idcodigo_estilo}',[CostoProduccionController::class,'getidestilo']);




});

Route::prefix('detalle_costo')->group(function (){
Route::post('/',[ DetalleCostoController::class, 'create']);

Route::get('rep/{id_mp}',[DetalleCostoController::class, 'repetidomp']);

Route::get('/{id_costo_produccion}',[DetalleCostoController::class, 'costoEdit']);
Route::put('/{id_detalle_costo}',[DetalleCostoController::class,'update']);

Route::get('/{idcodigo_estilo}/{id_mp}',[DetalleCostoController::class,'seletEliminar']);

Route::delete('/{id_costo_produccion}/{id_mp}',[ DetalleCostoController::class, 'delete']);

});


//Mp_kardexmp

Route::prefix('mp_kardexmp')->group(function(){
Route::post('/',[ Mp_kardexmpController::class, 'create']);
Route::get('/ultimok/{id_mp}',[Mp_kardexmpController::class, 'ultimoid']);

});


//categoriaPF
Route::prefix('categoria_pt')->group(function () {

Route::get('/',[Categoria_ptController::class,'getAll']);

Route::post('/',[ Categoria_ptController::class, 'create']);

Route::put('/estado/{id_cat_pt}',[ Categoria_ptController::class, 'darBaja']);
Route::get('/rep/{nombre_cat}',[ Categoria_ptController::class, 'repetido']);
Route::put('/{id_cat_pt}',[Categoria_ptController::class,'update']);
Route::get('/{id_cat_pt}',[Categoria_ptController::class,'get']);
});


//colorPF
Route::prefix('color_pt')->group(function () {

Route::get('/',[Color_ptController::class,'getAll']);

Route::post('/',[ Color_ptController::class, 'create']);

Route::put('/estado/{id_color_pt}',[ Color_ptController::class, 'darBaja']);
Route::get('/rep/{nombre_color}',[ Color_ptController::class, 'repetido']);
Route::put('/{id_color_pt}',[Color_ptController::class,'update']);
Route::get('/{id_color_pt}',[Color_ptController::class,'get']);
});


//tallaPF
Route::prefix('talla_pt')->group(function () {

Route::get('/',[Talla_ptController::class,'getAll']);

Route::post('/',[ Talla_ptController::class, 'create']);

Route::put('/estado/{id_talla_pt}',[ Talla_ptController::class, 'darBaja']);
Route::get('/rep/{nombre_talla}',[ Talla_ptController::class, 'repetido']);

Route::put('/{id_talla_pt}',[Talla_ptController::class,'update']);
Route::get('/{id_talla_pt}',[Talla_ptController::class,'get']);
});

//productos_terminados
Route::prefix('productos_terminados')->group(function () {

Route::get('/',[Productos_terminadosController::class,'getAll']);
Route::get('/ultimo',[Productos_terminadosController::class, 'ultimoid']);

Route::post('/',[ Productos_terminadosController::class, 'create']);
Route::get('/rep/{codigo_barra}',[ Productos_terminadosController::class, 'repetido']);
Route::put('/estado/{id_producto}',[ Productos_terminadosController::class, 'darBaja']);
Route::get('/{id_producto}',[Productos_terminadosController::class,'get']);
Route::put('/agregar/{id_producto}/{cantidad}',[ Productos_terminadosController::class, 'agragrarStock']);

Route::put('/{id_producto}',[Productos_terminadosController::class,'update']);
Route::get('/rep2/{id_cat_pt}/{id_color_pt}/{id_talla_pt}/{idcodigo_estilo}',[ Productos_terminadosController::class, 'repetido2']);
Route::get('/reppk/{id_mp}',[ Productos_terminadosController::class, 'repetidopk']);


//Route::get('/rep3/{id_cat_pt}/{id_color_pt}/{id_talla_pt}/{idcodigo_estilo}/{id_producto}',[ Productos_terminadosController::class, 'repetido3']);

});

/* route de PF a kardex  */

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

//limpiar cache
Route::get('/clear-cache', function () { 
   echo Artisan::call('config:clear'); 
   echo Artisan::call('config:cache'); 
   echo Artisan::call('cache:clear'); 
   echo Artisan::call('route:clear'); 
      echo Artisan::call('route:cache'); 
echo Artisan::call('auth:clear-resets');
echo Artisan::call('event:clear');
echo Artisan::call('optimize:clear');
echo Artisan::call('route:clear');
echo Artisan::call('schedule:clear-cache');
echo Artisan::call('view:clear');


});


//pedido
Route::prefix('pedido')->group(function (){

   Route::get('/ultimop',[PedidoController::class, 'ultimoid']);
   Route::post('/',[ PedidoController::class, 'create']);
   Route::get('/',[PedidoController::class,'getAll']);
   Route::get('/{idpedido}',[PedidoController::class,'get']);


});



//detalle-pedido
Route::prefix('detallepedido')->group(function (){

   //Route::get('/ultimop',[PedidoController::class, 'ultimoid']);
   Route::post('/',[ Detalle_PedidoController::class, 'create']);
   Route::get('/{idpedido}',[Detalle_PedidoController::class,'getAllDetalle']);
Route::get('/get/{idpedido}',[Detalle_PedidoController::class,'getUpdate']);


});

Route::prefix('kardex2')->group(function (){

Route::get('/obtener',[KardexMpController::class, 'obtenerid']);
Route::post('/',[ KardexMpController::class, 'create2']);
Route::get('/',[KardexMpController::class, 'getUpdatek']);

});

//compras
Route::controller(ComprasController::class)->group(function () {
    Route::get('listaOrden', 'listaOrden');
    Route::get('listaproveedores', 'listaproveedores');
    Route::get('materiaprima', 'materiaprima');
    Route::post('guardarordencompra', 'guardarordencompra');
    Route::post('guardardetalleoc', 'guardardetalleoc');
    Route::get('obtenercompra/{id_ordencompra}', 'obtenercompra');
    Route::get('listardetalleoc/{id_ordencompra}', 'listardetalleoc');
    Route::post('getpreciomateria', 'getpreciomateria');
    Route::post('getcomprasproveedor','getcomprasproveedor');
    Route::post('getdetallecompra','getdetallecompra');
    Route::post('guardarcompra','guardarcompra');
    Route::post('guardardetallecompra','guardardetallecompra');
    Route::post('actualizarordencompra','actualizarordencompra');
    Route::post('guardardevolucion','guardardevolucion');
    Route::post('guardardetalledev','guardardetalledev');
    Route::get('getdevoluciones','getdevoluciones');
    Route::post('getdetalledev','getdetalledev');
    Route::get('getcompras', 'getcompras');
    Route::post('consultacredito', 'consultacredito');
    Route::post('finalizarodc', 'finalizarodc');
    Route::post('getdetalleodc', 'getdetalleodc');
    Route::post('checkmateriaprima', 'checkmateriaprima');
    Route::post('getdetallecompradev', 'getdetallecompradev');
});
Route::controller(CuentasPagarController::class)->group(function () {
    Route::post('compraspendientes', 'compraspendientes');
    Route::post('extraerdatoscompra', 'extraerdatoscompra');
    Route::post('guardarcuentaspagar', 'guardarcuentaspagar');
    Route::post('cuentasporproveedor', 'cuentasporproveedor');
    Route::post('getdatacuenta', 'getdatacuenta');
    Route::post('getdetalleabono', 'getdetalleabono');
    Route::post('guardarabonocuenta', 'guardarabonocuenta');
    Route::post('actualizarcuenta', 'actualizarcuenta');
    Route::post('cuentascompare', 'cuentascompare');
});




Route::prefix('corte')->group(function () {
Route::get('/', [CortesController::class, 'obtenerUltimoAll']);
Route::get('/repc',[ CortesController::class, 'repetido']);
Route::post('/',[ CortesController::class, 'create']);
Route::get('/listado/{id_mp}',[CortesController::class,'getAll']);
//Route::put('/estado/{id_color}',[ CortesController::class, 'darBaja']);
Route::put('{id_cortes}',[CortesController::class,'update']);
Route::get('/{id_cortes}',[CortesController::class,'get']);
Route::get('/repcmp/{id_mp}',[ CortesController::class, 'repetidoUMP']);
Route::get('/obtenec/{id_mp}', [CortesController::class, 'obteneridCortes']);
});


Route::prefix('nuevo')->group(function () {
Route::get('/{id_cortes}',[DetalleCostoController::class,'get']);
Route::get('/getcomp/{id_compra}', [Mp_kardexmpController::class, 'getCompra']);
Route::get('/{id_costo_produccion}/{id_mp}',[ DetalleCostoController::class, 'suma']);
});

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

Route::post('/restore', [ BackupController::class, 'restore']);

Route::post('/restore2', [ BackupController::class, 'restorBase']);


});


Route::prefix('bitacora')->group(function () {
    Route::get('/', [BitacoraController::class, 'getAll']);
    Route::put('/{id_bitacora}',[BitacoraController::class,'ModificarBitacora']);
    Route::post('/', [Detalle_BitacoraController::class, 'create']);
    Route::get('/{id_bitacora}', [Detalle_BitacoraController::class, 'getAllDetalle']);
});

Route::prefix('reporte')->group(function () {
        Route::get('/', [ReporteController::class, 'getAll']);
    Route::get('/pt', [ReporteController::class, 'productoTerminado']);
        Route::get('/dev', [ReporteController::class, 'devMP']);
        Route::get('/estBaja', [ReporteController::class, 'estiloBaja']);
        Route::get('/mpBaja', [ReporteController::class, 'mpBaja']);
         Route::get('/proBaja', [ReporteController::class, 'proveedorBaja']);
      Route::get('/compr', [ReporteController::class, 'compra']);
            Route::get('/cli', [ReporteController::class, 'cliente']);
            Route::get('/clib', [ReporteController::class, 'clienteB']);
        Route::get('/ventaCre', [ReporteController::class, 'ventaCred']);
        Route::get('/ventaCon', [ReporteController::class, 'ventaCont']);
        Route::get('/ventaCli', [ReporteController::class, 'venta_cliente']);
     Route::get('/ventaIng', [ReporteController::class, 'venta']);
       Route::get('/ventaEs', [ReporteController::class, 'estiloVendidos']); 
       Route::get('/devP', [ReporteController::class, 'devVen']);
              Route::get('cliDe', [ReporteController::class, 'clienteDeuda']);
        Route::get('cliZona/{fechaInicio}/{fechaFin}', [ReporteController::class, 'clienteZona']);
    Route::get('/{id_categoria}', [ReporteController::class, 'mpCategoria']);
    Route::get('/prov/{fechaInicio}/{fechaFin}', [ReporteController::class, 'proveedorFre']);
        Route::get('/ventFre/{fechaInicio}/{fechaFin}', [ReporteController::class, 'productoTerminadoFre']);
                Route::get('/ventMFre/{fechaInicio}/{fechaFin}', [ReporteController::class, 'productoTerminadoMenFre']);
        Route::post('/proT', [ReporteController::class, 'masVendidosTalla']);
      Route::post('/proC', [ReporteController::class, 'masVendidosColor']);
});

Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'nVenta']);
       Route::get('/cli', [DashboardController::class, 'nCliente']);
        Route::get('/comp', [DashboardController::class, 'nCompra']);
        Route::get('/pro', [DashboardController::class, 'nProductos']);
        Route::get('/cred', [DashboardController::class, 'nVentaCre']);
        Route::get('/compCC', [DashboardController::class, 'nCompraCre']);
        Route::get('/prodMas', [DashboardController::class, 'productoTerminadoMas']);
        Route::get('/cliMas', [DashboardController::class, 'clienteMasF']);
});

Route::controller(VentasController::class)->group(function () {
    Route::get('tipodocumento', 'tipodocumento');
    Route::post('buscarcliente', 'buscarcliente');
    Route::post('buscarproducto', 'buscarproducto');
    Route::get('getcategorias', 'getcategorias');
    Route::post('getcolores', 'getcolores');
    Route::post('gettallas', 'gettallas');
    Route::post('productoporfiltro', 'productoporfiltro');
    Route::post('precioproducto', 'precioproducto');
    Route::post('verificacreditos', 'verificacreditos');
    Route::post('guardarventa', 'guardarventa');
    Route::post('guardardetventa', 'guardardetventa');
    Route::post('guardarcxc', 'guardarcxc');
    Route::post('consultastock', 'consultastock');
    Route::post('regkardex', 'regkardex');
    Route::post('regkardexentrada', 'regkardexentrada');
    Route::post('actualizastockpt', 'actualizastockpt');
    Route::post('intermediakarx', 'intermediakarx');
    Route::get('listaventas', 'listaventas');
    Route::post('getdetalleventa', 'getdetalleventa');
    Route::post('registrardsventa', 'registrardsventa');
    Route::get('listadsventa', 'listadsventa');
    Route::post('getventaimpresion', 'getventaimpresion');
    Route::post('getdetalleimpresion', 'getdetalleimpresion');
    Route::get('existeticket', 'existeticket');
});

Route::controller(DevolucionVentaController::class)->group(function () {
    Route::post('getventacliente', 'getventacliente');
    Route::post('getdetalleventadev', 'getdetalleventadev');
    Route::post('guardardevolucionvnt', 'guardardevolucionvnt');
    Route::post('guardardetalledevvnt', 'guardardetalledevvnt');
    Route::get('getdevolucionesventa', 'getdevolucionesventa');
    Route::post('getdetdevolucionventa', 'getdetdevolucionventa');
});

Route::controller(ClienteController::class)->group(function () {
    Route::get('listadoclientes', 'listadoclientes');
    Route::post('guardarcliente', 'guardarcliente');
    Route::get('editarcliente/{id_cliente}', 'editarcliente');
    Route::put('actualizarcliente/{id_cliente}', 'actualizarcliente');
    Route::post('pendientes', 'pendientes');
    Route::post('bajacliente', 'bajacliente');
    Route::post('clienterepetido', 'clienterepetido');
    Route::post('clienterepetidoupdate', 'clienterepetidoupdate');
    Route::post('datacliente', 'datacliente');
    Route::get('departamentos', 'departamentos');
    Route::post('municipios', 'municipios');
});

Route::controller(CuentasCobrarController::class)->group(function () {
    Route::post('cuentasporcliente', 'cuentasporcliente');
    Route::post('getdatacuentaxc', 'getdatacuentaxc');
    Route::post('getdetalleabonoxc', 'getdetalleabonoxc');
    Route::post('guardarabono', 'guardarabono');
    Route::post('actualizarcuentaxc', 'actualizarcuentaxc');
    Route::post('cuentasclientegeneral', 'cuentasclientegeneral');
});