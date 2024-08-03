<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;


use Illuminate\Support\Facades\Mail;
use App\Mail\RespaldosRealizados;
use Spatie\Backup\Events\BackupWasSuccessful;



use Swift_Attachment;

use Spatie\Backup\BackupDestination\BackupDestinationFactory;
use Spatie\Backup\BackupDestination\BackupDestination;
use Spatie\Backup\Tasks\Cleanup\CleanupStrategy;
use Spatie\Backup\Tasks\Cleanup\Strategies\DefaultStrategy;

class RealizarRespaldoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $backupPath;
    protected $email;

    /**
     * Create a new job instance.
     *
     * @return void
     */
     public function __construct()
    {
 
    }

    /**
     * Execute the job.
     *
     * @return void
     */
 public function handle()
    {
          
        // Ruta donde se guardará el archivo de respaldo
        $rutaRespaldo = storage_path('app/respaldo/respa.sql');

        // Comando para generar el respaldo utilizando el ejecutable mysqldump
        $comando = 'mysqldump --user='.env('DB_USERNAME').' --password='.env('DB_PASSWORD').' --host='.env('DB_HOST').' '.env('DB_DATABASE').' > '.$rutaRespaldo;

        // Ejecutar el comando para generar el respaldo
        exec($comando);

        // Obtener el contenido del archivo de respaldo
        $contenidoRespaldo = file_get_contents($rutaRespaldo);

        // Eliminar el archivo de respaldo después de obtener su contenido
        unlink($rutaRespaldo);

        // Envío del correo electrónico con el respaldo adjunto
        Mail::raw('Adjunto de respaldo', function ($message) use ($contenidoRespaldo) {
            $message->to('joalh92@gmail.com')
                ->subject('Respaldo de base de datos')
                ->attachData($contenidoRespaldo, 'respaldo.sql');
        });
    }

        protected function getBackupDestination(): string
    {
        // Obtén la configuración de almacenamiento de respaldo desde tu archivo de configuración
     //   return config('backup.backup.destination.disks')[0];
    }
}
