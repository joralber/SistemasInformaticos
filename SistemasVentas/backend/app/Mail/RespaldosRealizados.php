<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RespaldosRealizados extends Mailable
{
    use Queueable, SerializesModels;
        public $backupLink;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($backupLink)
    {
        $this->backupLink = $backupLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
         return $this->view('mails.backup_link')
                    ->with(['backupLink' => $this->backupLink]);

    }
}
