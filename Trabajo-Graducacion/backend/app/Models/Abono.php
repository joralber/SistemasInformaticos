<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abono extends Model
{
    use HasFactory;
    protected $table = "abono";
    protected $primaryKey = 'id_abono';
    protected $fillable = [
        'id_cxp',
        'tiket',
        'pago',
        'fecha_abono',
        'formapago'
      ];
}
