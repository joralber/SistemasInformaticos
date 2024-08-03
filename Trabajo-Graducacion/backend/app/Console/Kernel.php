<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
         //$schedule->command('backup:run')->daily();

    $schedule->command('backup:run')->dailyAt('14:05');
    //$schedule->command('backup:delete-old')->dailyAt('08:00');

     //     $schedule->command(BackupCommand::class)->daily()->at('01:00');
    //$schedule->command(CleanupCommand::class)->daily()->at('09:00');


    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
