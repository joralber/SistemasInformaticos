<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
//use Spatie\Backup\Tasks\Backup\BackupJob;
use \ZipArchive;
use Illuminate\Support\Facades\Storage;
use Spatie\Backup\Tasks\Restore\RestoreJob;
use Spatie\Backup\BackupDestination\BackupCollection;
use Illuminate\Support\Facades\Artisan;
//use App\Jobs\RealizarRespaldoJob;
use Illuminate\Support\Facades\Mail;
use Doctrine\DBAL\DriverManager;
use Illuminate\Support\Facades\Config;
class BackupController extends Controller
{



 
public function enviarRespaldo()
    {

    try {
       $rutaRespaldo = storage_path('app/Laravel/respaldo'. '-'. date('Y-m-d_H-i-s').'.sql');

        // Comando para generar el respaldo utilizando el ejecutable mysqldump
        $comando = 'mysqldump --user='.env('DB_USERNAME').' --password='.env('DB_PASSWORD').' --host='.env('DB_HOST').' '.env('DB_DATABASE').' > '.$rutaRespaldo;

        // Ejecutar el comando para generar el respaldo
        exec($comando);

        // Envío del correo electrónico con el respaldo adjunto
        Mail::raw('Adjunto de respaldo', function ($message) use ($rutaRespaldo) {
            $message->to('hr10044@ues.edu.sv')
                ->subject('Respaldo de base de datos del '. date('Y-m-d_H-i-s'))
                ->attach($rutaRespaldo);
        });

        // Eliminar el archivo de respaldo después de enviarlo por correo
       unlink($rutaRespaldo);

        return response()->json(['mensaje' => 'Respaldo enviado correctamente']);

    } catch (\Exception $e) {
        return response()->json(['error' => 'El Respaldo Fallo: '.$e->getMessage()], 500);
    }

    }



public function restorBase(Request $request)
{
              $path = urldecode($request->input('path'));


    try {

//create
            $nombreBaseDeDatos = Config::get('database.connections.mysql.database');

        // Configura los detalles de conexión a la base de datos
        $configuracionConexion = [
            'driver'    => 'pdo_mysql',
            'host'      => Config::get('database.connections.mysql.host'),
            'port'      => Config::get('database.connections.mysql.port'),
            'dbname'    => null, // Estableceremos la base de datos más adelante
            'user'      => Config::get('database.connections.mysql.username'),
            'password'  => Config::get('database.connections.mysql.password'),
        ];

        // Crea la conexión sin seleccionar ninguna base de datos específica
        $conexion = DriverManager::getConnection($configuracionConexion);

        // Ejecuta el comando SQL para crear la base de datos
        $conexion->getSchemaManager()->createDatabase($nombreBaseDeDatos);
        //fin a create


        $backupPath = 'C:\wamp64\www\pera\backend\storage\app\Laravel'.'\\'.$path; // Ruta del archivo de backup en Windows

        // Obtener el contenido del archivo de backup
        $backupContents = file_get_contents($backupPath);

        // Ejecutar la consulta para restaurar la base de datos
        DB::connection()->getPdo()->exec($backupContents);
        
  // Eliminar el archivo de respaldo después de enviarlo por correo
       unlink($backupPath);
        return response()->json(['message' => 'Database restored successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Database restoration failed: '.$e->getMessage()], 500);
    }


}



}
