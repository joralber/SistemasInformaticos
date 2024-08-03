<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cobros extends Model
{
    use HasFactory;
    protected $table = "cobro";
    protected $primaryKey = 'id_cobro';
    protected $fillable = [
        'tiket',
        'pago',
        'fecha_cobro',
        'formapago',
        'id_cxc'
      ];
}
